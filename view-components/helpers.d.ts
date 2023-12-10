import { EmptyObject } from '../types/index';
export declare function removeUnusedProps<T extends EmptyObject, K extends keyof T = keyof T>(props: T, ...propNames: K[]): { [index in K]: T[index]; };
