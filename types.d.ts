import Nixix from 'nixix-types';

declare global {
  type target =
    | keyof HTMLElementTagNameMap
    | ((props?: {} | null) => Element)
    | 'fragment';
  type Proptype = { children?: any; [index: string]: any } | null | undefined;
  type ChildrenType = Array<Element | string | Nixix.Signal>;

  interface Dependents {
    element: Element;
    typeOf:
      | 'AriaProp'
      | 'className'
      | 'regularAttribute'
      | 'styleProp'
      | 'DOMProp'
      | 'childTextNode'
      | 'strokeProp';
    property: any;
    accessor?: string;
  }

  interface Window {
    $$__NixixStore?: {
      $$__lastReactionProvider?: 'signal' | 'store';
      $$__routeStore?: {
        [path: any]: string | Node | (string | Node)[];
      };
      $$__routeProvider?: Element;
      $$__commonRouteProvider?: HTMLSpanElement;
      Store?: {
        [index: string]: {
          value: any;
          dependents: Dependents[];
          effect?: CallableFunction;
        };
      };
      SignalStore?: {
        [index: string]: {
          value: any;
          dependents: Dependents[];
          effect?: CallableFunction;
        };
      };
      storeCount?: number;
      diffStore?: (id: number) => Promise<void>;
      signalCount?: number;
      diffSignal?: (id: number) => Promise<void>;

      refCount?: number;
    };
  }

  type SignalObject<S extends any> = { value: S; $$__id: number };

  interface StoreObject {
    $$__id: string | number;
    $$__value?: any;
    $$__name?: string;
  }

  type SetSignalDispatcher<S> = (newValue: S) => void;
  type SetStoreDispatcher<S> = (newValue: S | (() => S)) => void;

  interface SuspenseProps {
    fallback: string | Element | Nixix.Signal;
    children?: Promise<any>[];
    onError?: string | Element | Nixix.Signal;
  }

  var window: Window & typeof globalThis;

  interface Current extends Element {}

  interface MutableRefObject {
    current: Current & object;
    refId: number;
    nextElementSibling: Element['nextElementSibling'] | null;
    prevElementSibling: Element['previousElementSibling'] | null;
    parent: Element['parentElement'] | null;
  }

  interface NixixNode extends Node, String, JSX.Element {}
}
