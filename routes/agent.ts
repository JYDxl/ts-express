import * as cheerio from 'cheerio'
import {Router, Request, Response, NextFunction, Params} from 'express';
import {agent} from '../src/promise'

const router: Router = Router();

router.get('/', async (req: Request<Params, any, any>, res: Response<any>, next: NextFunction): Promise<void> => {
  const text: string     = await agent("https://cnodejs.org/");
  const $: CheerioStatic = cheerio.load(text);
  const items: any[]     = [];
  $('#topic_list .topic_title').each((index: number, element: CheerioElement): void => {
    const $element: Cheerio = $(element);
    items.push({
      title: $element.attr('title'),
      href : $element.attr('href')
    })
  });
  res.send(items)
});

export {router}
