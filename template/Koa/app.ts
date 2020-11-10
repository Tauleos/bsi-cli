import Koa from 'koa';
import logger from 'koa-logger';
import 'reflect-metadata';

import { scan } from './anotation';
import path from 'path';
const app = new Koa();
app.use(logger());
// 初始化
const ControllerDir = path.resolve(__dirname, '../controller');
scan(app, ControllerDir).then(() => {
  app.listen(3000);
});
