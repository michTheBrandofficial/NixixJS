import { callEffect } from "../primitives/index";
import { Signal, Store } from "../primitives/classes";
import {
  raise,
  addChildren,
  handleDirectives_,
  warn,
  getSignalValue,
  checkDataType,
} from "./helpers";
import { PROP_ALIASES, SVG_ELEMENTTAGS, SVG_NAMESPACE } from "./utilVars";
import { isFunction } from "primitives/helpers";

type GlobalStore = {
  $$__lastReactionProvider?: "signal" | "store";
  commentForLF: boolean;
  viewTransitions?: boolean;
  $$__routeStore?: {
    errorPage?: {
      errorRoute: string;
    };
    [path: string]: string | Node | (string | Node)[] | any;
  };
  root?: Element;
  Store?: {
    [index: string]: WindowStoreObject;
  };
  SignalStore?: {
    [index: string]: {
      value: any;
      effect?: CallableFunction[];
    };
  };
  jsx?: boolean;
  storeCount?: number;
  signalCount?: number;
  refCount?: number;
};

// Global store for the store class and signals.
window["$$__NixixStore"] = {
  commentForLF: false,
  jsx: false,
} as GlobalStore;
export const nixixStore = window.$$__NixixStore as GlobalStore;

const Nixix = {
  create: function (
    tagNameFC: target,
    props: Proptype,
    ...children: ChildrenType
  ): Element | Array<Element | string | Signal> | undefined {
    !nixixStore.jsx &&
      ((nixixStore.jsx = true), callEffect(() => (nixixStore.jsx = false)));
    let returnedElement: any = null;
    if (typeof tagNameFC === "string") {
      if (tagNameFC === "fragment") {
        if (children !== null) returnedElement = children;
        else returnedElement = [];
      } else {
        const element = !SVG_ELEMENTTAGS.includes(tagNameFC)
          ? document.createElement(tagNameFC)
          : document.createElementNS(SVG_NAMESPACE, tagNameFC);
        setProps(props, element);
        setChildren(children, element);
        returnedElement = element;
      }
    } else returnedElement = buildComponent(tagNameFC, props, children);
    return returnedElement;
  },
  handleDirectives: handleDirectives_,
  handleDynamicAttrs: ({
    element,
    attrPrefix,
    attrName,
    attrValue,
  }: DynamicAttrType) => {
    const attrSuffix = attrName.slice(attrPrefix.length);
    const newAttrName = `${attrPrefix.replace(":", "-")}${attrSuffix}`;
    setAttribute(element, newAttrName, attrValue);
  },
};

function isNull(value: any) {
  return value === null || value === undefined;
}

function entries(obj: object) {
  return Object.entries(obj);
}

function isReactiveValue(value: Signal | Store, prop: string) {
  if (value instanceof Signal) {
    raise(`The ${prop} prop value cannot be reactive.`);
    return true;
  }
}

function setAttribute(
  element: NixixElementType,
  attrName: string,
  attrValue: ValueType,
  type?: TypeOf
) {
  if (isNull(attrValue))
    return warn(
      `The ${attrName} prop cannot be null or undefined. Skipping attribute parsing.`
    );
  if (attrValue instanceof Signal) {
    callEffect(() => {
      type === "propertyAttribute"
        ? // @ts-ignore
          (element[attrName] = getSignalValue(attrValue))
        : element.setAttribute(attrName, getSignalValue(attrValue));
    }, [attrValue]);
  } else if (checkDataType(attrValue)) {
    type === "propertyAttribute"
      ? // @ts-ignore
        (element[attrName] = attrValue)
      : element.setAttribute(attrName, attrValue as any);
  }
}

function setStyle(element: NixixElementType, styleValue: StyleValueType) {
  if (isNull(styleValue))
    return warn(
      `The style prop cannot be null or undefined. Skipping attribute parsing.`
    );
  const cssStyleProperties = entries(styleValue) as [string, ValueType][];
  for (let [property, value] of cssStyleProperties) {
    // typed as display to remove the ts error
    let styleKey = property as "display";
    if (isNull(value)) {
      warn(
        `The ${styleKey} CSS property cannot be null or undefined. Skipping CSS property parsing.`
      );
      continue;
    }

    if (value instanceof Signal) {
      callEffect(() => {
        element["style"][styleKey] = getSignalValue(value as Signal);
      }, [value]);
    } else {
      element["style"][styleKey] = value as string;
    }
  }
}

function setProps(props: Proptype | null, element: NixixElementType) {
  if (props) {
    props = Object.entries(props);
    for (const [k, v] of props as [string, StyleValueType | ValueType][]) {
      if (k in PROP_ALIASES) {
        const mayBeClass = PROP_ALIASES[k]["$"];
        setAttribute(
          element,
          mayBeClass === "className" ? "class" : mayBeClass,
          v as ValueType,
          mayBeClass === "className" ? "regularAttribute" : "propertyAttribute"
        );
      } else if (k === "style") {
        setStyle(element, v as unknown as StyleValueType);
      } else if (k.startsWith("on:")) {
        if (isNull(v))
          return warn(
            `The ${k} prop cannot be null or undefined. Skipping prop parsing`
          );
        isReactiveValue(v as any, k);
        const domAttribute = k.slice(3);
        element.addEventListener(domAttribute, v as any);
      } else if (k.startsWith("aria:")) {
        Nixix.handleDynamicAttrs({
          element,
          attrPrefix: "aria:",
          attrName: k,
          attrValue: v as ValueType,
        });
      } else if (k.startsWith("stroke:")) {
        Nixix.handleDynamicAttrs({
          element,
          attrPrefix: "stroke:",
          attrName: k,
          attrValue: v as ValueType,
        });
      } else if (k.startsWith("bind:")) {
        if (isNull(v))
          return raise(
            `The ${k} directive value cannot be null or undefined. Skipping directive parsing`
          );
        isReactiveValue(v as any, k);
        Nixix.handleDirectives(
          k.slice(5),
          v as unknown as MutableRefObject,
          element
        );
      } else {
        setAttribute(element, k, v as ValueType);
      }
    }
  }
}

function setChildren(children: ChildrenType | null, element: NixixElementType) {
  if (children != undefined || children != null) {
    addChildren(children, element);
  }
}

function buildComponent(
  tagNameFC: target,
  props: Proptype,
  children: ChildrenType
) {
  let returnedElement: any = null;
  if (isFunction(tagNameFC)) {
    const artificialProps = props || {};
    Boolean(children?.length) && (artificialProps.children = children);
    returnedElement = (tagNameFC as Function)(artificialProps);
  }
  return returnedElement;
}

function render(
  fn: () => NixixNode | NixixNode,
  root: HTMLElement,
  config: {
    commentForLF: boolean;
  } = { commentForLF: true }
) {
  let bool = isFunction(fn);
  if (!bool)
    warn(
      `You may not get top level reacitivity. Wrap your jsx element in a function like so: () => <View />`
    );
  nixixStore.commentForLF = config.commentForLF;
  addChildren((bool ? fn() : fn) as any, root);
  doBGWork(() => (nixixStore["root"] = root));
}

async function doBGWork(fn: CallableFunction) {
  await Promise.resolve();
  fn();
}

function turnOnJsx() {
  nixixStore.jsx = true;
}

export default Nixix;
export { render, setAttribute, turnOnJsx };
