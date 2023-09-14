import Nixix, { nixixStore } from '../dom';
import { isArray, raise } from '../dom/helpers';
import { LiveFragment } from '../live-fragment';
import {
  callReaction,
  callStore,
  removeSignal,
  renderEffect,
} from '../primitives';
import type { Booleanish } from '../types/eventhandlers';
import type { ImgHTMLAttributes } from '../types/index';
import {
  checkLength,
  createBoundary,
  flatten,
  getShow,
  indexes,
  isArrayToDF,
  isNotArray,
} from './helpers';

function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
  return Nixix.create('img', { src: './' + props.src, ...props });
}

function Suspense(props: SuspenseProps) {
  let { children, onError, fallback } = props;
  const [loading, setLoading] = callStore<{ rejected: Booleanish }>({
    rejected: 'true',
  });
  if (!children) {
    raise(`The Suspense component must have children that return a promise.`);
  }
  const commentBoundary = createBoundary(
    fallback instanceof Array ? fallback : [fallback],
    'suspense'
  );
  let liveFragment: LiveFragment = null;
  let resolvedJSX: typeof fallback = null;
  callReaction(() => {
    if (liveFragment === null) {
      liveFragment = new LiveFragment(...indexes(commentBoundary));
    }
    liveFragment.replace(resolvedJSX as any);
    !loading.$$__value.rejected && removeSignal(loading);
  }, [loading]);

  Promise.all(children)
    ?.then((value) => {
      const valueArray = flatten(value);
      resolvedJSX = isArrayToDF(valueArray) as any;
      setLoading({
        rejected: false,
      });
    })
    ?.catch(() => {
      resolvedJSX = onError ? (isArrayToDF(onError) as any) : '';
      onError &&
        setLoading((prev) => {
          prev.rejected =
            prev.rejected === false || prev.rejected === true ? 'true' : true;
          return prev;
        });
    });
  return commentBoundary;
}

let forCount = 0;

function For(props: ForProps) {
  const { parent, each, fallback, children } = props;

  return;
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

function Show(props: ShowProps) {
  let { children, when, switch: signalSwitch, fallback } = props;
  fallback && isNotArray(fallback);
  children = flatten(children);
  const show = getShow(when, children, fallback);
  const commentBoundary = createBoundary(show, 'show');
  let liveFragment: LiveFragment = null;
  callReaction(() => {
    if (!liveFragment) {
      liveFragment = new LiveFragment(...indexes(commentBoundary));
    }
    if (when()) {
      liveFragment.replace(isArrayToDF(children) as any);
    } else {
      liveFragment.replace(isArrayToDF(fallback) as any);
    }
  }, [signalSwitch]);

  return commentBoundary;
}

function asyncComponent(FC: () => Promise<JSX.Element>): any {
  return FC;
}

const lazy = asyncComponent;

export { For, Img, Suspense, Show, asyncComponent, lazy };
