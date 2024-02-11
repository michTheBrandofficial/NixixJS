import { isNull, nonNull, raise, warn } from "../shared";
import { Signal } from "../primitives/classes";
import { entries } from "../primitives/helpers";
import { isFunction } from "../shared";
import { effect } from "../primitives/index";
import Component from "./Component";
import {
  addChildren,
  handleDirectives_,
  raiseIfReactive,
} from "./helpers";
import { PROP_ALIASES, SVG_ELEMENTTAGS, SVG_NAMESPACE } from "./utilVars";

type GlobalStore = {
  commentForLF: boolean;
  viewTransitions?: boolean;
  $$__routeStore?: {
    errorPage?: {
      errorRoute: string;
    };
    [path: string]: string | Node | (string | Node)[] | any;
  };
  root?: Element;
  /**
   * this prop is for stores to be patched efficiiently
   */
  reactiveScope: boolean;
};

export const nixixStore = {
  commentForLF: false,
  reactiveScope: true,
} as GlobalStore;

function removeNode(node: Element | Text) {
  const isConnected = node?.isConnected;
  if (isConnected) node?.remove?.();
  node?.dispatchEvent?.(new Event("remove:node"));
  node?.childNodes?.forEach?.((child) => removeNode(child as any));
  return isConnected;
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
  if ((attrValue as Signal).$$__reactive) {
    const signal = attrValue as Signal;
    // @ts-expect-error
    function propEff() {
      setProp(element, attrName, type!, signal.value)
    }
    element.addEventListener(
      "remove:node",
      () => signal.removeEffect(propEff),
      {
        once: true,
      }
    );
    effect(propEff);
  } else setProp(element, attrName, type!, attrValue)
}

function setStyle(element: NixixElementType, styleValue: StyleValueType) {
  if (isNull(styleValue))
    return warn(
      `The style prop cannot be null or undefined. Skipping attribute parsing.`
    );

  const cssStyleProperties = entries(styleValue) as [string, ValueType][];
  for (let [property, value] of cssStyleProperties) {
    let styleKey = property as "display";
    value ??
      warn(
        `The ${styleKey} CSS property cannot be null or undefined. Skipping CSS property parsing.`
      );

    if ((value as Signal).$$__reactive) {
      const signal = value as Signal;
      // @ts-expect-error
      function styleEff() {
        element["style"][styleKey] = nonNull(signal.value, '');
      }
      element.addEventListener(
        "remove:node",
        () => signal.removeEffect(styleEff),
        {
          once: true,
        }
      );
      effect(styleEff);
    } else element["style"][styleKey] = nonNull(value, '');
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
        raiseIfReactive(v as any, k);
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
        raiseIfReactive(v as any, k);
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

function setProp(element: NixixElementType, attrName: any, type: TypeOf, value: any) {
  switch (type === 'propertyAttribute') {
    case true:
      // @ts-expect-error
      return element[attrName] = nonNull(value, '')
    case false:
      return element.setAttribute(attrName, `${nonNull(value, '')}`);
  }
}

function setChildren(children: ChildrenType | null, element: NixixElementType) {
  if (children) return addChildren(children, element);
}

function buildComponent(
  tagNameFC: target,
  props: Proptype,
  children: ChildrenType
) {
  let returnedElement: any = '';
  if (isFunction(tagNameFC)) {
    const artificialProps = props || {};
    Boolean(children?.length) && (artificialProps.children = children);
    if (Object.getPrototypeOf(tagNameFC) === Component) {
      const componentObject = new (tagNameFC as any)(
        artificialProps
      ) as Component;
      if (Object.getPrototypeOf(componentObject).jsx)
        returnedElement = (componentObject as any).jsx(artificialProps);
      else {
        raise(
          `Specify a ` +
            "`jsx` method in your " +
            `<${(tagNameFC as any).name}> Class Component`
        );
      }
    } else {
      try {
        returnedElement = (tagNameFC as Function)(artificialProps);
      } catch (error) {
        throw new Error(error as any);
      }
    }
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
  nixixStore["root"] = root;
}

const Nixix = {
  create: function (
    tagNameFC: target,
    props: Proptype,
    ...children: ChildrenType
  ): Element | Array<Element | string | Signal> | undefined {
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

const create = Nixix.create;

export default Nixix;
export { Component, buildComponent, create, removeNode, render, setAttribute };
