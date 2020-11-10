import {
  PATH_METADATA,
  METHOD_METADATA,
  ROUTE_ARGS_METADATA,
} from '../decorators/constants';
import { isConstructor, isFunction } from '../utils/type';
import Router from 'koa-router';
import Koa, { Context, Next } from 'koa';
import RouteParamsFactory from './params-factory';
import { RouteParamTypes } from '../decorators/enum';

interface PathProperty {
  routePath: string;
  method: 'get' | 'post';
  fn: () => void;
  methodName: string;
}
interface ParamProperties {
  index: number;
  type: RouteParamTypes | string;
  data: object | string | number;
  extractValue: (ctx: Context, next: Next) => any;
}
export default class RouterExplorer {
  public router = new Router();
  private paramsFactory = new RouteParamsFactory();
  private readonly basePath: string;
  private app: Koa;
  constructor(basePath: string, app: Koa) {
    this.basePath = basePath;
    this.app = app;
  }

  explore(instance: Record<string, unknown>) {
    const routerPaths = this.scanForPaths(instance);
    this.applyPathsToRouterProxy(routerPaths, instance);
  }
  scanForPaths(instance: Record<string, unknown>) {
    const prototype = Object.getPrototypeOf(instance);
    // 筛选出类的 methodName
    const methodsNames = Object.getOwnPropertyNames(prototype).filter(
      (item) => {
        return !isConstructor(item) && isFunction(prototype[item]);
      }
    );
    return methodsNames.map((methodName) => {
      const fn = prototype[methodName];
      // 取出定义的 metadata
      const routePath = Reflect.getMetadata(PATH_METADATA, fn);
      const method = Reflect.getMetadata(METHOD_METADATA, fn);
      return {
        routePath,
        method: method.toLowerCase() as 'get',
        fn,
        methodName,
      };
    });
  }
  applyPathsToRouterProxy(
    routerPaths: PathProperty[],
    instance: Record<string, unknown>
  ) {
    routerPaths.map((pathProperty) => {
      this.applyCallbackToRouter(pathProperty, instance);
      // router[route.method](`${basePath}${route.route}`, (ctx) => {
      //   const result = new ctor(ctx)[route.methodName]();
      //   ctx.body = result;
      // });
    });
    this.app.use(this.router.routes());
  }
  applyCallbackToRouter(
    pathProperty: PathProperty,
    instance: Record<string, unknown>
  ) {
    const { routePath, method, methodName, fn } = pathProperty;
    const routerMethod = this.router[method].bind(this.router);
    const fullPath = `${this.basePath}${routePath}`;
    const handler = this.createCallbackProxy(fn, instance, methodName);
    routerMethod(fullPath, handler);
  }
  private createCallbackProxy(
    callback: <T>(...args: T[]) => void,
    instance: object,
    methodName: string
  ) {
    //todo get paramDecorator
    const metadata =
      Reflect.getMetadata(
        ROUTE_ARGS_METADATA,
        instance.constructor,
        methodName
      ) || {};
    const types = Reflect.getMetadata(
      'design:paramtypes',
      instance,
      methodName
    );
    console.log('metadata', metadata);
    const keys = Object.keys(metadata);
    const args = new Array(keys.length);
    const paramsOptions = keys.map((key) => {
      const { index, data } = metadata[key];
      const type = Number(key.split(':')[0]);
      return {
        index,
        data,
        type,
        extractValue: (ctx: Context, next: Next) => {
          return this.paramsFactory.exchangeKeyForValue(type, data, {
            ctx,
            next,
          });
        },
      };
    });
    const fnApplyPipes = this.createPipesFn(null, paramsOptions);
    return async (ctx: Context, next: Next) => {
      fnApplyPipes && (await fnApplyPipes(args, ctx, next));
      const result = callback(...args);
      ctx.body = result;
    };
  }
  private createPipesFn(pipes: null, paramsOptions: ParamProperties[]) {
    const pipesFn = async (args: any[], ctx: Context, next: Next) => {
      const resolveParamValue = async (param: ParamProperties) => {
        const { index, extractValue } = param;
        const value = extractValue(ctx, next);

        args[index] = value;
      };
      await Promise.all(paramsOptions.map(resolveParamValue));
    };
    return paramsOptions.length ? pipesFn : null;
  }
}
