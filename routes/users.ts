import {Router, Request, Response, NextFunction, Params} from 'express';

const router: Router = Router();

/* GET users listing. */
router.get('/', async (req: Request<Params, any, any>, res: Response<any>, next: NextFunction): Promise<void> => {
  res.send('respond with a resource');
});

export {router}
