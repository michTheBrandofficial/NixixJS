import { Signal, Store } from "./primitives/classes";
/**
 * @typedef {import('./types').Root.Dependents} Dependents
 * @typedef {import('./types').SignalRoot} SignalRoot
 * @typedef {import('./types').MutableRefObject} MutableRefObject
 */

/**
 * @param {(string | Element | Signal)[]} children
 * @param {HTMLElementTagNameMap[keyof HTMLElementTagNameMap]} element
 */
export function addChildren(children, element) {
  children.forEach((child, index) => {

    if (typeof child === 'string' || typeof child === 'number') {
      element.append(document.createTextNode(String(child)))
    } else if (child instanceof Array) {
      for (const fragChild of child) {
        if (typeof fragChild === 'object') {
          if (fragChild instanceof Signal) {
            element.append(document.createTextNode((fragChild).value));
            parseSignal((fragChild).$$__id, element, index, 'childTextNode');
          } else if (fragChild instanceof Store) {
            element.append(document.createTextNode(eval(`window.Store['${fragChild.$$__id}'].value${fragChild.$$__name}`)));
            // @ts-ignore
            parseStore(fragChild.$$__id, element, index, 'childTextNode', fragChild.$$__name);
          } else {
            element.append(fragChild);
          }
        } else {
          element.append(document.createTextNode(fragChild));
        }
      }
    } else if (typeof child === 'object') {
      if (child instanceof Signal) {
        element.append(document.createTextNode((child).value));
        parseSignal((child).$$__id, element, index, 'childTextNode');
      } else if (child instanceof Store) {
        element.append(document.createTextNode(eval(`window.Store['${child.$$__id}'].value${child.$$__name}`)));
        // @ts-ignore
        parseStore(child.$$__id, element, index, 'childTextNode', child.$$__name);
      } else {
        element.append(child);
      }
    }
  })
}

/**
   * 
   * @param {string} bindtype string 'ref' or any other binding
   * @param {{} & MutableRefObject} directiveValue value of the bind type
   * @param {Element} element 
   */
export function handleDirectives_(bindtype, directiveValue, element) {

  if (bindtype === 'ref') {
    if (directiveValue instanceof Signal) {
      errorFunc(`The bind:ref directive's value cannot be reactive, it must be a MutableRefObject.`);
    }
    if (directiveValue instanceof Store) {
      errorFunc(`The bind:ref directive's value cannot be reactive, it must be a MutableRefObject.`);
    }
    /**
     * @type {MutableRefObject} refObject
     */
    let refObject;

    refObject = directiveValue;
    refObject['current'] = element;
    window.addEventListener('DOMContentLoaded', () => {
      parseRef(refObject);
    })
  }

}
/**
 * 
 * @param {MutableRefObject} refObject 
 * @returns 
 */
export async function parseRef(refObject) {
  await Promise.resolve();
  const current = refObject.current;
  refObject.nextElementSibling = current.nextElementSibling;
  refObject.parent = current.parentElement;
  refObject.prevElementSibling = current.previousElementSibling;
}

/**
 * 
 * @param {number} id 
 * @param {Element} element 
 * @param {any} property 
 * @param {Dependents['typeOf']} typeOf 
 * @param {EventListenerObject} [oldCallback] 
 * @returns 
 */
export async function parseSignal(id, element, property, typeOf, oldCallback) {
  await Promise.resolve();
  const key = `_${id}_`;
  if (typeOf === 'DOMProp') {
    window.SignalStore[key].dependents.push(
      { element, property, typeOf, oldCallback }
    )
  } else {
    window.SignalStore[key].dependents.push(
      { element, property, typeOf }
    );
  }

  onElementRemoved(element, filterDependencies(element, key, 'SignalStore'));

  return 'Done!!!';
}

/**
 * @param {number} id is the id which diffSignal_ will use to get the Signal object in window.SignalStore
 * diffSignal_ is not async because it will be passed to window['diffSignal'], it is defined here for the sake of simplicity of index.ts
 */
export async function diffSignal_(id) {

  await Promise.resolve();
  /**
   * @type {{value: any, dependents: Dependents[]}} 
   */
  const { value, dependents } = window.SignalStore[`_${id}_`];
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
      (element)['style'][property] = value;
    } else if (typeOf === 'childTextNode') {
      element.childNodes[property].textContent = value;
    }

  });

}

/**
 * @param {Element} element
 * @param {CallableFunction} callback
 */
async function onElementRemoved(element, callback) {
  await Promise.resolve();
  new MutationObserver(function(mutations) {
    if(!document.body.contains(element)) {
      callback();
      this.disconnect();
    }
  }).observe(element.parentElement, { childList: true });
}

/**
 * 
 * @param {Element} element 
 * @param {string} key
 * @param {'SignalStore' | 'Store'} reactiveProvider
 */
function filterDependencies(element, key, reactiveProvider) {
  return async () => {
    await Promise.resolve();
    window[reactiveProvider][key].dependents = window[reactiveProvider][key].dependents.filter((arr) => {
      return arr.element !== element; 
    })
  }
}

/**
 * 
 * @param {number} id 
 * @param {Element} element 
 * @param {any} property 
 * @param {Dependents['typeOf']} typeOf 
 * @param {string} accessor
 * @returns 
 */
export async function parseStore(id, element, property, typeOf, accessor) {
  await Promise.resolve();
  const key = `${id}`;
  if (typeOf === 'DOMProp') {
    window.Store[key].dependents.push(
      { element, property, typeOf, accessor }
    )
  } else {
    window.Store[key].dependents.push(
      { element, property, typeOf, accessor }
    );
  }

  onElementRemoved(element, filterDependencies(element, key, 'Store'));

  return 'Done!!!';
}

/**
 * @param {number} id is the id which diffStore_ will use to get the Signal object in window.SignalStore
 * diffStore_ is not async because it will be passed to window['diffStore'], it is defined here for the sake of simplicity of index.ts
 */
export async function diffStore_(id) {

  await Promise.resolve();
  const key = `_${id}_`;
  /**
   * @type {{value: any, dependents: Dependents[]}} 
   */
  const { dependents } = window.Store[key];
  dependents.forEach((dependent) => {
    const { typeOf, element, property, accessor } = dependent;
    if (typeOf === 'AriaProp') {
      element.setAttribute(`aria-${property}`, eval(`window.Store['${key}'].value${accessor}`));
    } else if (typeOf === 'className') {
      element.setAttribute('class', eval(`window.Store['${key}'].value${accessor}`));
    } else if (typeOf === 'strokeProp') {
      element.setAttribute(`stroke-${property}`, eval(`window.Store['${key}'].value${accessor}`));
    } else if (typeOf === 'regularAttribute') {
      element.setAttribute(property, eval(`window.Store['${key}'].value${accessor}`));
    } else if (typeOf === 'styleProp') {
      (element)['style'][property] = eval(`window.Store['${key}'].value${accessor}`);
    } else if (typeOf === 'childTextNode') {
      element.childNodes[property].textContent = eval(`window.Store['${key}'].value${accessor}`);
    }

  });

}

/**
 * 
 * @param {string} message 
 * @param {string | null} caller 
 */
export function errorFunc(message, caller = 'Nixix.create.caller.name') {
  throw(`${message} @${eval(caller)}`);
}