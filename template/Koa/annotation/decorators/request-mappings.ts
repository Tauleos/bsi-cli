import { METHOD_METADATA, PATH_METADATA } from './constants';

const createMappingDecorator = (method: string) => (
  path: string
): MethodDecorator => {
  return (target, key, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
    return descriptor;
  };
};
export const Get = createMappingDecorator('GET');
export const Post = createMappingDecorator('POST');
