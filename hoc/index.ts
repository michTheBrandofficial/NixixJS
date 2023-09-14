import {
  callSignal,
  effect,
  callReaction,
  removeSignal,
  renderEffect,
} from '../primitives';
import type { ImgHTMLAttributes } from '../types/index';
import Nixix, { nixixStore } from '../dom';
import { createFragment, isArray, raise, warn } from '../dom/helpers';

function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
  return Nixix.create('img', { src: './' + props.src, ...props });
}

function Suspense(props: SuspenseProps) {
  let { children, onError, fallback } = props;
  const [isWaiting, setIsWaiting] = callSignal(true);
  const fragment = createFragment(isArray(fallback));

  let resolveJSX = null;
  callReaction(() => {
    if (isWaiting.value === false) {
      fragment.replaceChildren(...isArray(resolveJSX));
      removeSignal(isWaiting);
    }
  }, [isWaiting]);
  children[0]
    .then((value) => {
      resolveJSX = value;
      setIsWaiting(false);
    })
    .catch(() => {
      if (onError !== undefined && onError !== null) {
        resolveJSX = onError;
        setIsWaiting(false);
      }
    });
  return fragment;
}

let forCount = 0;

function checkLength(array: any[]) {
  return array.length === 0 ? false : array;
}

function createElements(
  each: any,
  callback: CallableFunction
): Array<JSX.Element> {
  const arrayOfJSX = each.$$__value?.map?.(callback);
  arrayOfJSX?.forEach?.((e: any, i) => {
    if (e instanceof Array)
      return raise(
        `Each item of the For component array must have one parent element.`
      );
  });
  return arrayOfJSX;
}

function For(props: ForProps) {
  const { parent, each, fallback, children } = props;
  if (each.$$__value instanceof Array !== true) {
    warn(`Please pass a reactive array as the each prop value.`);
    return [];
  }
  const callback = children[0];
  let arrayOfJSX = createElements(each, callback);
  callReaction(() => {
    const parent = arrayOfJSX[0]?.parentElement;
    const newArrayOfJsx = createElements(each, callback);
    newArrayOfJsx.forEach((e, i) => {
      parent.replaceChild(e, arrayOfJSX[i]);
    });
  }, [each]);

  return arrayOfJSX;
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
