import {Router} from "express";

const indexRouter = Router();

indexRouter.get("/", async (req, res, next) => {
  res.render("index", {title: "Express"});
});

export {indexRouter};
