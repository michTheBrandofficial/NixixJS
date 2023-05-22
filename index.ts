import {
  handleDirectives_,
  errorFunc,
  parseSignal,
  parseStore,
  addChildren,
} from './asyncParsers';
import { render, callRef } from './primitives/getters';
import { callSignal, callStore, effect } from './primitives/stateManagement';
import { Signal, Store } from './primitives/classes.js';

// Global store for the store class and signals.
window['$$__NixixStore'] = {};
export const nixixStore = window.$$__NixixStore;

const Nixix = {
  create:
    function (
      tagNameFC: target,
      props: Proptype,
      ...children: ChildrenType
    ): Element | Array<Element | string | Signal> | undefined {
      if (typeof tagNameFC === 'string') {
        if (tagNameFC === 'fragment') {
          if (children != null) return children;
        } else {
          const element = document.createElement(tagNameFC);
          if (props != null || props != undefined) {
            for (const [k, v] of Object.entries(props)) {
              // check if it has a signal object
              if (k === 'className') {
                if (v instanceof Signal) {
                  element.setAttribute('class', v.value);
                  parseSignal(v.$$__id, element, 'class', 'className');
                } else if (v instanceof Store) {
                  element.setAttribute(
                    'class',
                    eval(`nixixStore.Store['${v.$$__id}'].value${v.$$__name}`)
                  );
                  parseStore(v.$$__id as number, element, k, 'className', v.$$__name);
                } else {
                  element.setAttribute('class', v);
                }
              } else if (k === 'style') {
                /**
                 * @type {Array<[string, string | SignalObject<string>]>} styles
                 */
                const styles: Array<[string, string | SignalObject<string>]> =
                  Object.entries(v);
                for (let [propname, value] of styles) {
                  if (value instanceof Signal) {
                    element['style'][propname] = value.value;
                    parseSignal(value.$$__id, element, propname, 'styleProp');
                  } else if (value instanceof Store) {
                    element['style'][propname] = eval(
                      `nixixStore.Store['${value.$$__id}'].value${value.$$__name}`
                    );
                    parseStore(
                      value.$$__id as number,
                      element,
                      propname,
                      'styleProp',
                      value.$$__name
                    );
                  } else {
                    element['style'][propname] = value;
                  }
                }
              } else if (k.startsWith('on:')) {
                const domAttribute = k.slice(3);

                if (v instanceof Signal) {
                  errorFunc(
                    'It seems you passed a reactive value to a DOM attribute. DOM attribute values cannot ge reactive.'
                  );
                } else if (v instanceof Store) {
                  errorFunc('DOM attributes cannot reactive values.');
                } else {
                  element.addEventListener(domAttribute, v);
                }
              } else if (k.startsWith('aria:')) {
                Nixix.handleDynamicAttrs({
                  element,
                  s: 'aria:',
                  k,
                  v,
                  type: 'AriaProp',
                });
              } else if (k.startsWith('stroke:')) {
                Nixix.handleDynamicAttrs({
                  element,
                  s: 'stroke:',
                  k,
                  v,
                  type: 'strokeProp',
                });
              } else if (k.startsWith('bind:')) {
                Nixix.handleDirectives(k.slice(5), v, element);
              } else {
                if (v instanceof Signal) {
                  element.setAttribute(k, v.value);
                  parseSignal(v.$$__id, element, k, 'regularAttribute');
                } else if (v instanceof Store) {
                  element.setAttribute(
                    k,
                    eval(`nixixStore.Store['${v.$$__id}'].value${v.$$__name}`)
                  );
                  parseStore(
                    v.$$__id as number,
                    element,
                    k,
                    'regularAttribute',
                    v.$$__name
                  );
                } else {
                  element.setAttribute(k, v);
                }
              }
            }
          }

          if (children != undefined || children != null) {
            addChildren(children, element);
          }

          return element;
        }
      } else if (typeof tagNameFC === 'function') {
        if (props != null && props != undefined) {
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
  handleDynamicAttrs: ({ element, s, k, v, type }) => {
    const attr = k.slice(s.length);
    if (v instanceof Signal) {
      element.setAttribute(`${s.replace(':', '-')}${attr}`, v.value);
      parseSignal(v.$$__id, element, attr, type);
    } else if (v instanceof Store) {
      element.setAttribute(
        `${s.replace(':', '-')}${attr}`,
        eval(`nixixStore.Store['${v.$$__id}'].value${v.$$__name}`)
      );
      parseStore(v.$$__id as number, element, attr, type, v.$$__name);
    } else {
      element.setAttribute(`${s.replace(':', '-')}${attr}`, v);
    }
  },
};

function Img(props: Nixix.ImgHTMLAttributes<HTMLImageElement>) {
  return Nixix.create('img', { src: './' + props.src, ...props });
}

function addSpanProps(props: SuspenseProps) {
  const suspenseProps = ['fallback', 'onError', 'children'];
  let object = {};
  Object.keys(props).forEach((key) => {
    if (suspenseProps.includes(key) === false) {
      object[key] = props[key];
    }
  });
  return object;
}

function Suspense(props: SuspenseProps) {
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
  });
  props.children[0]
    .then((value) => {
      finalModule = value;
      setIsWaiting(false);
    })
    .catch((error) => {
      if (props.onError !== undefined && props.onError !== null) {
        finalModule = props.onError;
        setIsWaiting(false);
      }
    });
  return Nixix.create(
    'span',
    { 'bind:ref': span, ...addSpanProps(props) },
    props.fallback
  );
}

function asyncComponent(FC: () => Promise<JSX.Element>): any {
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
  asyncComponent,
};
