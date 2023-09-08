import Nixix from './types';
import {
  StoreObject as NixixStoreObject,
  Signal,
  Store,
} from './primitives/types';

// These global types are used for the development of this project.
declare global {
  type NixixElementType = HTMLElement | SVGElement;

  type target =
    | keyof HTMLElementTagNameMap
    | keyof SVGElementTagNameMap
    | ((props?: {} | null) => Element)
    | 'fragment';
  type Proptype = { children?: any; [index: string]: any } | null | undefined;
  type ChildrenType = Array<Element | string | Nixix.Signal>;

  type ValueType = Signal | Store | string;

  type StyleValueType = { [key: string]: ValueType };

  type DynamicAttrType = {
    element: HTMLElement | SVGElement;
    attrPrefix: string;
    attrName: string;
    attrValue: ValueType;
  };

  type TypeOf =
    | 'propertyAttribute'
    | 'regularAttribute'
    | 'styleProp'
    | 'childTextNode';

  interface WindowStoreObject {
    value: any;
    effect?: CallableFunction[];
    cleanup?: () => void;
  }
  interface Window {
    $$__NixixStore?: {
      $$__lastReactionProvider?: 'signal' | 'store';
      $$__routeStore?: {
        [path: any]: string | Node | (string | Node)[];
        errorPage?: {
          errorRoute: string;
        };
        common?: boolean;
      };
      $$__routeProvider?: Element;
      $$__commonRouteProvider?: HTMLSpanElement;
      Store?: {
        [index: string]: WindowStoreObject;
      };
      SignalStore?: {
        [index: string]: {
          value: any;
          effect?: CallableFunction[];
        };
      };
      storeCount?: number;
      diffStore?: (id: number) => void;
      signalCount?: number;
      diffSignal?: (id: number) => void;
      $$__For?: {
        [id: string]: string[] | Element[] | JSX.Element[];
      };

      refCount?: number;
    };
  }

  type SignalObject<S extends any> = { value: S; $$__id?: number };

  interface StoreObject {
    $$__id: string | number;
    $$__value?: any;
    $$__name?: string;
  }

  type SetSignalDispatcher<S> = (newValue: S | ((prev?: S) => S)) => void;
  type SetStoreDispatcher<S> = (newValue: S | (() => S)) => void;

  interface SuspenseProps {
    fallback: string | Element | Signal;
    children?: Promise<any>[];
    onError?: string | Element | Signal;
  }

  interface ForProps {
    fallback: string | Element | Signal;
    children?: ((value: any, index?: number) => JSX.Element)[];
    parent?: JSX.Element | HTMLElement;
    each: NixixStoreObject<any[]>;
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
