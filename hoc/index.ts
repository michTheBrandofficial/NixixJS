import { callRef, callSignal, removeSignal, renderEffect } from '../primitives';
import type { ImgHTMLAttributes } from '../types/index';
import Nixix, { nixixStore } from '../dom';

function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
  return Nixix.create('img', { src: './' + props.src, ...props });
}

function Suspense(props: SuspenseProps) {
  const { children, onError, fallback } = props;
  const [isWaiting, setIsWaiting] = callSignal(true);

  const span = callRef(null);
  let finalModule = null;
  callReaction(() => {});
  return fallback;
}

let forCount = 0;

function checkLength(array: any[]) {
  return array.length === 0 ? false : array;
}

// finish this component tomorrow
function For(props: ForProps) {
  const { parent, each, fallback, children } = props;
  if (!parent) throw new Error('Please pass a parent element.');

  if (parent instanceof Array) {
    throw new Error(`Parent element must be a single element.`);
  }

  if (!nixixStore.$$__For) {
    nixixStore.$$__For = {};
  }

  // unique id
  const forKey = `_${forCount}_`;

  renderEffect(
    () => {
      // if the $$__For var exists, check if the first el is equal to the first el of the mapped values.
      if (nixixStore.$$__For) {
        const forArray = nixixStore.$$__For[forKey];
        if (forArray) {
          const mappedArray = each?.$$__value?.map(children?.[0]);

          const arrayOfJSX =
            checkLength(mappedArray) ||
            (fallback instanceof Array ? fallback : [fallback]);

          nixixStore.$$__For[`_${forCount}_`] = arrayOfJSX;

          (parent as HTMLElement).replaceChildren(...arrayOfJSX);
          return;
        }
      }
      const mappedArray = each?.$$__value?.map(children?.[0]);

      const arrayOfJSX =
        checkLength(mappedArray) ||
        (fallback instanceof Array ? fallback : [fallback]);
      nixixStore.$$__For[`_${forCount}_`] = arrayOfJSX;

      (parent as HTMLElement).replaceChildren(...arrayOfJSX);
    },
    null,
    [each]
  );

  ++forCount;
  return parent;
}

function asyncComponent(FC: () => Promise<JSX.Element>): any {
  return FC;
}

const lazy = asyncComponent;

export { Img, Suspense, asyncComponent, For, lazy };
