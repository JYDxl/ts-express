import * as cheerio from 'cheerio'
import {Router} from 'express'
import {agent} from '../src/util/promise'

const agentRouter = Router();

agentRouter.get('/', async (req, res, next) => {
  const text  = await agent("https://cnodejs.org/");
  const $     = cheerio.load(text);
  const items = [];
  $('#topic_list .topic_title').each((index, element) => {
    const $element = $(element);
    items.push({
      title: $element.attr('title'),
      href : $element.attr('href')
    })
  });
  res.send(items);
});

export {agentRouter}
