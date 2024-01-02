import { entries, forEach, isPrimitive } from "./helpers";
import { signal } from "../primitives";
import { EmptyObject } from "../types";

type StoreProps<T extends object | any[]> = {
  value?: T;
  $$__effects?: CallableFunction[];
};

type StoreProxyHandler<T extends object> = ProxyHandler<T> & {
  signalMap: Map<string | symbol, ReturnType<typeof signal>>;
};

const skippedPropNames = ["$$__reactive", "$$__effects"] as const;
const arrayPropNames: (keyof Array<any>)[] = [ 'length' ]

function isArrayPropName(target: object | any[], p: any) {
  return Array.isArray(target) && arrayPropNames.includes(p);
}

function createStoreProxy<T = EmptyObject>(obj: object | any[]): T {
  // there are levels to each proxy; so we can use a Map to store the names and signals for each;
  const proxy = new Proxy<EmptyObject>(obj, {
    signalMap: new Map(),
    get(target, p) {
      if (!(p in target)) return null; 
      const val = target[p];
      let returnedValue: any = null;
      const skipProps = skippedPropNames.includes(
        p as (typeof skippedPropNames)[number]
      );
      if (!isPrimitive(val) || typeof p === "symbol" || skipProps || isArrayPropName(target, p))
        returnedValue = val;
      else {
        let signalMap = this.signalMap;
        if (signalMap.has(p)) returnedValue = signalMap.get(p)?.[0];
        else {
          const valueSignal = signal(val);
          signalMap.set(p, valueSignal);
          returnedValue = valueSignal![0];
        }
      }
      return returnedValue;
    },
    set(target, p, newValue) {
      // set the value and then set the signal, if there is one;
      target[p] = newValue;
      this.signalMap.get(p)?.[1]?.(newValue);
      return true;
    },
  } as StoreProxyHandler<EmptyObject>);

  return proxy as T;
}

export class Store {
  constructor({ value, $$__effects }: StoreProps<object | any[]>) {
    // @ts-expect-error
    return Array.isArray(value)
      ? new Store_Array({ value, $$__effects })
      : new Store_Object({ value, $$__effects });
  }
}

class Store_Object {
  constructor({ value }: StoreProps<object>) {
    const allValues = entries(value!);
    forEach(allValues, ([k, v]) => {
      // loop and get non primitives properties and proxy them;
      switch (isPrimitive(v)) {
        case false:
          // @ts-expect-error
          value[k] = new Store({ value: v });
          break;
      }
    });
    const proxyvalue = createStoreProxy<Store>(value!);
    proxyvalue.$$__effects = []
    proxyvalue.$$__reactive = true;
    return proxyvalue;
  }
}

class Store_Array {
  constructor({ value }: StoreProps<object>) {
    forEach(value as any[], (el, i) => {
      // loop and get non primitives properties and proxy them;
      switch (isPrimitive(el)) {
        case false:
          // @ts-expect-error
          value[i] = new Store({ value: el });
          break;
        }
      });
      const proxyvalue = createStoreProxy<Store>(value!);
      proxyvalue.$$__effects = [],
      proxyvalue.$$__reactive = true;
    return proxyvalue;
  }
}

export interface Store {
  $$__effects: CallableFunction[];
  $$__reactive: true;
  [index: string | number]: any;
}
