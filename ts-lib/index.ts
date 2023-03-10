import { CSSStyleDeclarations } from 'nixix/css'; 
import { diffSignal_, handleDirectives_, errorFunc, parseSignal } from './asyncParsers';
const Fragment: 'fragment' = 'fragment';

declare global {
  interface Dependents {
    element: Element | HTMLElement;
    property: any;
    typeOf: 'childTextNode' | 'AriaProp' | 'className' | 'regularAttribute' | 'styleProp' | 'DOMProp';
    /**
     * oldCallback for changing the oldCallback registered on DOM attributes 
     */
    oldCallback?: EventListenerObject
  }
  interface CSSStyleDeclaration {
    [index: string]: string;
  }
  interface Window {
    'Ref': {
      [index: string]: any;
    },
    'SignalStore': {
      [index: string]: {
        value: any, 
        dependents: Dependents[]
      }
    }
    'diffSignal': (id: number) => void;
    [index: string]: any;
  }
  interface Element {
    [index: string]: any;
  }
}


type target = keyof HTMLElementTagNameMap | ((props?: {} | null) => Element) | 'fragment';

type SetSignalDispatcher<S> = (arg: S) => void;
type SignalObject<S> = { $$__value: S, $$__id: number, [index: string]: any };

export interface MutableRefObject {

  current: Element | {};
  refId: number;
  nextElementSibling: Element['nextElementSibling'] | null;
  prevElementSibling: Element['previousElementSibling'] | null;
  parent: Element['parentElement'] | null;

};

export class Signal {
  '$$__value': any;
  '$$__id': number
  constructor(value: any, id: number) {  
    this['$$__value'] = value;
    this['$$__id'] = id;
  }
}

/**
 * @version nixix@1.0.3
 * @param tagNameFC tagNameFC: property of the element to create e.g 'div', 'a', 'main' or a function component.
 * @param props object of properties of the element to create which can be dom attributes or html attributes or undefined
 * @param children an arrray of children which can be dom nodes or strings: textContent property
 * @returns  a real dom node
 */
const Nixix = {
  create: 
  function (tagNameFC: target, props: {} | null | undefined, ...children: (Element | string | Signal)[] | null | undefined): 
  Element | (Element | string | Signal)[] {

    if (typeof tagNameFC === 'string') {
      // if tagname is a string
      if (tagNameFC === 'fragment') {
        if (children != null) return children
      } else {
        const element = document.createElement(tagNameFC);
        // set the prop name-value pairs as (html | dom)attributes
        if ((props != null) || (props != undefined)) {

          for (const [k, v] of Object.entries(props)) {
            
            // check if it has a signal object
            if (k === 'className') {
              if (v instanceof Signal) {
                element.setAttribute('class', v.$$__value)
                parseSignal(v.$$__id, element, 'class', 'className');
              } else {
                element.setAttribute('class', v as string);
              }
            } else if (k === 'style') {
              const styles: Array<[string, string | SignalObject<string>]> = Object.entries(v as CSSStyleDeclarations);
              for (let [propname, value] of styles) {
                if (value instanceof Signal) {
                  element['style'][propname] = value.$$__value;
                  parseSignal(value.$$__id, element, propname, 'styleProp');
                } else {
                  element['style'][propname] = value as string;
                }
              }
            } else if (k.startsWith('on:')) {
              const domAttribute = k.slice(3);

              if (v instanceof Signal) {
                if (typeof v.$$__value != 'function') {
                  errorFunc('DOM attributes stateful values must be callback functions');
                }
                element.addEventListener(domAttribute, v.$$__value);
                parseSignal(v.$$__id, element, domAttribute, 'DOMProp', v.$$__value);
              } else {
                element.addEventListener(domAttribute, v as EventListenerObject)
              }
            } else if (k.startsWith('aria:')) {
              const attr = k.slice(5);
              if (v instanceof Signal) {
                element.setAttribute(`aria-${attr}`, v.$$__value);
                parseSignal(v.$$__id, element, attr, 'AriaProp')
              } else {
                element.setAttribute(`aria-${attr}`, v as string);
              }
            } else if (k.startsWith('bind:')) {
              Nixix.handleDirectives(k.slice(5), v, element);
            } else {
              if (v instanceof Signal) {
                element.setAttribute(k, v.$$__value);
                parseSignal(v.$$__id, element, k, 'regularAttribute')
              } else {
                element.setAttribute(k, v as string);
              }
            }

          };
        }
        // comeback for children
        if ((children != undefined) || (children != null)) {
          children.forEach((child, index): void => {

            if (typeof child === 'string' || typeof child === 'number') {
              element.append(document.createTextNode(child))
            } else if (Array.isArray(child)) {
              for (const fragChild of child as Array<Node | string>) {
                if (typeof fragChild === 'object') {
                  if (fragChild as unknown as Signal instanceof Signal) {
                    element.append(document.createTextNode((fragChild as unknown as Signal).$$__value));
                    parseSignal((fragChild as unknown as Signal).$$__id, element, index, 'childTextNode');
                  } else {
                    element.append(child as Element);
                  }
                } else {
                  element.append(document.createTextNode(fragChild));
                }
              }
            } else if (typeof child === 'object') {
              if (child as unknown as Signal instanceof Signal) {
                element.append(document.createTextNode((child as unknown as Signal).$$__value));
                parseSignal((child as unknown as Signal).$$__id, element, index, 'childTextNode');
              } else {
                element.append(child as Element);
              }
            }
          })
        }

        return element;
      }
    } else if (typeof tagNameFC === 'function') {
        // if tagname is a Function Component
      if ((props != null) && (props != undefined)) {
        // destruct the object as arguments to the function
        return tagNameFC(props);
      } else {
        return tagNameFC();
      }
    }

  },
  handleDirectives: handleDirectives_
};

// render function
function render(element: HTMLElement, root: HTMLElement): void {
  if (!Array.isArray(element)) {
    root.append(element);
  } else {
    root.append(...element);
  }
}

// hooks
function callRef<R extends Element | HTMLElement = null>(ref: R): MutableRefObject {
  if (window['refCount'] === undefined) {
    window['refCount'] = 0;
  } else if (window['refCount'] != undefined) {
    window['refCount']  = window['refCount'] as number  + 1;
  }
  return { 
    current: {}, 
    refId: window['refCount'] as number,
    nextElementSibling: ref,
    prevElementSibling: ref,
    parent: ref as HTMLElement
  };
}

/**
 * @experimental
 * works with strings and numbers now
 */
function callSignal<S>(initialValue: S): [SignalObject<S>, SetSignalDispatcher<S>] {
  if (window.signalCount === undefined) {
    window.signalCount = 0;
  } else {
    window.signalCount  = window.signalCount + 1;
  }
  const signalId = window.signalCount;
  if (window.SignalStore === undefined) {
    window.SignalStore = {};
    window.diffSignal = diffSignal_
  }
  let value = typeof initialValue === 'function' ? initialValue() : initialValue;
  (typeof value === 'object' || value instanceof Array ) ? errorFunc(`The callState hook's arguments can not be an object or an array.`, 'callState.caller.name') : 'none';

  window.SignalStore[`_${signalId}_`] = {value: value, dependents: []}
  let initValue = new Signal(value, signalId);
  return [
    initValue,
    (newState?: S, id = signalId as number, mutableSignalObject = initValue) => { 

      if (newState) {
        mutableSignalObject.$$__value = newState;
        window.SignalStore[`_${id}_`].value = newState;
        window.diffSignal(id);
      }

    }
  ];

}


export default Nixix;
export {
  Fragment,
  render,
  callSignal,
  callRef,
}
  