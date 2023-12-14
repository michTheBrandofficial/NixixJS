import { checkType, entries, forEach, isPrimitive } from "./helpers";
import { signal } from "../primitives";
import { EmptyObject } from "../types";
import { nixixStore } from "../dom";

type StoreProps<T extends object | any[]> = {
  id: number | string;
  value?: T;
};

type StoreProxyHandler<T extends object> = ProxyHandler<T> & {
  firstAccess?: boolean;
  trueSignal: ReturnType<typeof signal> | null;
};

function createStoreProxy(obj: object | any[]) {
  // on the first access, return a value or init an return a
  // signal value
  const proxy = new Proxy<EmptyObject>(obj, {
    // @ts-ignore
    firstAccess: true,
    trueSignal: null,
    get(target, p) {
      let jsx = nixixStore.jsx
      const val = target[p];
      if (!isPrimitive(val)) return val;
      switch (this.firstAccess) {
        case true:
          this.firstAccess = false;
          // if it is not in a jsx scrope - nixix.create call;
          if (!jsx) return val;
          else {
            this.trueSignal = signal(val);
            return this.trueSignal[0];
          }
        case false:
          // if it is not in a jsx scrope - nixix.create call;
          if (!jsx) return val;
          else {
            return this.trueSignal![0];
          }
      }
    },
    set(target, p, newValue) {
      // set the value and then set the signal, if there is one;
      target[p] = newValue;
      this.trueSignal?.[1]?.(newValue);
      return true;
    },
  } as StoreProxyHandler<EmptyObject>);

  return proxy;
}
/**
 * nixix should keep a jsx reference oh;
 * We need an $$__id to append reactions to in it.
 * the value nothing like $$__name;
 */
export class Store {
  constructor({ value, id }: StoreProps<object | any[]>) {
    if (value instanceof Array) {
      return new Store_Array({ value, id });
    } else {
      return new Store_Object({ value, id });
    }
  }
}

class Store_Object {
  constructor({ value, id }: StoreProps<object>) {
    // @ts-ignore
    value!.$$__id = id;
    const allValues = entries(value!);
    forEach(allValues, ([k, v]) => {
      // loop and get non primitives properties and proxy them;
      switch (isPrimitive(v)) {
        case true:
          break;
        case false:
          // @ts-expect-error
          value[k] = new Store({ value: v, id });
          break;
      }
    });
    // do a foreach to make the nested objects stores too;
    const proxyvalue = createStoreProxy(value!);
    return proxyvalue;
  }
}

class Store_Array {
  constructor({ value, id }: StoreProps<object>) {
    // @ts-ignore
    value!.$$__id = id;
    forEach(value as any[], (el, i) => {
      // loop and get non primitives properties and proxy them;
      switch (isPrimitive(el)) {
        case true:
          break;
        case false:
          // @ts-expect-error
          value[i] = new Store({ value: el, id });
          break;
      }
    });
    // do a foreach to make the nested objects stores too;
    const proxyvalue = createStoreProxy(value!);
    return proxyvalue;
  }
}
