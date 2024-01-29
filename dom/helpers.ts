import { Signal, Store } from "../primitives/classes";
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

export function getSignalValue(signal: Signal) {
  if (signal.$$__reactive) {
    const value = signal.value;
    return value;
  } else return signal as any;
}

export function raise(message: string) {
  throw `${message}`;
}

export function warn(message: string) {
  console.warn(message);
}

export function isNull(value: any) {
  return value === null || value === undefined;
}

export function entries(obj: object) {
  return Object.entries(obj);
}

export function isReactiveValue(value: Signal | Store, prop: string) {
  if (value.$$__reactive) {
    raise(`The ${prop} prop value cannot be reactive.`);
  }
}

export function fillInChildren(
  element: HTMLElement | SVGElement | DocumentFragment
) {
  return (child: ChildrenType[number]) => {
    if (typeof child === "object") {
      // signal check
      if ((child as Signal).$$__reactive) {
        const text = addText(element);
        // @ts-expect-error
        function textEff() {
          text.textContent = getSignalValue(child as any) as any;
        }
        text.addEventListener("remove:node", function removeRxn(e) {
          // remove the effect;
          removeEffect(textEff, child as any);
          e.currentTarget?.removeEventListener?.("remove:node", removeRxn);
        });
        callEffect(textEff, [child as any]);
      } else element?.append?.(child as unknown as string);
    } else if (checkDataType(child)) element?.append?.(createText(child as any));
  };
}

export function addChildren(
  children: ChildrenType,
  element: HTMLElement | SVGElement | DocumentFragment
) {
  if (children instanceof Array) {
    children = flatten(children);
    children.forEach(fillInChildren(element));
  } else fillInChildren(element)(children);
}

export const directiveMap = {
  ref: (value: MutableRefObject, element: NixixElementType) => {
    if ((value as unknown as Signal).$$__reactive)
      raise(
        `The bind:ref directive's value cannot be reactive, it must be a MutableRefObject.`
      );
    value["current"] = element;
    (async () => {
      await Promise.resolve()
      parseRef(value)
    })()
  }
} as const;

export function handleDirectives_(
  bindtype: string,
  directiveValue: {} & MutableRefObject,
  element: NixixElementType
) {
  directiveMap?.[bindtype as keyof typeof directiveMap]?.(directiveValue, element);
}

export function parseRef(refObject: MutableRefObject) {
  const current = refObject?.current;
  refObject.nextElementSibling = current?.nextElementSibling;
  refObject.parent = current?.parentElement;
  refObject.prevElementSibling = current?.previousElementSibling;
}
