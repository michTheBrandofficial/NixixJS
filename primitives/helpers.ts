import { nixixStore } from '../dom';
import { Store } from './classes';

function incrementId(prop: keyof typeof nixixStore) {
  if (nixixStore[prop] === undefined) {
    // @ts-ignore
    nixixStore[prop] = 0;
  } else {
    // @ts-ignore
    nixixStore[prop] = nixixStore[prop] + 1;
  }
  return nixixStore[prop];
}

function entries(obj: object) {
  return Object.entries(obj)
}

function isFunction(val:any) {
  return typeof val === 'function' 
}

function cloneObject(object: any) {
  return JSON.parse(JSON.stringify(object));
}

function isNotEqualObject(oldObject: StoreObject, newObject: StoreObject) {
  return (
    JSON.stringify(oldObject.$$__value) !==
    JSON.stringify(
      oldObject.$$__value instanceof Array
        ? newObject
        : {
            ...oldObject.$$__value,
            ...newObject,
          }
    )
  );
}

function removeChars(str: string | number) {
  return String(str).replace(/_/g, '');
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

  const type = types[typeof value as (keyof typeof types)];
  return type;
}

function isPrimitive(value:any) {
  return ['string', 'boolean', 'number'].includes(typeof value)
}

type ForEachParams<T> = Parameters<Array<T>['forEach']>;

/**
 * Returns void, to be used when you want to mutate some outside code in an array
 */
function forEach<T>(arr:Array<T>, cb: ForEachParams<T>[0], thisArg?: ForEachParams<T>[1]) {
  arr.forEach(cb, thisArg)
}


async function cleanup(store: Store) {
  await Promise.resolve();
  Object.keys(store).forEach((val) => {
    if (val !== '$$__id' && val !== '$$__value') {
      // @ts-ignore
      delete store[val];
    }
  });
}

export {
  incrementId,
  checkType,
  isNull,
  isPrimitive,
  removeChars,
  cleanup,
  isNotEqualObject,
  cloneObject,
  isFunction,
  entries,
  forEach
};
