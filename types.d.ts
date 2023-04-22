
declare namespace Root {
  interface Dependents {
    element: Element, 
    typeOf: 'AriaProp' | 'className' | 'regularAttribute' | 'styleProp' | 'DOMProp' | 'childTextNode' | 'strokeProp',
    property: any,
    accessor?: string;
    oldCallback?: EventListenerObject
  }
  interface Window {
    SignalStore: {
      [index: string]: {
        value: any, dependents: Dependents[]
      }
    },
    signalCount: number
  }
  interface CSSStyleDeclaration {
    [index: string]: any
  }
  var window: Window; 
}

declare namespace SignalRoot {
  interface Window  {
    SignalStore: {
      [index: string]: {
        value: any
      }
    },
    signalCount: number
  }
  var window: Window & typeof globalThis;
}

export type target = keyof HTMLElementTagNameMap | ((props?: {} | null) => Element) | 'fragment';

export type SetSignalDispatcher<S> = (arg: S) => void;

export type SignalObject<S> = { value: S, $$__id: number };

interface Current extends Element{}

export interface MutableRefObject{
  current: (Current & object) ;
  refId: number;
  nextElementSibling: Element['nextElementSibling'] | null;
  prevElementSibling: Element['previousElementSibling'] | null;
  parent: Element['parentElement'] | null;

};

export interface NixixNode extends Node, String, JSX.Element {
}

export interface StoreClass {
  '$$__id': string | number;
  '$$__value'?: any;
  '$$__name'?: string
}

export {
  Root, 
  SignalRoot,
}