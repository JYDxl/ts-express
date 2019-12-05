import {Router, Request, Response, NextFunction, Params} from 'express';

const router: Router = Router();

/* GET home page. */
router.get('/', async (req: Request<Params, any, any>, res: Response<any>, next: NextFunction): Promise<void> => {
  res.render('index', {title: 'Express'});
});

export {router}
