import { EmptyObject } from "../../types/index";

// primitive
export type SetSignalDispatcher<S> = (newValue: S | ((prev: S) => S)) => void
;
export type SetStoreDispatcher<S> = (newValue: S | ((prev: S) => S)) => void;

export type Signal<S> = S extends null | undefined
  ? {
    readonly value: S;
  } & string
  : {
    readonly value: S;
  } & S;

export type Store<O> = {
  [index in keyof O]: O[index] extends NonPrimitive
    ? Store<O[index]>
    : Signal<O[index]>;
};

export type MemoSignal<S> = Signal<S>;

export type MemoStore<O> = Store<O>;

export interface MutableRefObject<T> {
  current: T;
  refId?: number;
  nextElementSibling: Element;
  prevElementSibling: Element;
  parent: HTMLElement;
}

type Primitive = string | boolean | number | undefined | null;

type NonPrimitive = EmptyObject | Array<any>;

/**
 * Returns a tuple of the initial value and a setter function to update the values.
 *
 * @param initialValue initial value to be tracked: can be an object or an array.
 * @param config this object is optional, it requires an equals property of type 'boolean'. If equals is 'true', it will skip comparing the two objects for sameness else it will check for sameness before updating the signal
 */
export function callSignal<S extends Primitive>(
  initialValue: S,
  config?: {
    equals: boolean;
  }
): [Signal<S>, SetSignalDispatcher<S>];

/**
 * Returns a tuple of the initial value and a setter function to update the values.
 *
 * @param initialValue initial value to be tracked: can be an object or an array.
 * @param config this object is optional, it requires an equals property of type 'boolean'. If equals is 'true', it will skip comparing the two objects for sameness else it will check for sameness before updating the store
 */
export function callStore<O extends NonPrimitive>(
  initialValue: O,
  config?: {
    equals: boolean;
  }
): [Store<O>, SetStoreDispatcher<O>];

export const signal: typeof callSignal;

export const store: typeof callStore;

export function splitProps<T extends EmptyObject<any>, K extends keyof T>(obj: T, ...props: K[]): {
  [index in K]: T[K]
}

export function getValueType<T>(value: T): T[] | undefined;

export function getSignalValue<S extends Primitive>(value: Signal<S>): S;

type Deps = (Signal<Primitive> | Store<NonPrimitive>)[];

/**
 * Creates a read-only signal or store which depends on other signals or stores.
 *
 * @param fn callback function to return the initialValue
 * @param deps array of signals or stores to which when changed re-runs and updates the memo's value;
 * 
 */
export function memo<S extends Primitive>(
  fn: () => S,
  deps: Deps
): MemoSignal<S>;
export function memo<S extends NonPrimitive>(
  fn: () => S,
  deps: Deps
): MemoStore<S>;

/**
 * Creates a memoized concatenated string from a template string literal containing a signal(s);
 * 
 * @example
 * ```jsx
 * import { concat, signal } from 'nixix/primitives';
 * const [display, setDisplay] = signal<'flex' | 'hidden'>('flex');
 * const View = () => <div className={concat`${display} flex-col`} >I am a DIV</div>
 * ```
 */
export function concat(...templ: Array<Primitive | Signal<Primitive> | TemplateStringsArray>): MemoSignal<string>;

/**
 * Places the callback function to be passed to it in aa stack, so signal values acessed within the callback can subscribe the callback to themselves.
 * 
 * @example 
 * ```jsx
 * import { effect, signal } from 'nixix/primitves';
 * 
 * const [count, setCount] = signal(0);
 * effect(() => {
 *  console.log(count.value)
 * })
 * ```
 */
export function effect(
  callbackFn: CallableFunction,
): void;

export const callEffect: typeof effect

/**
 * Takes a callback function and a dependency array. Containing signals or stores to subscribe to. The callback will be called only when te signal changes;
 * 
 * @example 
 * ```jsx
 * import { callReaction, signal } from 'nixix/primitives';
 * 
 * const [count, setCount] = signal(0);
 * callReaction(() => {
 *  console.log(count.value)
 * }, [count])
 * ```
 */
export function callReaction(callbackFn: CallableFunction, deps: Deps): void;

export const reaction: typeof callReaction

export function renderEffect(
  callbackFn: CallableFunction,
): void;

export function removeSignal(
  signals: Array<Store<any> | Signal<any>> | Store<any> | Signal<any>
): void;

export function removeEffect(fn: CallableFunction, signal: Deps[number]): void;

/**
 * @example
 * ```jsx
 * This function is used to get a reference to a dom element. To get the element you want to manipulate, add the 'bind:ref' prop with it's value as the ref variable. 
 * import { callRef } from 'nixix';
 * 
 * function App() {
    const div = callRef()
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
