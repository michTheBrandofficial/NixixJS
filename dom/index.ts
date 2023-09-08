import { Signal, Store } from '../primitives/classes';
import {
  parseSignal,
  parseStore,
  raise,
  addChildren,
  handleDirectives_,
  warn,
} from './helpers';
import { PROP_ALIASES, SVG_ELEMENTTAGS, SVG_NAMESPACE } from './utilVars';

// Global store for the store class and signals.
window['$$__NixixStore'] = {};
export const nixixStore = window.$$__NixixStore;

const Nixix = {
  create: function (
    tagNameFC: target,
    props: Proptype,
    ...children: ChildrenType
  ): Element | Array<Element | string | Signal> | undefined {
    if (typeof tagNameFC === 'string') {
      if (tagNameFC === 'fragment') {
        if (children !== null) return children;
        return [];
      } else {
        const element = !SVG_ELEMENTTAGS.includes(tagNameFC)
          ? document.createElement(tagNameFC)
          : document.createElementNS(SVG_NAMESPACE, tagNameFC);
        setProps(props, element);
        setChildren(children, element);
        return element;
      }
    } else return buildComponent(tagNameFC, props, children);
  },
  handleDirectives: handleDirectives_,
  handleDynamicAttrs: ({
    element,
    attrPrefix,
    attrName,
    attrValue,
    type,
  }: DynamicAttrType) => {
    const attrSuffix = attrName.slice(attrPrefix.length);
    const newAttrName = `${attrPrefix.replace(':', '-')}${attrSuffix}`;
    setAttribute(element, newAttrName, attrValue, type);
  },
};

function checkDataType(value: any) {
  return (
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    typeof value === 'number'
  );
}

function isNull(value: any) {
  return value === null || value === undefined;
}

function entries(obj: object) {
  return Object.entries(obj);
}

function noReactiveValue(value: Signal | Store, prop: string) {
  if (value instanceof Signal || value instanceof Store) {
    raise(`The ${prop} prop value cannot be reactive.`);
  }
}

function setAttribute(
  element: NixixElementType,
  attrName: string,
  attrValue: ValueType,
  type?: Dependents['typeOf']
) {
  if (isNull(attrValue))
    return warn(
      `The ${attrName} prop cannot be null or undefined. Skipping attribute parsing.`
    );
  if (attrValue instanceof Signal) {
    type === 'propertyAttribute'
      ? (element[attrName] = attrValue.value)
      : element.setAttribute(attrName, attrValue.value);
    parseSignal(attrValue.$$__id, element, attrName, type);
  } else if (attrValue instanceof Store) {
    type === 'propertyAttribute'
      ? (element[attrName] = eval(
          `nixixStore.Store['${attrValue.$$__id}'].value${attrValue.$$__name}`
        ))
      : element.setAttribute(
          attrName,
          eval(
            `nixixStore.Store['${attrValue.$$__id}'].value${attrValue.$$__name}`
          )
        );
    parseStore(
      attrValue.$$__id as number,
      element,
      attrName,
      type,
      attrValue.$$__name
    );
  } else if (checkDataType(attrValue)) {
    type === 'propertyAttribute'
      ? (element[attrName] = attrValue)
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
    if (isNull(value)) {
      warn(
        `The ${property} CSS property cannot be null or undefined. Skipping CSS property parsing.`
      );
      continue;
    }

    if (value instanceof Signal) {
      element['style'][property] = value.value;
      parseSignal(value.$$__id, element, property, 'styleProp');
    } else if (value instanceof Store) {
      element['style'][property] = eval(
        `nixixStore.Store['${value.$$__id}'].value${value.$$__name}`
      );
      parseStore(
        value.$$__id as number,
        element,
        property,
        'styleProp',
        value.$$__name
      );
    } else {
      element['style'][property] = value;
    }
  }
}

function setProps(props: Proptype | null, element: NixixElementType) {
  if (props) {
    props = Object.entries(props);
    for (const [k, v] of props as [string, StyleValueType | ValueType][]) {
      if (k in PROP_ALIASES) {
        setAttribute(
          element,
          PROP_ALIASES[k]['$'],
          v as ValueType,
          'propertyAttribute'
        );
      } else if (k === 'style') {
        setStyle(element, v as unknown as StyleValueType);
      } else if (k.startsWith('on:')) {
        if (isNull(v))
          return warn(
            `The ${k} prop cannot be null or undefined. Skipping prop parsing`
          );
        const domAttribute = k.slice(3);
        noReactiveValue(v as any, k);
        element.addEventListener(domAttribute, v as any);
      } else if (k.startsWith('aria:')) {
        Nixix.handleDynamicAttrs({
          element,
          attrPrefix: 'aria:',
          attrName: k,
          attrValue: v as ValueType,
          type: 'AriaProp',
        });
      } else if (k.startsWith('stroke:')) {
        Nixix.handleDynamicAttrs({
          element,
          attrPrefix: 'stroke:',
          attrName: k,
          attrValue: v as ValueType,
          type: 'strokeProp',
        });
      } else if (k.startsWith('bind:')) {
        if (isNull(v))
          return warn(
            `The ${k} directive value cannot be null or undefined. Skipping directive parsing`
          );
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
  ...children: ChildrenType
) {
  if (typeof tagNameFC === 'function') {
    if (props != null && props != undefined) {
      if (children.length !== 0) {
        props.children = children;
        return tagNameFC(props);
      }
      return tagNameFC(props);
    } else if (children.length !== 0) {
      props = { children: children };
      return tagNameFC(props);
    }
    return tagNameFC();
  }
}

function render(element: NixixNode, root: HTMLElement) {
  if (!Array.isArray(element)) {
    root.append(element);
  } else {
    element.forEach((el) => {
      render(el, root);
    });
  }
  doBgWork(root);
}

async function doBgWork(root: Element) {
  await Promise.resolve();
  nixixStore['$$__routeProvider'] = root;
}

export default Nixix;
export { render };
