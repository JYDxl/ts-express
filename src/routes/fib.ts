import {Router} from "express";
import {fibonacci} from "../main";
import {logger} from "../util/logger";

const fibRouter = Router();
const log       = logger();

fibRouter.get("/", async (req, res) => {
  const arg = req.query.n as string;
  try {
    const n = Number.parseInt(arg, 10);
    res.send(String(fibonacci(n)));
  } catch (e) {
    log.error(e);
    res.status(500).send(e.message);
  }
});

export {fibRouter};
