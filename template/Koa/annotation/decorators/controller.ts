import { PATH_METADATA } from './constants';

export function Controller(path: string):ClassDecorator {
  return (target: Record<symbol, unknown>) => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  };
}