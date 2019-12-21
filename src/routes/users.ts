import {Router} from "express";

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  return res.send("respond with a resource");
});

export {usersRouter};
