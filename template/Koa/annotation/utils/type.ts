export function isFunction(target:()=>void):boolean{
  return typeof target === 'function';
}

export function isConstructor(target:string):boolean{
  return target === 'constructor';
}