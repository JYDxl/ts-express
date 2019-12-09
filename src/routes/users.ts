import {Router} from 'express'

const usersRouter = Router();

usersRouter.get('/', async (req, res, next) => {
  return res.send('respond with a resource');
});

export {usersRouter}
