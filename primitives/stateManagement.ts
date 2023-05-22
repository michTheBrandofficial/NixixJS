import { nixixStore } from '../index';
import { diffSignal_, diffStore_ } from '../asyncParsers';
import { Signal, Store } from './classes';

function incrementId(prop: string) {
  if (nixixStore[prop] === undefined) {
    // @ts-ignore
    nixixStore[prop] = 0;
  } else {
    // @ts-ignore
    nixixStore[prop] = nixixStore[prop] + 1;
  }
}

export function callSignal<S>(initialValue: S): [SignalObject<S>, SetSignalDispatcher<S>] {
  incrementId('signalCount');
  const signalId = nixixStore.signalCount;
  nixixStore['$$__lastReactionProvider'] = 'signal';

  if (nixixStore.SignalStore === undefined) {
    nixixStore.SignalStore = {};

    nixixStore.diffSignal = diffSignal_;
  }
  /**
   * value - in the worst case of it being an instance of object, throw an error.
   */
  let value: (string | number | boolean) =
    typeof initialValue === 'function' ? initialValue() : initialValue;

  nixixStore.SignalStore[`_${signalId}_`] = { value: value, dependents: [] };
  let initValue = new Signal(checkType(value)(value), signalId);
  return [
    initValue,

    function (
      newState,
      id = signalId,
      originalValue = nixixStore.SignalStore[`_${signalId}_`].value
    ) {
      let newStatePassed =
        typeof newState === 'function' ? newState() : newState;
      if (String(originalValue) !== String(newStatePassed)) {
        nixixStore.SignalStore[`_${id}_`].value = newStatePassed;

        nixixStore.diffSignal(id);
        initValue.value = newStatePassed;
        if (nixixStore['SignalStore'][`_${id}_`].effect) {
          nixixStore['SignalStore'][`_${id}_`].effect();
        }
        return;
      }
    },
  ];
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

export function callStore<S>(initialValue: S): any[] {
  incrementId('storeCount');
  const storeId = nixixStore.storeCount;
  nixixStore['$$__lastReactionProvider'] = 'store';
  if (nixixStore.Store === undefined) {
    nixixStore.Store = {};

    nixixStore.diffStore = diffStore_;
  }

  let value: Array<any> | object =
    typeof initialValue === 'function' ? initialValue() : initialValue;

  nixixStore.Store[`_${storeId}_`] = { value: value, dependents: [] };
  let initValue = new Store({ value: value, id: storeId, firstValue: 1 });
  cleanup(initValue);
  return [
    initValue,
    (newValue: () => any, id = storeId) => {
      let newValuePassed =
        typeof newValue === 'function' ? newValue() : newValue;
      if (
        JSON.stringify(initValue.$$__value) !==
        JSON.stringify({ ...initValue.$$__value, ...newValuePassed })
      ) {
        nixixStore.Store[`_${id}_`].value = {
          ...initValue.$$__value,
          ...newValuePassed,
        };

        nixixStore.diffStore(id);
        initValue.$$__value = { ...initValue.$$__value, ...newValuePassed };
        let effect = nixixStore['Store'][`_${id}_`].effect;
        if (effect !== undefined && effect !== null) {
          effect();
        }
      }
    },
  ];
}

export async function cleanup(store: Store) {
  await Promise.resolve();
  Object.keys(store).forEach((val) => {
    if (val !== '$$__id' && val !== '$$__value') {
      delete store[val];
    }
  });
}

export function effect(
  callbackFn: CallableFunction,
  config?: 'once',
  id = nixixStore['$$__lastReactionProvider'] === 'signal'
    ? nixixStore['signalCount']
    : nixixStore['storeCount']
) {
  if (!config) {
    if (nixixStore['$$__lastReactionProvider']) {
      const lastRP = nixixStore['$$__lastReactionProvider'];
      if (lastRP === 'signal') {
        let obj = nixixStore.SignalStore?.[`_${id}_`];
        obj ? (obj.effect ? null : (obj.effect = callbackFn)) : null;
      } else {
        let obj = nixixStore.Store?.[`_${id}_`];
        obj ? (obj.effect ? null : (obj.effect = callbackFn)) : null;
      }
    }
  }

  (async function (cb) {
    await Promise.resolve();
    cb();
  })(callbackFn);
}
