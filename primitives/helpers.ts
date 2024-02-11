import { type EmptyObject } from "../dom";
import { Signal, Store } from "./classes";
import { type NonPrimitive } from "./types";

function splitProps<T extends EmptyObject<any>>(obj: T, ...props: (keyof T)[]) {
  const splittedProps: Record<any, any> = {};
  forEach(props, (p) => {
    if (p in obj) {
      splittedProps[p] = obj[p];
      delete obj[p];
    }
  });
  return splittedProps;
}

function entries(obj: object) {
  return Object.entries(obj);
}

function cloneObject<T extends NonPrimitive>(object: T) {
  return JSON.parse(JSON.stringify(object)) as T;
}

function removeChars(str: string | number) {
  return String(str).replace(/_/g, "");
}

function isNull(val: any) {
  return val === null || val === undefined;
}

function checkType(value: string | number | boolean) {
  const types = {
    boolean: Boolean,
    string: String,
    number: Number,
  };

  const type = types[typeof value as keyof typeof types];
  return type;
}

function isPrimitive(value: any) {
  return (
    ["string", "boolean", "number", "bigint"].includes(typeof value) ||
    isNull(value)
  );
}

type ForEachParams<T> = Parameters<Array<T>["forEach"]>;

/**
 * Returns void, to be used when you want to mutate some outside code in an array
 */
function forEach<T>(
  arr: Array<T>,
  cb: ForEachParams<T>[0],
  thisArg?: ForEachParams<T>[1]
) {
  arr?.forEach?.(cb, thisArg);
}

function isReactive(value: any) {
  return (value as Signal | Store).$$__reactive as boolean;
}

export {
  checkType,
  cloneObject,
  entries,
  forEach,
  isNull,
  isPrimitive,
  isReactive,
  removeChars,
  splitProps,
};
