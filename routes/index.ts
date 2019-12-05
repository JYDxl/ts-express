import {Router, Request, Response, NextFunction, Params} from 'express'

const indexRouter: Router = Router();

/* GET home page. */
indexRouter.get('/', async (req: Request<Params, any, any>, res: Response<any>, next: NextFunction): Promise<void> => {
  res.render('index', {title: 'Express'});
});

export {indexRouter}
