import * as cheerio from "cheerio";
import {Router} from "express";
import {agent} from "../util/promise";

const agentRouter = Router();

agentRouter.get("/", async (req, res) => {
  const text  = await agent("https://cnodejs.org/");
  const $     = cheerio.load(text);
  const items = [];
  $("#topic_list .topic_title").each((index, element) => {
    const $element = $(element);
    items.push({
      href : $element.attr("href"),
      title: $element.attr("title"),
    });
  });
  res.send(items);
});

export {agentRouter};
