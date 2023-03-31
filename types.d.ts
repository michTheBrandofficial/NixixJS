
declare namespace Root {
  interface Dependents {
    element: Element, 
    typeOf: 'AriaProp' | 'className' | 'regularAttribute' | 'styleProp' | 'DOMProp' | 'childTextNode',
    property: any,
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

export type SignalObject<S> = { $$__value: S, $$__id: number, [index: string]: any };

interface Current extends Element{}

export interface MutableRefObject{
  current: Current & object;
  refId: number;
  nextElementSibling: Element['nextElementSibling'] | null;
  prevElementSibling: Element['previousElementSibling'] | null;
  parent: Element['parentElement'] | null;

};

export interface NixixNode extends Node, String, JSX.Element {

}

export {
  Root, 
  SignalRoot
}