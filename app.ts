import * as cookieParser from 'cookie-parser'
import * as express from "express"
import * as logger from 'morgan'
import * as path from 'path'
import {Express} from 'express'
import {indexRouter} from './routes'
import {usersRouter} from './routes/users'
import {agentRouter} from './routes/agent'
import {proxyRouter} from './routes/proxy'

const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/agent', agentRouter);
app.use('/proxy', proxyRouter);

export = app;
