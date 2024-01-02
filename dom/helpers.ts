import { isNull } from "../primitives/helpers";
import { Signal } from "../primitives/classes";
import { callEffect, removeEffect } from "../primitives/index";

export function checkDataType(value: any) {
  return (
    typeof value === "string" ||
    typeof value === "boolean" ||
    typeof value === "number"
  );
}

export function createText(string: string) {
  return document.createTextNode(String(string));
}

export function createFragment(children?: any) {
  const fragment = document.createDocumentFragment();
  if (children) addChildren(children, fragment);
  return fragment;
}

export function isArray(object: any): any[] {
  object instanceof Array ? null : (object = [object]);
  return object;
}

function addText(element: HTMLElement | SVGElement | DocumentFragment) {
  const text = createText("");
  element?.append?.(text);
  return text;
}

export function flatten(arr: Array<any>) {
  if (Array.isArray(arr)) return arr.flat?.(Infinity);
  else return [arr];
}

export function fillInChildren(
  element: HTMLElement | SVGElement | DocumentFragment
) {
  return (child: ChildrenType[number]) => {
    if (typeof child === "object") {
      // signal check
      if ((child as unknown as Signal).$$__reactive) {
        const text = addText(element);
        // @ts-expect-error
        function textEff() {
          text.textContent = getSignalValue(child as any) as any
        }
        text.addEventListener('remove:node', function removeRxn(e) {
          // remove the effect;
          removeEffect(textEff, child as any)
          e.currentTarget?.removeEventListener?.('remove:node', removeRxn)
        })
        callEffect(textEff, [child as any]);
      } else {
        element?.append?.(child as unknown as string);
      }
    } else if (checkDataType(child)) {
      element?.append?.(createText(child as any));
    } 
  };
}

/**
 * create('div', null, "name", create('p', null), create(App, {name: 'Ozor'}))
 * if the child is a string, append a textNode, else if it is an array, append all of it, else if it is an object, the append it
 */
export function addChildren(
  children: ChildrenType,
  element: HTMLElement | SVGElement | DocumentFragment
) {
  if (children instanceof Array) {
    children = flatten(children);
    children.forEach(fillInChildren(element));
  } else fillInChildren(element)(children);
}

const refHash: {
  count: number;
  refs: MutableRefObject[];
} = {
  count: 0,
  refs: [],
};

export function handleDirectives_(
  bindtype: string,
  directiveValue: {} & MutableRefObject,
  element: Element
) {
  if (bindtype === "ref") {
    if (directiveValue instanceof Signal)
      throw new Error(
        `The bind:ref directive's value cannot be reactive, it must be a MutableRefObject.`
      );

    let refObject: MutableRefObject;

    refObject = directiveValue;
    refObject["current"] = element;
    refHash.refs.push(refObject);
    if (refHash.count === 0) {
      window.addEventListener("DOMContentLoaded", () => {
        refHash.refs.forEach((refh) => {
          parseRef(refh);
        });
      });
      ++refHash.count;
    }
  }
}

export function parseRef(refObject: MutableRefObject) {
  const current = refObject.current;
  refObject.nextElementSibling = current.nextElementSibling;
  refObject.parent = current.parentElement;
  refObject.prevElementSibling = current.previousElementSibling;
}

export function getSignalValue(signal: Signal) {
  const value = signal.value
  return isNull(value) ? '' : value;
}

export function raise(message: string) {
  throw `${message}`;
}

export function warn(message: string) {
  console.warn(message);
}
