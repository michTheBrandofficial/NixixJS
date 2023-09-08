import { nixixStore } from '../dom';
import { Store } from './classes';

function incrementId(prop: string) {
  if (nixixStore[prop] === undefined) {
    // @ts-ignore
    nixixStore[prop] = 0;
  } else {
    // @ts-ignore
    nixixStore[prop] = nixixStore[prop] + 1;
  }
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

function checkType(value: string | number | boolean) {
  const types = {
    boolean: Boolean,
    string: String,
    number: Number,
  };

  const type = types[typeof value];
  return type;
}

async function cleanup(store: Store) {
  await Promise.resolve();
  Object.keys(store).forEach((val) => {
    if (val !== '$$__id' && val !== '$$__value') {
      delete store[val];
    }
  });
}

export { incrementId, checkType, cleanup, isNotEqualObject, cloneObject };
