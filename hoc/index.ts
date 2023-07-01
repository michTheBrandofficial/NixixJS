import { callRef, callSignal, effect, removeSignal, renderEffect } from '../primitives';
import type { ImgHTMLAttributes } from '../types/index';
import Nixix, { nixixStore } from '../dom';

function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
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
      removeSignal(isWaiting);
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

let forCount = 0;

// finish this component tomorrow
function For(props: ForProps) {
  if (!props.parent) throw new Error('Please pass in a parent element.');

  if (props.parent instanceof Array) {
    throw new Error(`Parent element must be a single element.`);
  }

  if (!nixixStore.$$__For) {
    nixixStore.$$__For = {};
  }

  // unique key id
  const forKey = `_${forCount}_`;

  renderEffect(
    () => {
      // if the $$__For var exists, check if the first el is equal to the first el of the mapped values.
      if (nixixStore.$$__For) {
        const forArray = nixixStore.$$__For[forKey];
        if (forArray) {
          const arrayOfJSX = props?.each?.$$__value?.map(
            props?.children?.[0]
          ) || [''];

          nixixStore.$$__For[`_${forCount}_`] = arrayOfJSX;

          (props.parent as HTMLElement).replaceChildren(...arrayOfJSX);
          return
        }
      }
      const arrayOfJSX = props?.each?.$$__value?.map(props?.children?.[0]) || [
        '',
      ];

      nixixStore.$$__For[`_${forCount}_`] = arrayOfJSX;

      (props.parent as HTMLElement).replaceChildren(...arrayOfJSX);
    },
    null,
    [props.each]
  );

  ++forCount;
  return props.parent;
}

function asyncComponent(FC: () => Promise<JSX.Element>): any {
  return FC;
}

function lazy(FC: () => Promise<JSX.Element>) {
  return FC
}

export { Img, Suspense, asyncComponent, For, lazy };
