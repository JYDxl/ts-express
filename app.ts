import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import {indexRouter} from "./src/routes";
import {agentRouter} from "./src/routes/agent";
import {asyncRouter} from "./src/routes/async";
import {fibRouter} from "./src/routes/fib";
import {proxyRouter} from "./src/routes/proxy";
import {usersRouter} from "./src/routes/users";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/agent", agentRouter);
app.use("/proxy", proxyRouter);
app.use("/async", asyncRouter);
app.use("/fib", fibRouter);

export = app;
