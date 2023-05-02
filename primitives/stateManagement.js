import { diffSignal_, diffStore_ } from '../asyncParsers';
import { Signal, Store } from './classes';

/**
 * @template S
 * @typedef {import('../types').SignalObject<S>} SignalObject<S>
 */
/**
 * @template S
 * @typedef {import('../types').SetSignalDispatcher<S>} SetSignalDispatcher<S>
 */
/**
 * @typedef {import('../types').Root} Root
 */

function incrementId(prop) {
  if (window[prop] === undefined) {
    // @ts-ignore
    window[prop] = 0;
  } else {
    // @ts-ignore
    window[prop] = window[prop] + 1;
  }
}

/**
 * @template S
 * @param {S} initialValue
 * @returns {[SignalObject<S>, SetSignalDispatcher<S>]}
 */
export function callSignal(initialValue) {
  incrementId('signalCount');
  const signalId = window.signalCount;
  window['$$__lastReactionProvider'] = 'signal';

  if (window.SignalStore === undefined) {
    window.SignalStore = {};

    window.diffSignal = diffSignal_;
  }
  /**
   * @type {(string | number | boolean) | object} value - in the worst case of it being an instance of object, throw an error.
   */
  let value =
    typeof initialValue === 'function' ? initialValue() : initialValue;

  /**
   * @type {Root['window']} myWindow
   */
  //@ts-ignore
  const myWindow = window;
  myWindow.SignalStore[`_${signalId}_`] = { value: value, dependents: [] };
  let initValue = new Signal(checkType(value)(value), signalId);
  return [
    initValue,

    function (
      newState,
      id = signalId,
      originalValue = window.SignalStore[`_${signalId}_`].value
    ) {
      let newStatePassed =
        typeof newState === 'function' ? newState() : newState;
      if (String(originalValue) !== String(newStatePassed)) {
        window.SignalStore[`_${id}_`].value = newStatePassed;

        window.diffSignal(id);
        initValue.value = newStatePassed;
        if (window['SignalStore'][`_${id}_`].effect) {
          window['SignalStore'][`_${id}_`].effect();
        }
        return;
      }
    },
  ];
}

function checkType(value) {
  const types = {
    boolean: Boolean,
    string: String,
    number: Number,
  };

  const type = types[typeof value];
  return type;
}

/**
 * @template S
 * @param {S} initialValue
 * @returns {any[]}
 */
export function callStore(initialValue) {
  incrementId('storeCount');
  const storeId = window.storeCount;
  window['$$__lastReactionProvider'] = 'store';
  if (window.Store === undefined) {
    window.Store = {};

    window.diffStore = diffStore_;
  }
  /**
   * @type {Array<any>| object} value - in the worst case of it being an instance of an object, throw an error.
   */
  let value =
    typeof initialValue === 'function' ? initialValue() : initialValue;

  window.Store[`_${storeId}_`] = { value: value, dependents: [] };
  let initValue = new Store({ value: value, id: storeId, firstValue: 1 });
  cleanup(initValue);
  return [
    initValue,
    (newValue, id = storeId) => {
      let newValuePassed =
        typeof newValue === 'function' ? newValue() : newValue;
      if (
        JSON.stringify(initValue.$$__value) !==
        JSON.stringify({ ...initValue.$$__value, ...newValuePassed })
      ) {
        window.Store[`_${id}_`].value = {
          ...initValue.$$__value,
          ...newValuePassed,
        };

        window.diffStore(id);
        initValue.$$__value = { ...initValue.$$__value, ...newValuePassed };
        let effect = window['Store'][`_${id}_`].effect;
        if (effect !== undefined && effect !== null) {
          effect();
        }
      }
    },
  ];
}

/**
 *
 * @param {Store} store
 * @param {number} store;
 */
export async function cleanup(store) {
  await Promise.resolve();
  Object.keys(store).forEach((val) => {
    if (val !== '$$__id' && val !== '$$__value') {
      delete store[val];
    }
  });
}

/**
 * @param {CallableFunction} callbackFn
 * @param {'once'} [config]
 */
export function effect(
  callbackFn,
  config,
  id = window['$$__lastReactionProvider'] === 'signal'
    ? window['signalCount']
    : window['storeCount']
) {
  if (!config) {
    if (window['$$__lastReactionProvider']) {
      const lastRP = window['$$__lastReactionProvider'];
      if (lastRP === 'signal') {
        let obj = window.SignalStore?.[`_${id}_`];
        obj ? (obj.effect ? null : (obj.effect = callbackFn)) : null;
      } else {
        let obj = window.Store?.[`_${id}_`];
        obj ? (obj.effect ? null : (obj.effect = callbackFn)) : null;
      }
    }
  }

  (async function (cb) {
    await Promise.resolve();
    cb();
  })(callbackFn);
}
