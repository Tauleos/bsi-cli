import { ROUTE_ARGS_METADATA } from './constants';
import { RouteParamTypes } from './enum';

export type ParamData = Record<string, unknown> | string | number;
function createRouteParamDecorator(paramType: RouteParamTypes) {
  return (data?: ParamData): ParameterDecorator => (target, key, index) => {
    console.log(target, key, index);
    const args =
      Reflect.getMetadata(ROUTE_ARGS_METADATA, target.constructor, key) || {};
    Reflect.defineMetadata(
      ROUTE_ARGS_METADATA,
      { ...args, [`${paramType}:${index}`]: { index, data } },
      target.constructor,
      key
    );
  };
}

export const Request = createRouteParamDecorator(RouteParamTypes.REQUEST);
export const Ip = createRouteParamDecorator(RouteParamTypes.IP);
export const Param = createRouteParamDecorator(RouteParamTypes.PARAM);
export const Query = createRouteParamDecorator(RouteParamTypes.QUERY);
export const Req = Request;
