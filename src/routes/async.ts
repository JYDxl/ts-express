import {mapLimit} from 'async'
import {Router} from 'express'
import {logger} from '../util/logger'

const asyncRouter = Router();
const log         = logger();

asyncRouter.get('/', async (req, res, next) => {
  mapLimit<string, string, Error>(urls, 5, ((item, callback) => {
    fetchUrl(item, callback);
  }), (err, results) => {
    err ? log.error(err) : log.info(results);
    res.end()
  });
});

let concurrencyCount = 0;
const fetchUrl       = (url: string, callback: (err: Error, res: string) => void) => {
  const delay = 2000;
  concurrencyCount++;
  log.info(`现在的并发数是${concurrencyCount}, 正在抓取的是${url}, 耗时${delay}毫秒`);
  setTimeout(() => {
    concurrencyCount--;
    callback(null, `${url} html content`)
  }, delay);
};

const urls = new Array<string>();
for (let i = 0; i < 10; i++) {
  urls.push(`http://datasource_${i}`)
}

export {asyncRouter}
