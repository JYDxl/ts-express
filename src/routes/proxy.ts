import * as superagent from 'superagent'
import * as cheerio from 'cheerio'
import * as url from 'url'
import {EventProxy} from 'eventproxy'
import {Router} from 'express'
import {logger} from '../util/logger'
import {agent} from '../util/promise'

const proxyRouter = Router();
const log         = logger();

proxyRouter.get('/', async (req, res, next) => {
  const cnodeUrl  = 'https://cnodejs.org/';
  const text      = await agent(cnodeUrl);
  const topicUrls = new Array<string>();
  const $         = cheerio.load(text);
  $('#topic_list .topic_title').each((index, element) => {
    const $element = $(element);
    const href     = url.resolve(cnodeUrl, $element.attr('href'));
    topicUrls.push(href);
  });
  log.info("urls");
  log.info(topicUrls);
  const ep = EventProxy.create();
  ep.after<TopicInfo[]>('topic_html', topicUrls.length, results => {
    const result = results.map<ResultInfo>((value, index, array) => {
      const topicUrl  = value.url;
      const topicHtml = value.html;
      if (topicHtml instanceof Error) {
        return {
          title  : topicHtml.name,
          href   : topicUrl,
          comment: topicHtml.message,
        };
      }
      const $ = cheerio.load(topicHtml);
      return {
        title  : $('.topic_full_title').text().trim(),
        href   : topicUrl,
        comment: $('.reply_content').eq(0).text().trim(),
      };
    });
    log.info('final:');
    log.info(result);
    res.send(result);
  });
  topicUrls.forEach((topicUrl, index, array) => {
    superagent
      .get(topicUrl)
      .end((err, response) => {
        if (err) {
          log.info(`fetch ${topicUrl} failure`);
          ep.emit<TopicInfo>('topic_html', {url: topicUrl, html: err});
        } else {
          log.info(`fetch ${topicUrl} success`);
          ep.emit<TopicInfo>('topic_html', {url: topicUrl, html: response.text});
        }
      })
  })
});

interface ResultInfo {
  title: string
  href: string
  comment: string
}

interface TopicInfo {
  url: string
  html: Error | string | any
}

export {proxyRouter}
