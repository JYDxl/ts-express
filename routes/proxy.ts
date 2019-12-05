import * as cheerio from 'cheerio'
import {EventProxy} from 'eventproxy';
import * as url from 'url';
import * as superagent from 'superagent';
import {Router, Request, Response, NextFunction, Params} from 'express';
import {agent} from '../src/promise'

const router: Router = Router();

/* GET home page. */
router.get('/', async (req: Request<Params, any, any>, res: Response<any>, next: NextFunction): Promise<void> => {
  const cnodeUrl: string = 'https://cnodejs.org/';
  const text: string     = await agent(cnodeUrl);
  const topicUrls: any[] = [];
  const $: CheerioStatic = cheerio.load(text);
  $('#topic_list .topic_title').each((idx: number, element: CheerioElement): void => {
    const $element: Cheerio = $(element);
    const href: string      = url.resolve(cnodeUrl, $element.attr('href'));
    topicUrls.push(href);
  });
  const ep: EventProxy = EventProxy.create();
  ep.after('topic_html', topicUrls.length, (topics: any[]): void => {
    const result: { comment1: string; href: any; title: string }[] = topics.map((item: any): any => {
      const topicUrl: any  = item.url;
      const topicHtml: any = item.html;
      if (topicHtml instanceof Error) {
        return {
          title   : topicHtml.name,
          href    : topicUrl,
          comment1: topicHtml.message,
        };
      }
      const $: CheerioStatic = cheerio.load(topicHtml);
      return {
        title   : $('.topic_full_title').text().trim(),
        href    : topicUrl,
        comment1: $('.reply_content').eq(0).text().trim(),
      };
    });
    console.log('final:');
    console.log(result);
    res.send(result);
  });

  topicUrls.forEach((topicUrl: any): void => {
    superagent
      .get(topicUrl)
      .end((err, res): void => {
        if (err) {
          console.log(`fetch ${topicUrl} failure`);
          ep.emit('topic_html', {url: topicUrl, html: err});
          return
        }
        console.log(`fetch ${topicUrl} successful`);
        ep.emit('topic_html', {url: topicUrl, html: res.text});
      });
  });
});

export {router}
