import Router from 'koa-router';
import Koa from 'koa';
import { promises as fsp } from 'fs';
import path from 'path';
import { PATH_METADATA } from '../decorators/constants';
import RouterExplorer from './explorer';

async function scan(app: Koa, ControllerDir: string): Promise<void> {
  const Controllers = await fsp.readdir(ControllerDir);
  for (const Controller of Controllers) {
    const { default: ctor } = await import(
      path.resolve(ControllerDir, Controller)
    );
    const basePath = Reflect.getMetadata(PATH_METADATA, ctor);
    new RouterExplorer(basePath, app).explore(new ctor());
  }
}
export { scan };
