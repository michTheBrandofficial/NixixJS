import { EmptyObject } from '../../types/index';

// primitives
export type SetSignalDispatcher<S> = (newValue: S | ((prev: S) => S)) => void;
export type SetStoreDispatcher<S> = (newValue: S | ((prev: S) => S)) => void;

export type SignalObject<S> = {
  value: S;
} & S;

export type StoreObject<O> = O;

export type MemoSignal<S> = SignalObject<S>;

export type MemoStore<O> = StoreObject<O>;

export class Signal {
  'value': any;
  '$$__id': number;
}

export class Store {
  '$$__id': string | number;
}

export interface MutableRefObject<T> {
  current: T;
  refId?: number;
  nextElementSibling: Element;
  prevElementSibling: Element;
  parent: HTMLElement;
}

type Primitives = string | boolean | number;

type NonPrimitives = EmptyObject | Array<any>

/**
 * Returns a tuple of the initial value and a setter function to update the values.
 *
 * @param initialValue initial value to be tracked: can be an object or an array.
 * @param config this object is optional, it requires an equals property of type 'boolean'. If equals is 'true', it will skip comparing the two objects for sameness else it will check for sameness before updating the signal
 */
export function callSignal<S extends Primitives>(
  initialValue: S,
  config?: {
    equals: boolean;
  }
): [SignalObject<S>, SetSignalDispatcher<S>];

/**
 * Returns a tuple of the initial value and a setter function to update the values.
 *
 * @param initialValue initial value to be tracked: can be an object or an array.
 * @param config this object is optional, it requires an equals property of type 'boolean'. If equals is 'true', it will skip comparing the two objects for sameness else it will check for sameness before updating the store
 */
export function callStore<O extends NonPrimitives>(
  initialValue: O,
  config?: {
    equals: boolean;
  }
): [StoreObject<O>, SetStoreDispatcher<O>];

export const signal: typeof callSignal;

export const store: typeof callStore;

export function getValueType<T>(value: any): any[] | undefined

type Deps = (SignalObject<Primitives> | StoreObject<NonPrimitives>)[]

/**
 * Creates a read-only signal or store which depends on other signals or stores.
 *
 * @param fn callback function to return the initialValue
 * @param deps array of signals or stores to which when changed re-runs and updates the memo's value;
 */
export function memo<S extends Primitives>(
  fn: () => S,
  deps: Deps
): MemoSignal<S>;
export function memo<S extends NonPrimitives>(
  fn: () => S,
  deps: Deps
): MemoStore<S>;

/**
 * @deprecated PLEASE DO NOT USE THIS FUNCTION, USE `callEffect` or `callReaction`
 * Tracks the closest (signal or store) and calls the callback function whenever the (signal or store)'s value changes.
 * If there is no signal or store, it does no tracking.
 *
 * @param callbackFn callback function to be called once all the synchronous code has finished running.
 */
export function effect(
  callbackFn: CallableFunction,
  config?: 'once' | null,
  deps?: Deps
): void;

/**
 *
 * @param callbackFn callback function to be executed
 * @param deps furtherDependencies array to subscribe to
 * This function doesn't work like the effect function that subscribes it's callback function to the last signal or store created.
 */
export function callEffect(
  callbackFn: CallableFunction,
  deps?: Deps
): void;

/**
 *
 * @param callbackFn callback function to be executed
 * @param deps furtherDependencies array to subscribe to
 * This function doesn't work like the effect function that subscribes it's callback function to the last signal or store created. It does not call the callback else just subscribes to all of the signals or stores in the dependencies array
 */
export function callReaction(
  callbackFn: CallableFunction,
  deps?: Deps
): void;

/**
 * Tracks the closest (signal or store) and calls the callback function whenever the (signal or store)'s value changes.
 * If there is no signal or store, it does no tracking.
 *
 * @param callbackFn callback function to be called once the DOM content has loaded.
 */
export function renderEffect(
  callbackFn: CallableFunction,
  config?: 'once' | null,
  deps?: Deps
): void;

export function removeSignal(
  signals:
    | Array<StoreObject<any> | SignalObject<any>>
    | StoreObject<any>
    | SignalObject<any>
): void;

/**
     * ```jsx
     * This function is used to get a reference to a dom element. To get the element you want to manipulate, add the 'bind:ref' prop with it's value as the ref variable. 
     * import { callRef } from 'nixix';
     * 
     * function App() {
        const div = callRef();

        return (
          <div bind:ref={div} >I'm a div</div>
        )
     }
     * 
     * ```
     */
export function callRef<
  R extends Element | null =
    | any
    | HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
>(ref?: R): MutableRefObject<R | null>;
