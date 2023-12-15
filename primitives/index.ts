import { Signal, Store } from "./classes";
import { nixixStore } from "../dom";
import {
  incrementId,
  cloneObject,
  removeChars,
  isFunction,
  isPrimitive,
  forEach,
  isNull,
} from "./helpers";
import { raise } from "../dom/helpers";
import { patchObj } from "./patchObj";

function callRef<R extends Element | HTMLElement>(ref: R): MutableRefObject {
  if (nixixStore["refCount"] === undefined) {
    nixixStore["refCount"] = 0;
  } else if (nixixStore["refCount"] != undefined) {
    nixixStore["refCount"] = nixixStore["refCount"] + 1;
  }
  return {
    current: {} as Current,
    refId: nixixStore["refCount"],
    nextElementSibling: ref,
    prevElementSibling: ref,
    parent: ref ? (ref as HTMLElement) : null,
  };
}

/**
 * takes an initialValue(string, boolean or number) and returns an array of a object and a function to update that object.
 */
function callSignal<S>(
  initialValue: S,
  config?: {
    equals: boolean;
  }
): [SignalObject<S>, SetSignalDispatcher<S>] {
  const signalId = incrementId("signalCount") as number;
  nixixStore["$$__lastReactionProvider"] = "signal";
  !(nixixStore.SignalStore) && (nixixStore.SignalStore = {});
  const { SignalStore } = nixixStore as Required<typeof nixixStore>;
  /**
   * value - in the worst case of it being an instance of object, throw an error.
   */
  let value: string | number | boolean = isFunction(initialValue)
    ? (initialValue as Function)()
    : initialValue;
  !isPrimitive(value) &&
    raise(`You must passe a primitve to the signal function`);
  SignalStore[`_${signalId}_`] = { value: value };
  let initValue = new Signal(value, signalId);
  return [
    initValue,

    function (
      newState,
    ) {
      let oldState = initValue.value;
      let newStatePassed = isFunction(newState)
        ? (newState as Function)(oldState)
        : newState;
        switch (true) {
          case config?.equals:
          case String(oldState) !== String(newStatePassed):
            const signal = SignalStore[`_${signalId}_`];
            signal.value = newStatePassed;
            initValue.value = newStatePassed;
            signal.effect?.forEach((eff) => eff());
        }
    },
  ];
}

/**
 * takes an object or array as a argument and returns an object containing the first arg and a function to update that object.
 */
function callStore<S>(
  initialValue: S,
  config?: {
    equals: boolean;
  }
): any[] {
  const storeId = incrementId("storeCount") as number;
  nixixStore["$$__lastReactionProvider"] = "store";
  nixixStore.Store === undefined  && (nixixStore.Store = {});
  const { Store: SStore } = nixixStore as Required<typeof nixixStore>
  let value: Array<any> | object = isFunction(initialValue)
    ? (initialValue as Function)()
    : initialValue;

  SStore[`_${storeId}_`] = { value: value };
  let initValue = new Store({ value: value, id: storeId });

  return [
    initValue,
    (newValue: (prev?: any) => any) => {
      let newValuePassed =
        isFunction(newValue)
          ? newValue(cloneObject(SStore[`_${storeId}_`].value))
          : newValue;

      switch (true) {
        case config?.equals: 
        default:
          patchObj(initValue, newValuePassed)
          const store = SStore[`_${storeId}_`];
          store.effect?.forEach((eff) => eff());
      }
    },
  ];
}

function getValueType<T>(value: any) {
  if (typeof value === "function")
    raise(`Cannot pass a function as a reactive value.`);
  if (["boolean", "number", "string"].includes(typeof value))
    return callSignal<T>(value);
  if (typeof value === "object") return callStore<T>(value);
}

function memo<T>(fn: () => T, deps: any[]) {
  const value = fn();
  if (value === null || value === undefined)
    raise(`Memoized value cannot be null or undefined`);
  const [state, setState] = getValueType<T>(value)!;
  callReaction(() => {
    setState(fn());
  }, deps);
  return state;
}

function pushFurtherDeps(
  callbackFn: CallableFunction,
  furtherDependents?: (Signal | Store)[]
) {
  if (furtherDependents) 
    resolveImmediate(() => {
      forEach(furtherDependents, (dep) => {
        // @ts-expect-error
        let id = dep.$$__id;
        if (isNull(id)) return
        switch (dep instanceof Signal) {
          case true: 
            pushInEffects(callbackFn, id, 'SignalStore')
          case false: 
            pushInEffects(callbackFn, id, 'Store')
        }
      })
    })
}

function pushInEffects(cb: CallableFunction, id: number | undefined, type: 'Store' | 'SignalStore') {
  let obj = nixixStore[type]?.[`_${id}_`];
  if (!obj) return;
  let effect = obj.effect
  if (effect) 
    if (effect.includes?.(cb)) return;
    else {
      effect.push(cb)
    }
  else obj.effect = [cb]
}

function dispatchEffect(
  callbackFn: CallableFunction,
  config?: "once",
  furtherDependents?: (Signal | Store)[],
  id = nixixStore["$$__lastReactionProvider"] === "signal"
    ? nixixStore["signalCount"]
    : nixixStore["storeCount"]
) {
  if (!config) {
    if (nixixStore["$$__lastReactionProvider"]) {
      const lastRP = nixixStore["$$__lastReactionProvider"];
      if (lastRP === "signal") {
        let obj = nixixStore.SignalStore?.[`_${id}_`];
        obj ? (obj.effect ? null : (obj.effect = [callbackFn])) : null;
      } else {
        let obj = nixixStore.Store?.[`_${id}_`];
        obj ? (obj.effect ? null : (obj.effect = [callbackFn])) : null;
      }
    }

    pushFurtherDeps(callbackFn, furtherDependents);
  }
}

async function resolveImmediate(fn: CallableFunction) {
  await Promise.resolve();
  (async (cb: CallableFunction) => {
    await Promise.resolve()
    cb()
  })(fn)
}

function effect(
  callbackFn: CallableFunction,
  config?: "once",
  furtherDependents?: (Signal | Store)[],
  id = nixixStore["$$__lastReactionProvider"] === "signal"
    ? nixixStore["signalCount"]
    : nixixStore["storeCount"]
) {
  dispatchEffect(callbackFn, config, furtherDependents, id);
  resolveImmediate(callbackFn)
}

function callEffect(
  callbackFn: CallableFunction,
  furtherDependents?: (Signal | Store)[]
) {
  pushFurtherDeps(callbackFn, furtherDependents);
  resolveImmediate(callbackFn)
}

function callReaction(
  callbackFn: CallableFunction,
  furtherDependents?: (Signal | Store)[]
) {
  pushFurtherDeps(callbackFn, furtherDependents);
}

function renderEffect(
  callbackFn: CallableFunction,
  config?: "once",
  furtherDependents?: (Signal | Store)[],
  id = nixixStore["$$__lastReactionProvider"] === "signal"
    ? nixixStore["signalCount"]
    : nixixStore["storeCount"]
) {
  window.addEventListener('DOMContentLoaded', function rendered () {
    callbackFn()
    this.window.removeEventListener('DOMContentLoaded', rendered)
  })
  dispatchEffect(callbackFn, config, furtherDependents, id);
}

function dispatchSignalRemoval(signal: StoreObject | SignalObject<any>) {
  if (signal instanceof Store) {
    delete nixixStore.Store?.[`_${signal.$$__id}_`];
    // @ts-expect-error
    nixixStore.Store && --nixixStore.Store.storeCount;
  } else if (signal instanceof Signal) {
    delete nixixStore.SignalStore?.[`_${signal.$$__id}_`];
    // @ts-expect-error
    nixixStore.SignalStore && --nixixStore.SignalStore.signalCount;
  }
}

function removeSignal(
  signals:
    | Array<StoreObject | SignalObject<any>>
    | (StoreObject | SignalObject<any>)
) {
  // remove the signals from the window object and decreases the count.
  signals instanceof Array
    ? signals.forEach((signal) => {
        dispatchSignalRemoval(signal);
      })
    : dispatchSignalRemoval(signals);
}

// This is only for simplicity
const signal = callSignal;
const store = callStore;

export {
  callRef,
  callSignal,
  signal,
  store,
  callStore,
  memo,
  getValueType,
  effect,
  callEffect,
  renderEffect,
  callReaction,
  Store,
  Signal,
  removeSignal,
};
