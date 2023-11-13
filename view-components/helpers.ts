import { EmptyObject } from '../types/index'

export function removeUnusedProps<
  T extends EmptyObject,
  K extends keyof T = keyof T
>(props: T, ...propNames: K[]) {
  type ReturnType = {
    [index in K]: T[index];
  }

  if (!props) return {} as ReturnType 
  const newProps: { [index: string]: any } = {};
  for (const propName of propNames) {
    newProps[propName as string] = props[propName];
    delete props[propName];
  }
  return newProps as ReturnType;
}
