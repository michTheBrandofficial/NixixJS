import { nixixStore } from './index';
import { Signal, Store } from '../primitives/classes';

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

function updateProps(
  element: HTMLElement | SVGElement,
  property: string,
  newValue: string,
  typeOf: Dependents['typeOf']
) {
  if (typeOf === 'AriaProp') {
    element.setAttribute(`${property}`, newValue);
  } else if (typeOf === 'propertyAttribute') {
    element[property] = newValue;
  } else if (typeOf === 'strokeProp') {
    element.setAttribute(`${property}`, newValue);
  } else if (typeOf === 'regularAttribute') {
    element.setAttribute(property, newValue);
  } else if (typeOf === 'styleProp') {
    element['style'][property] = newValue;
  } else if (typeOf === 'childTextNode') {
    element.childNodes[property].textContent = newValue;
  }
}

export async function parseSignal(
  id: number,
  element: Element,
  property: any,
  typeOf: Dependents['typeOf']
) {
  await Promise.resolve();
  const key = `_${id}_`;
  nixixStore.SignalStore[key].dependents.push({ element, property, typeOf });

  onElementRemoved(element, filterDependencies(element, key, 'SignalStore'));

  return 'Done!!!';
}

/**
 * @param {number} id is the id which diffSignal_ will use to get the Signal object in nixixStore.SignalStore
 * diffSignal_ is not async because it will be passed to nixixStore['diffSignal'], it is defined here for the sake of simplicity of index.ts
 */
export function diffSignal_(id: number) {
  const { value: newValue, dependents } = nixixStore.SignalStore[`_${id}_`];
  dependents.forEach((dependent) => {
    const { typeOf, element, property } = dependent;
    updateProps(
      element as HTMLElement | SVGElement,
      property,
      newValue,
      typeOf
    );
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

export async function parseStore(
  id: number | string,
  element: Element,
  property: any,
  typeOf: Dependents['typeOf'],
  accessor: string
) {
  await Promise.resolve();
  const key = `${id}`;
  nixixStore.Store[key].dependents.push({
    element,
    property,
    typeOf,
    accessor,
  });
  onElementRemoved(element, filterDependencies(element, key, 'Store'));
  return 'Done!!!';
}

/**
 * @param {number} id is the id which diffStore_ will use to get the Signal object in nixixStore.SignalStore
 * diffStore_ is not async because it will be passed to nixixStore['diffStore'], it is defined here for the sake of simplicity of index.ts
 */
export function diffStore_(id: number) {
  const key = `_${id}_`;
  const { dependents } = nixixStore.Store[key];
  dependents.forEach((dependent) => {
    const { typeOf, element, property, accessor } = dependent;
    const newValue = eval(
      `window.$$__NixixStore.Store['${key}'].value${accessor}`
    );
    updateProps(
      element as HTMLElement | SVGElement,
      property,
      newValue,
      typeOf
    );
  });
}

export function raise(message: string) {
  throw `${message}`;
}

export function warn(message: string) {
  console.warn(message);
}
