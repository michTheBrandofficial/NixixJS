import {
  Signal,
  Store,
} from './primitives/classes';

// These global types are used for the development of this project.
declare global {
  type NixixElementType = HTMLElement | SVGElement;

  type target =
    | keyof HTMLElementTagNameMap
    | keyof SVGElementTagNameMap
    | ((props?: {} | null) => Element)
    | 'fragment';
  type Proptype = { children?: any; [index: string]: any } | null | undefined;

  type ChildrenType = Array<Element | string | Signal>;

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

  interface Window {
    $$__NixixStore?: {
      commentForLF: boolean;
      $$__routeStore?: {
        errorPage?: {
          errorRoute: string;
        };
        [path: string]: any;
      };
    };
  }

  var window: Window & typeof globalThis;

  interface Current extends Element {}

  interface MutableRefObject {
    current: Current & object;
    nextElementSibling: Element['nextElementSibling'] | null;
    prevElementSibling: Element['previousElementSibling'] | null;
    parent: Element['parentElement'] | null;
  }


  interface SuspenseProps {
    fallback: any;
    children?: Promise<any>[];
    onError?: string | Element | Signal;
  }

  interface ForProps {
    fallback: any;
    children?: ((value: any, index?: number) => JSX.Element)[];
    each: any[]
  }

  interface ShowProps {
    when: () => boolean;
    children: any;
    fallback: any;
    switch: Signal
  }

  // @ts-ignore
  interface NixixNode extends Node, String, JSX.Element {}
}
