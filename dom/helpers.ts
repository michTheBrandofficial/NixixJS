import { nixixStore } from './index';
import { Signal, Store } from '../primitives/classes';

export const svgElementsTags = [
  'a',
  'animate',
  'animateMotion',
  'animateTransform',
  'circle',
  'clipPath',
  'defs',
  'desc',
  'ellipse',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'filter',
  'foreignObject',
  'g',
  'image',
  'line',
  'linearGradient',
  'marker',
  'mask',
  'metadata',
  'mpath',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'script',
  'set',
  'stop',
  'style',
  'svg',
  'switch',
  'symbol',
  'text',
  'textPath',
  'title',
  'tspan',
  'use',
  'view',
];

/**
 *
 */
export function addChildren(
  children: ChildrenType,
  element: HTMLElement | SVGElement
) {
  children.forEach((child, index) => {
    if (typeof child === 'string' || typeof child === 'number') {
      element.append(document.createTextNode(String(child)));
    } else if (child instanceof Array) {
      for (const fragChild of child) {
        if (typeof fragChild === 'object') {
          if (fragChild instanceof Signal) {
            element.append(document.createTextNode(fragChild.value));
            parseSignal(fragChild.$$__id, element, index, 'childTextNode');
          } else if (fragChild instanceof Store) {
            element.append(
              document.createTextNode(
                eval(
                  `window.$$__NixixStore.Store['${fragChild.$$__id}'].value${fragChild.$$__name}`
                )
              )
            );
            // @ts-ignore
            parseStore(
              fragChild.$$__id,
              element,
              index,
              'childTextNode',
              fragChild.$$__name
            );
          } else {
            element.append(fragChild);
          }
        } else {
          element.append(document.createTextNode(fragChild));
        }
      }
    } else if (typeof child === 'object') {
      if (child instanceof Signal) {
        element.append(document.createTextNode(child.value));
        parseSignal(child.$$__id, element, index, 'childTextNode');
      } else if (child instanceof Store) {
        element.append(
          document.createTextNode(
            eval(
              `window.$$__NixixStore.Store['${child.$$__id}'].value${child.$$__name}`
            )
          )
        );
        // @ts-ignore
        parseStore(
          child.$$__id,
          element,
          index,
          'childTextNode',
          child.$$__name
        );
      } else {
        element.append(child as unknown as string);
      }
    }
  });
}

const refHash = {
  count: 0,
  refs: [],
};

export function handleDirectives_(
  bindtype: string,
  directiveValue: {} & MutableRefObject,
  element: Element
) {
  if (bindtype === 'ref') {
    if (directiveValue instanceof Signal || directiveValue instanceof Store)
      throw new Error(
        `The bind:ref directive's value cannot be reactive, it must be a MutableRefObject.`
      );

    let refObject: MutableRefObject;

    refObject = directiveValue;
    refObject['current'] = element;
    refHash.refs.push(refObject);
    if (refHash.count === 0) {
      window.addEventListener('DOMContentLoaded', () => {
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

/**
 * adds an element to the dependents array in the global store object.
 */
export async function parseSignal(
  id: number,
  element: Element,
  property: any,
  typeOf: Dependents['typeOf']
) {
  await Promise.resolve();
  const key = `_${id}_`;
  if (typeOf === 'DOMProp') {
    nixixStore.SignalStore[key].dependents.push({ element, property, typeOf });
  } else {
    nixixStore.SignalStore[key].dependents.push({ element, property, typeOf });
  }

  onElementRemoved(element, filterDependencies(element, key, 'SignalStore'));

  return 'Done!!!';
}

/**
 * @param {number} id is the id which diffSignal_ will use to get the Signal object in nixixStore.SignalStore
 * diffSignal_ is not async because it will be passed to nixixStore['diffSignal'], it is defined here for the sake of simplicity of index.ts
 */
export async function diffSignal_(id: number) {
  await Promise.resolve();
  const { value, dependents } = nixixStore.SignalStore[`_${id}_`];
  dependents.forEach((dependent) => {
    const { typeOf, element, property } = dependent;
    if (typeOf === 'AriaProp') {
      element.setAttribute(`aria-${property}`, value);
    } else if (typeOf === 'className') {
      element.setAttribute('class', value);
    } else if (typeOf === 'strokeProp') {
      element.setAttribute(`stroke-${property}`, value);
    } else if (typeOf === 'regularAttribute') {
      element.setAttribute(property, value);
    } else if (typeOf === 'styleProp') {
      element['style'][property] = value;
    } else if (typeOf === 'childTextNode') {
      element.childNodes[property].textContent = value;
    }
  });
}

/**
 * used to add a listener to elements so that the get cleaned up after they are removed from the dom.
 */
async function onElementRemoved(element: Element, callback: CallableFunction) {
  await Promise.resolve();
  const observer = new MutationObserver(function (mutations) {
    if (!document.body.contains(element)) {
      callback();
      this.disconnect();
    }
  });

  observer.observe(element.parentElement, { childList: true });
}

/**
 * used to filter the dependency array in the global store object.
 */
function filterDependencies(
  element: Element,
  key: string,
  reactiveProvider: 'SignalStore' | 'Store'
) {
  return async () => {
    await Promise.resolve();
    nixixStore[reactiveProvider][key].dependents = nixixStore[reactiveProvider][
      key
    ].dependents.filter((arr) => {
      return arr.element !== element;
    });
  };
}

/**
 * used to add elements to the dependencies array in the global store object.
 */
export async function parseStore(
  id: number | string,
  element: Element,
  property: any,
  typeOf: Dependents['typeOf'],
  accessor: string
) {
  await Promise.resolve();
  const key = `${id}`;
  if (typeOf === 'DOMProp') {
    nixixStore.Store[key].dependents.push({
      element,
      property,
      typeOf,
      accessor,
    });
  } else {
    nixixStore.Store[key].dependents.push({
      element,
      property,
      typeOf,
      accessor,
    });
  }

  onElementRemoved(element, filterDependencies(element, key, 'Store'));

  return 'Done!!!';
}

/**
 * @param {number} id is the id which diffStore_ will use to get the Signal object in nixixStore.SignalStore
 * diffStore_ is not async because it will be passed to nixixStore['diffStore'], it is defined here for the sake of simplicity of index.ts
 */
export async function diffStore_(id: number) {
  await Promise.resolve();
  const key = `_${id}_`;
  /**
   * @type {{value: any, dependents: Dependents[]}}
   */
  const { dependents } = nixixStore.Store[key];
  dependents.forEach((dependent) => {
    const { typeOf, element, property, accessor } = dependent;
    if (typeOf === 'AriaProp') {
      element.setAttribute(
        `aria-${property}`,
        eval(`window.$$__NixixStore.Store['${key}'].value${accessor}`)
      );
    } else if (typeOf === 'className') {
      element.setAttribute(
        'class',
        eval(`window.$$__NixixStore.Store['${key}'].value${accessor}`)
      );
    } else if (typeOf === 'strokeProp') {
      element.setAttribute(
        `stroke-${property}`,
        eval(`window.$$__NixixStore.Store['${key}'].value${accessor}`)
      );
    } else if (typeOf === 'regularAttribute') {
      element.setAttribute(
        property,
        eval(`window.$$__NixixStore.Store['${key}'].value${accessor}`)
      );
    } else if (typeOf === 'styleProp') {
      element['style'][property] = eval(
        `window.$$__NixixStore.Store['${key}'].value${accessor}`
      );
    } else if (typeOf === 'childTextNode') {
      element.childNodes[property].textContent = eval(
        `window.$$__NixixStore.Store['${key}'].value${accessor}`
      );
    }
  });
}

export function errorFunc(message: string) {
  throw `${message}`;
}
