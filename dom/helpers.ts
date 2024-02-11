import { Signal, Store } from "../primitives/classes";
import { isReactive } from "../primitives/helpers";
import { effect } from "../primitives/index";
import { isFunction, nonNull, raise } from "../shared";
import { type RefFunction } from "./types";

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

export function raiseIfReactive(value: Signal | Store, prop: string) {
  isReactive(value) && raise(`The ${prop} prop value cannot be reactive.`);
}

export function fillInChildren(
  element: HTMLElement | SVGElement | DocumentFragment
) {
  return (child: ChildrenType[number]) => {
    if (typeof child === "object") {
      // signal check
      if ((child as Signal)?.$$__reactive) {
        const signal = child as Signal;
        const text = addText(element);
        // @ts-expect-error
        function textEff() {
          text.textContent = nonNull(signal.value, "");
        }
        text.addEventListener(
          "remove:node",
          () => signal.removeEffect(textEff),
          {
            once: true,
          }
        );
        effect(textEff);
      } else element?.append?.(child as unknown as string);
    } else if (checkDataType(child))
      element?.append?.(createText(child as any));
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

const bindDirectiveMap = {
  ref: (
    value: MutableRefObject | RefFunction<any>,
    element: NixixElementType
  ) => {
    if (isReactive(value))
      raise(
        `The bind:ref directive's value cannot be reactive, it must be a MutableRefObject.`
      );
    if (isFunction(value))
      return (value as RefFunction<any>)({ current: element });
    else {
      const ref = value as MutableRefObject;
      ref["current"] = element;
      queueMicrotask(() => parseRef(ref));
      return;
    }
  },
  value: (value: Signal, element: HTMLInputElement | HTMLSelectElement) => {
    if (!isReactive(value))
      raise(`The bind:value directive's value must be a signal.`);
    effect(() => {
      element.value = value.value as any;
    });
    element.addEventListener("input", ({ currentTarget }) => {
      value.value = (currentTarget as any)?.value;
    });
  },
};

export const directiveMap = {
  "bind:": bindDirectiveMap,
  "animate:": {
    in: (value: object, element: NixixElementType) => undefined,
  },
} as const;

type DirectiveMap = typeof directiveMap;

type KeyOfAllDirectives =
  | keyof DirectiveMap["animate:"]
  | keyof DirectiveMap["bind:"];

export function handleDirectives_(
  prefix: keyof DirectiveMap,
  suffix: KeyOfAllDirectives,
  directiveValue: any,
  element: NixixElementType
) {
  // @ts-expect-error
  directiveMap[prefix]?.[suffix]?.(directiveValue, element);
}

export function parseRef(refObject: MutableRefObject) {
  const current = refObject?.current;
  refObject.nextElementSibling = current?.nextElementSibling;
  refObject.parent = current?.parentElement;
  refObject.prevElementSibling = current?.previousElementSibling;
}
