import { Signal, Store } from './classes';
import { nixixStore } from '../dom';
import {
  incrementId,
  checkType,
  cleanup,
  isNotEqualObject,
  cloneObject,
  removeChars,
} from './helpers';

function callRef<R extends Element | HTMLElement>(ref: R): MutableRefObject {
  if (nixixStore['refCount'] === undefined) {
    nixixStore['refCount'] = 0;
  } else if (nixixStore['refCount'] != undefined) {
    nixixStore['refCount'] = nixixStore['refCount'] + 1;
  }
  return {
    current: {} as Current,
    refId: nixixStore['refCount'],
    nextElementSibling: ref,
    prevElementSibling: ref,
    parent: ref ? (ref as HTMLElement) : null,
  };
}

/**
 * takes an initialValue(string, boolean or number) and returns an array of a object and a function to update that object.
 */
function callSignal<S>(
  initialValue: S
): [SignalObject<S>, SetSignalDispatcher<S>] {
  incrementId('signalCount');
  const signalId = nixixStore.signalCount;
  nixixStore['$$__lastReactionProvider'] = 'signal';

  if (nixixStore.SignalStore === undefined) {
    nixixStore.SignalStore = {};
  }
  /**
   * value - in the worst case of it being an instance of object, throw an error.
   */
  let value: string | number | boolean =
    typeof initialValue === 'function' ? initialValue() : initialValue;

  nixixStore.SignalStore[`_${signalId}_`] = { value: value };
  let initValue = new Signal(checkType(value)(value), signalId);
  return [
    initValue,

    function (
      newState,
      id = signalId,
      originalValue = nixixStore.SignalStore[`_${signalId}_`].value
    ) {
      let newStatePassed =
        typeof newState === 'function'
          ? (newState as Function)(originalValue)
          : newState;
      if (String(originalValue) !== String(newStatePassed)) {
        nixixStore.SignalStore[`_${id}_`].value = newStatePassed;
        initValue.value = newStatePassed;
        const effect = nixixStore['SignalStore'][`_${id}_`].effect;
        if (effect) {
          effect.forEach((eff) => eff());
        }
        return;
      }
    },
  ];
}

/**
 * takes an object or array as a argument and returns an object containing the first arg and a function to update that object.
 */
function callStore<S>(initialValue: S): any[] {
  incrementId('storeCount');
  const storeId = nixixStore.storeCount;
  nixixStore['$$__lastReactionProvider'] = 'store';
  if (nixixStore.Store === undefined) {
    nixixStore.Store = {};
  }

  let value: Array<any> | object =
    typeof initialValue === 'function' ? initialValue() : initialValue;

  nixixStore.Store[`_${storeId}_`] = { value: value };
  let initValue = new Store({ value: value, id: storeId, firstValue: 1 });
  nixixStore.Store[`_${storeId}_`].cleanup = () => {
    cleanup(initValue);
  };

  return [
    initValue,
    (newValue: (prev?: any) => any, id = storeId) => {
      let newValuePassed =
        typeof newValue === 'function'
          ? newValue(cloneObject(nixixStore.Store[`_${storeId}_`].value))
          : newValue;
      if (isNotEqualObject(initValue, newValuePassed)) {
        const store = nixixStore.Store[`_${id}_`];
        store.value =
          initValue.$$__value instanceof Array
            ? newValuePassed
            : {
                ...initValue.$$__value,
                ...newValuePassed,
              };
        initValue.$$__value =
          initValue.$$__value instanceof Array
            ? [...store.value]
            : { ...store.value };
        let effect = store.effect;
        if (effect !== undefined && effect !== null) {
          effect.forEach((eff) => eff());
        }

        // cleanup the store proxy on first call
        if (store.cleanup) {
          store.cleanup();
          delete store.cleanup;
        }
      }
    },
  ];
}

function pushFurtherDeps(
  callbackFn: CallableFunction,
  furtherDependents?: (Signal | Store)[]
) {
  if (furtherDependents) {
    furtherDependents.forEach((furtherDep) => {
      if (furtherDep instanceof Signal) {
        let obj = nixixStore.SignalStore?.[`_${furtherDep.$$__id}_`];
        obj
          ? obj.effect
            ? obj.effect.includes(callbackFn)
              ? null
              : obj.effect.push(callbackFn)
            : (obj.effect = [callbackFn])
          : null;
      } else if (furtherDep instanceof Store) {
        let obj = nixixStore.Store?.[`_${removeChars(furtherDep.$$__id)}_`];
        obj
          ? obj.effect
            ? obj.effect.includes(callbackFn)
              ? null
              : obj.effect.push(callbackFn)
            : (obj.effect = [callbackFn])
          : null;
      }
    });
  }
}

function dispatchEffect(
  callbackFn: CallableFunction,
  config?: 'once',
  furtherDependents?: (Signal | Store)[],
  id = nixixStore['$$__lastReactionProvider'] === 'signal'
    ? nixixStore['signalCount']
    : nixixStore['storeCount']
) {
  if (!config) {
    if (nixixStore['$$__lastReactionProvider']) {
      const lastRP = nixixStore['$$__lastReactionProvider'];
      if (lastRP === 'signal') {
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

function effect(
  callbackFn: CallableFunction,
  config?: 'once',
  furtherDependents?: (Signal | Store)[],
  id = nixixStore['$$__lastReactionProvider'] === 'signal'
    ? nixixStore['signalCount']
    : nixixStore['storeCount']
) {
  dispatchEffect(callbackFn, config, furtherDependents, id);

  (async function (cb) {
    await Promise.resolve();
    cb();
  })(callbackFn);
}

function callEffect(
  callbackFn: CallableFunction,
  furtherDependents?: (Signal | Store)[]
) {
  pushFurtherDeps(callbackFn, furtherDependents);

  (async function (cb) {
    await Promise.resolve();
    cb();
  })(callbackFn);
}

function callReaction(
  callbackFn: CallableFunction,
  furtherDependents?: (Signal | Store)[]
) {
  pushFurtherDeps(callbackFn, furtherDependents);
}

function renderEffect(
  callbackFn: CallableFunction,
  config?: 'once',
  furtherDependents?: (Signal | Store)[],
  id = nixixStore['$$__lastReactionProvider'] === 'signal'
    ? nixixStore['signalCount']
    : nixixStore['storeCount']
) {
  callbackFn();
  dispatchEffect(callbackFn, config, furtherDependents, id);
}

function dispatchSignalRemoval(signal: StoreObject | SignalObject<any>) {
  if (signal instanceof Store) {
    delete window.$$__NixixStore.Store[`_${signal.$$__id}_`];
    --window.$$__NixixStore.storeCount;
  } else if (signal instanceof Signal) {
    delete window.$$__NixixStore.SignalStore[`_${signal.$$__id}_`];
    --window.$$__NixixStore.signalCount;
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

export {
  callRef,
  callSignal,
  callStore,
  effect,
  callEffect,
  renderEffect,
  callReaction,
  Store,
  Signal,
  removeSignal,
};
