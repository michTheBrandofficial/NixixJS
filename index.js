import { handleDirectives_, errorFunc, parseSignal, parseStore, addChildren } from './asyncParsers';
import { render, callRef } from './primitives/getters';
import { callSignal, callStore, effect } from './primitives/stateManagement';
import { Signal, Store } from './primitives/classes.js';
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


const Nixix = {
  create: 
  /**
   * 
   * @param {target} tagNameFC 
   * @param {{children?: any, [index: string]: any} | null | undefined} props 
   * @param  {Array<Element | string | Signal>} children 
   * @returns {Element | Array<Element | string | Signal> | undefined}
   */
  function (tagNameFC, props, ...children) {

    if (typeof tagNameFC === 'string') {
      if (tagNameFC === 'fragment') {
        if (children != null) return children
      } else {
        const element = document.createElement(tagNameFC);
        if ((props != null) || (props != undefined)) {

          for (const [k, v] of Object.entries(props)) {
            
            // check if it has a signal object
            if (k === 'className') {
              if (v instanceof Signal) {
                element.setAttribute('class', v.value)
                parseSignal(v.$$__id, element, 'class', 'className');
              } else if (v instanceof Store) {
                element.setAttribute('class', eval(`window.Store['${v.$$__id}'].value${v.$$__name}`));
                // @ts-ignore
                parseStore(v.$$__id, element, k, 'className', v.$$__name);
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
                  element['style'][propname] = value.value;
                  parseSignal(value.$$__id, element, propname, 'styleProp');
                } else if (value instanceof Store) {
                  element['style'][propname] = eval(`window.Store['${value.$$__id}'].value${value.$$__name}`);
                  // @ts-ignore
                  parseStore(value.$$__id, element, propname, 'styleProp', value.$$__name);
                } else {
                  element['style'][propname] = value;
                }
              }
            } else if (k.startsWith('on:')) {
              const domAttribute = k.slice(3);

              if (v instanceof Signal) {
                errorFunc('It seems you passed a reactive value to a DOM attribute. DOM attribute values cannot ge reactive.');
              } else if (v instanceof Store) {
                errorFunc('DOM attributes cannot reactive values.');
              } else {
                element.addEventListener(domAttribute, v)
              }
            } else if (k.startsWith('aria:')) {
              Nixix.handleDynamicAttrs({element, s: 'aria:', k, v, type: 'AriaProp'});
            } else if (k.startsWith('stroke:')) {
              Nixix.handleDynamicAttrs({element, s: 'stroke:', k, v, type: 'strokeProp'});
            } else if (k.startsWith('bind:')) {
              Nixix.handleDirectives(k.slice(5), v, element);
            } else {
              if (v instanceof Signal) {
                element.setAttribute(k, v.value);
                parseSignal(v.$$__id, element, k, 'regularAttribute')
              } else if (v instanceof Store) {
                element.setAttribute(k, eval(`window.Store['${v.$$__id}'].value${v.$$__name}`));
                // @ts-ignore
                parseStore(v.$$__id, element, k, 'regularAttribute', v.$$__name);
              } else {
                element.setAttribute(k, v);
              }
            }

          };
        }

        if ((children != undefined) || (children != null)) {
          addChildren(children, element);
        }

        return element;
      }
    } else if (typeof tagNameFC === 'function') {
      if ((props != null) && (props != undefined)) {
        if (children.length !== 0) {
          props.children = children;
          return tagNameFC(props);
        }
        return tagNameFC(props);
      } else {
        if (children.length !== 0) {
          props = { children: children };
          return tagNameFC(props);
        }
        return tagNameFC();
      }
    }

  },
  handleDirectives: handleDirectives_,
  handleDynamicAttrs: ({element, s, k, v, type}) => {
    const attr = k.slice(s.length);
    if (v instanceof Signal) {
      element.setAttribute(`${s.replace(':', '-')}${attr}`, v.value);
      parseSignal(v.$$__id, element, attr, type)
    } else if (v instanceof Store) {
      element.setAttribute(`${s.replace(':', '-')}${attr}`, eval(`window.Store['${v.$$__id}'].value${v.$$__name}`));
      // @ts-ignore
      parseStore(v.$$__id, element, attr, type, v.$$__name);
    } else {
      element.setAttribute(`${s.replace(':', '-')}${attr}`, v);
    }
  }
};

function Img(props) {
  return (
    Nixix.create("img",{ src:"./"+props.src,...props})
  )
}

/**
 * @param {{fallback: string | Element | Signal, children?: [Promise<any>], onError?: string | Element | Signal}} param0
 */
function Suspense({fallback, children, onError}) {
  const [isWaiting, setIsWaiting] = callSignal(true);
  const span = callRef(null);
  let finalModule = null;
  effect(() => {
    if (isWaiting.value === false) {
      if (finalModule instanceof Array) {
        span.current.replaceWith(...finalModule);
      } else {
        span.current.replaceWith(finalModule);
      }
    }
  })
  children[0].then(value => {
    finalModule = value;
    setIsWaiting(false);
  }).catch(error => {
    if (onError !== undefined && onError !== null) {
      finalModule = onError;
      setIsWaiting(false);
    } 
  })
  return (
    Nixix.create('span', { 'bind:ref': span }, fallback)
  )
}

/**
 * 
 * @param {() => Promise<JSX.Element>} FC 
 * @returns {any}
 */
function asyncComponent(FC) {
  return FC;
}

export default Nixix;
export {
  render,
  Img,
  callSignal,
  callRef,
  callStore,
  effect,
  Store, 
  Signal,
  Suspense,
  asyncComponent
}
  