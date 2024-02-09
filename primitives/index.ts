import { Signal, Store } from "./classes";
import { type EmptyObject } from "../dom";
import { cloneObject, isFunction, isPrimitive, forEach } from "./helpers";
import { getSignalValue, raise } from "../dom/helpers";
import { patchObj } from "./patchObj";
import type { Primitive, NonPrimitive, SetSignalDispatcher, Signal as Signal2 } from "./types";
import { nixixStore } from "../dom/index";

function callRef<R extends Element | HTMLElement>(ref: R): MutableRefObject {
  return {
    current: {} as Current,
    nextElementSibling: ref,
    prevElementSibling: ref,
    parent: ref ? (ref as HTMLElement) : null,
  };
}

function callSignal<S>(
  initialValue: S,
  config?: {
    equals: boolean;
  }
): [Signal2<S>, SetSignalDispatcher<S>] {
  let value: string | number | boolean = isFunction(initialValue)
  ? (initialValue as Function)()
  : initialValue;
  // value - in the worst case of it being an instance of object, throw an error.
  !isPrimitive(value) &&
    raise(`You must pass a primitve to the signal function`);
   const initValue = new Signal(value, true, []);
   const setter: SetSignalDispatcher<S> = function (newState) {
    let oldState = initValue.value;
    let newStatePassed = isFunction(newState)
      ? (newState as Function)(oldState)
      : newState;
    switch (true) {
      case config?.equals:
      case String(oldState) !== String(newStatePassed):
        initValue.value = newStatePassed;
        initValue.$$__effects?.forEach((eff) => eff());
    }
  }
  return [initValue as any, setter];
}

function splitProps<T extends EmptyObject<any>>(obj: T, ...props: (keyof T)[]) {
  const splittedProps: Record<any, any> = {};
  forEach(props, (p) => {
    if (p in obj) {
      splittedProps[p] = obj[p];
      delete obj[p]  
    }
  })
  return splittedProps;
}

function closeReactiveProxyScope(fn: (() => void)) {
  nixixStore.reactiveScope = false;
  fn()
  nixixStore.reactiveScope = true;
}

function callStore<S extends NonPrimitive>(
  initialValue: S,
  config?: {
    equals: boolean;
  }
): any[] {

  let value = cloneObject(
    isFunction(initialValue) ? (initialValue as Function)() : initialValue
  );
  let objCopy = cloneObject(value);
  const initValue = new Store({ value: value, $$__effects: [] });
  const setter = (newValue: (prev?: any) => any) => {
    let reactiveProps: Record<string, any> = splitProps(initValue, '$$__effects', '$$__reactive');
    let newValuePassed = isFunction(newValue)
      ? newValue(objCopy)
      : newValue;
    switch (true) {
      case config?.equals:
      default:
        closeReactiveProxyScope(() => patchObj(initValue, newValuePassed));
        patchObj(objCopy, newValuePassed);
        Object.assign(initValue, reactiveProps);
        initValue?.$$__effects?.forEach?.((eff) => eff());
    }
  }

  return [initValue, setter];
}

function getValueType<T>(value: any) {
  if (isFunction(value)) raise(`Cannot pass a function as a reactive value.`);
  if (isPrimitive(value)) return callSignal<T>(value);
  if (typeof value === "object") return callStore<NonPrimitive>(value);
}

function memo<T>(fn: () => T, deps: any[]) {
  const value = fn();
  const [state, setState] = getValueType<T>(value)!;
  callReaction(() => {
    setState(fn());
  }, deps);
  return state;
}

function concat<T extends Signal>(
  ...templ: Array<T | TemplateStringsArray | Primitive>
) {
  // ['', 'jjdj', '']
  // [_Signal2, _Signal2]
  const templates = templ[0] as TemplateStringsArray;
  const expressions = templ.splice(1) as T[];
  return memo(() => {
    return templates.reduce((p, v, i) => {
      const expression = expressions[i - 1];
      let returnedVal: Primitive = "";
      if (expression) {
        if (expression.$$__reactive) returnedVal = getSignalValue(expression);
        else if (isPrimitive(expression)) returnedVal = expression as any;
      }
      return p + returnedVal + v;
    });
  }, expressions);
}

function pushFurtherDeps(
  callbackFn: CallableFunction,
  furtherDependents?: (Signal | Store)[]
) {
  if (furtherDependents)
    resolveImmediate(() => {
      forEach(furtherDependents, (dep) => {
        dep?.$$__reactive && pushInEffects(callbackFn, dep as Signal);
      });
    });
}

function pushInEffects(cb: CallableFunction, dep: Signal | Store) {
  // check if the dep is a Store then check if it is a Signal
  let { $$__effects: effectsArray } = dep;
  if (effectsArray) !effectsArray.includes?.(cb) && effectsArray.push(cb);
}

async function resolveImmediate(fn: CallableFunction) {
  await Promise.resolve();
  (async (cb: CallableFunction) => {
    cb();
  })(fn);
}

const effect = callEffect;

function callEffect(
  callbackFn: CallableFunction,
  furtherDependents?: (Signal | Store)[]
) {
  pushFurtherDeps(callbackFn, furtherDependents);
  resolveImmediate(callbackFn);
}

function callReaction(
  callbackFn: CallableFunction,
  furtherDependents?: (Signal | Store)[]
) {
  pushFurtherDeps(callbackFn, furtherDependents);
}

function renderEffect(
  callbackFn: CallableFunction,
  furtherDependents?: (Signal | Store)[],
) {
  window.addEventListener("DOMContentLoaded", function rendered() {
    callbackFn();
    this.window.removeEventListener("DOMContentLoaded", rendered);
  });
  pushFurtherDeps(callbackFn, furtherDependents);
}

function dispatchSignalRemoval(signal: Store | Signal) {
  delete signal.$$__effects;
  // @ts-expect-error
  delete signal.$$__reactive;
}

function removeSignal<T extends Store | Signal = Store | Signal>(
  signals: T | Array<T>
) {
  Array.isArray(signals)
    ? forEach(signals, (signal) => {
        dispatchSignalRemoval(signal);
      })
    : dispatchSignalRemoval(signals);
}

function dispatchEffectRemoval(fn: CallableFunction, signal: Store | Signal) {
  const { $$__effects: effects } = signal;
  if (effects) {
    if (effects.includes(fn)) effects.splice(effects.indexOf(fn), 1);
    return true;
  } else return false;
}

function removeEffect(fn: CallableFunction, signal: Store | Signal) {
  dispatchEffectRemoval(fn, signal);
}

// This is only for simplicity
const signal = callSignal;
const store = callStore;

export {
  callRef,
  callSignal,
  signal,
  store,
  memo,
  concat,
  callStore,
  getValueType,
  getSignalValue,
  splitProps,
  effect,
  callEffect,
  renderEffect,
  callReaction,
  Store,
  Signal,
  removeSignal,
  removeEffect,
};
