import { checkType, entries, forEach, isPrimitive } from "./helpers";
import { signal } from "../primitives";
import { EmptyObject } from "../types";
import { nixixStore } from "../dom";

type StoreProps<T extends object | any[]> = {
  id: number | string;
  value?: T;
};

type StoreProxyHandler<T extends object> = ProxyHandler<T> & {
  signalMap: Map<string | symbol, ReturnType<typeof signal>>
};

function createStoreProxy(obj: object | any[]) {
  // there are levels to each proxy; so we can use a map to store the names and signals for each;
  const proxy = new Proxy<EmptyObject>(obj, {
    signalMap: new Map(),
    get(target, p) {
      let jsx = nixixStore.jsx
      const val = target[p];
      let returnedValue: any = null;
      if (!isPrimitive(val)) returnedValue = val;
      else {
        let signalMap = this.signalMap;
        if (jsx) {
          if (signalMap.has(p)) returnedValue = signalMap.get(p)?.[0]
          else {
            const valueSignal = signal(val)
            signalMap.set(p, valueSignal)
            returnedValue = valueSignal![0]
          }
        } else returnedValue = val;
      }
      return returnedValue
    },
    set(target, p, newValue) {
      // set the value and then set the signal, if there is one;
      target[p] = newValue;
      this.signalMap.get(p)?.[1]?.(newValue);
      return true;
    },
  } as StoreProxyHandler<EmptyObject>);

  return proxy;
}
export class Store {
  constructor({ value, id }: StoreProps<object | any[]>) {
    switch (Array.isArray(value)) {
      case true: 
        return new Store_Array({ value, id });
      case false: 
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
