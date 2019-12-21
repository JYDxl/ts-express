import * as cheerio from "cheerio";
import {EventProxy} from "eventproxy";
import {Router} from "express";
import * as superagent from "superagent";
import * as url from "url";
import {logger} from "../util/logger";
import {agent} from "../util/promise";

const proxyRouter = Router();
const log         = logger();

proxyRouter.get("/", async (req, res) => {
  const cnodeUrl  = "https://cnodejs.org/";
  const text      = await agent(cnodeUrl);
  const topicUrls = new Array<string>();
  const $         = cheerio.load(text);
  $("#topic_list .topic_title").each((index, element) => {
    const $element = $(element);
    const href     = url.resolve(cnodeUrl, $element.attr("href"));
    topicUrls.push(href);
  });
  log.info("urls");
  log.info(topicUrls);
  const ep = EventProxy.create();
  ep.after<ITopicInfo[]>("topic_html", topicUrls.length, (results) => {
    const result = results.map<IResultInfo>((value) => {
      const topicUrl  = value.url;
      const topicHtml = value.html;
      if (topicHtml instanceof Error) {
        return {
          comment: topicHtml.message,
          href   : topicUrl,
          title  : topicHtml.name,
        };
      }
      // tslint:disable-next-line:no-shadowed-variable
      const $ = cheerio.load(topicHtml);
      return {
        comment: $(".reply_content").eq(0).text().trim(),
        href   : topicUrl,
        title  : $(".topic_full_title").text().trim(),
      };
    });
    log.info("final:");
    log.info(result);
    res.send(result);
  });
  topicUrls.forEach((topicUrl) => {
    superagent
      .get(topicUrl)
      .end((err, response) => {
        if (err) {
          log.info(`fetch ${topicUrl} failure`);
          ep.emit<ITopicInfo>("topic_html", {url: topicUrl, html: err});
        } else {
          log.info(`fetch ${topicUrl} success`);
          ep.emit<ITopicInfo>("topic_html", {url: topicUrl, html: response.text});
        }
      });
  });
});

interface IResultInfo {
  title: string;
  href: string;
  comment: string;
}

interface ITopicInfo {
  url: string;
  html: Error | string | any;
}

export {proxyRouter};
