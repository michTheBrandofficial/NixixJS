import { diffSignal_, handleDirectives_, errorFunc, parseSignal } from './asyncParsers';
/**
 * @typedef {import('./types').target} target
 * @typedef {import('./types').MutableRefObject} MutableRefObject
 * @typedef {import('./types').Root} Root
 */
/**
 * @template S 
 * @typedef {import('./types').SignalObject<S>} SignalObject<S>
 */
/**
 * @template S
 * @typedef {import('./types').SetSignalDispatcher<S>} SetSignalDispatcher<S>
 */

/**
 * @type {'fragment'} Fragment
 */
const Fragment = 'fragment';

export class Signal {
  /**
   * @param {any} value
   * @param {number} id
   */
  constructor(value, id) { 
    this['$$__value'] = value;
    this['$$__id'] = id;
  }
}

const Nixix = {
  create: 
  /**
   * 
   * @param {target} tagNameFC 
   * @param {{} | null | undefined} props 
   * @param  {Array<Element | string | Signal>} children 
   * @returns {Element | Array<Element | string | Signal> | undefined}
   */
  function (tagNameFC, props, ...children) {

    if (typeof tagNameFC === 'string') {
      // if tagname is a string
      if (tagNameFC === 'fragment') {
        if (children != null) return children
      } else {
        const element = document.createElement(tagNameFC);
        if ((props != null) || (props != undefined)) {

          for (const [k, v] of Object.entries(props)) {
            
            // check if it has a signal object
            if (k === 'className') {
              if (v instanceof Signal) {
                element.setAttribute('class', v.$$__value)
                parseSignal(v.$$__id, element, 'class', 'className');
              } else {
                element.setAttribute('class', v);
              }
            } else if (k === 'style') {
              /**
               * @type {Array<[string, string | SignalObject<string>]>} styles
               */
              const styles = Object.entries(v);
              for (let [propname, value] of styles) {
                if (value instanceof Signal) {
                  element['style'][propname] = value.$$__value;
                  parseSignal(value.$$__id, element, propname, 'styleProp');
                } else {
                  element['style'][propname] = value;
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
                element.addEventListener(domAttribute, v)
              }
            } else if (k.startsWith('aria:')) {
              const attr = k.slice(5);
              if (v instanceof Signal) {
                element.setAttribute(`aria-${attr}`, v.$$__value);
                parseSignal(v.$$__id, element, attr, 'AriaProp')
              } else {
                element.setAttribute(`aria-${attr}`, v);
              }
            } else if (k.startsWith('bind:')) {
              Nixix.handleDirectives(k.slice(5), v, element);
            } else {
              if (v instanceof Signal) {
                element.setAttribute(k, v.$$__value);
                parseSignal(v.$$__id, element, k, 'regularAttribute')
              } else {
                element.setAttribute(k, v);
              }
            }

          };
        }

        if ((children != undefined) || (children != null)) {
          children.forEach((child, index) => {

            if (typeof child === 'string' || typeof child === 'number') {
              element.append(document.createTextNode(String(child)))
            } else if (child instanceof Array) {
              for (const fragChild of child) {
                if (typeof fragChild === 'object') {
                  if (fragChild instanceof Signal) {
                    element.append(document.createTextNode((fragChild).$$__value));
                    parseSignal((fragChild).$$__id, element, index, 'childTextNode');
                  } else {
                    element.append(fragChild);
                  }
                } else {
                  element.append(document.createTextNode(fragChild));
                }
              }
            } else if (typeof child === 'object') {
              if (child instanceof Signal) {
                element.append(document.createTextNode((child).$$__value));
                parseSignal((child).$$__id, element, index, 'childTextNode');
              } else {
                element.append(child);
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

/**
 * @typedef {import('./types').NixixNode} NixixNode
 * @param {NixixNode} element 
 * @param {HTMLElement} root 
 */
function render(element, root) {
  if (!Array.isArray(element)) {
    root.append(element);
  } else {
    element.forEach(el => {
      render(el, root)
    })
  }
}

// hooks
/**
 * @template {Element & null} R 
 * @param {R} ref 
 * @returns {MutableRefObject}
 */
function callRef(ref) {
  if (window['refCount'] === undefined) {
    window['refCount'] = 0;
  } else if (window['refCount'] != undefined) {
    window['refCount']  = window['refCount']  + 1;
  }
  return { 
    // @ts-ignore
    current: {}, 
    refId: window['refCount'],
    nextElementSibling: ref,
    prevElementSibling: ref,
    parent: ref
  };
}

/**
 * @template S
 * @param {S} initialValue
 * @returns {[SignalObject<S>, SetSignalDispatcher<S>]}
 */
function callSignal(initialValue) {
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
  /**
   * @type {(string | number | boolean) | object} value - in the worst case of it being an instance of object, throw an error.
   */
  let value = typeof initialValue === 'function' ? initialValue() : initialValue;
  (typeof value === 'object' || value instanceof Array ) ? errorFunc(`The callSignal hook's arguments can not be an object or an array.`, 'callSignal.caller.name') : 'none';

  /**
   * @type {Root['window']} myWindow
   */
  //@ts-ignore
  const myWindow = window
  myWindow.SignalStore[`_${signalId}_`] = {value: value, dependents: []}
  let initValue = new Signal(value, signalId);
  return [
    initValue,
    (newState, id = signalId, mutableSignalObject = initValue) => { 

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
  