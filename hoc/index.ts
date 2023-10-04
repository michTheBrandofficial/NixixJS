import Nixix, { nixixStore } from '../dom';
import { raise } from '../dom/helpers';
import { LiveFragment } from '../live-fragment';
import { callReaction, callStore, removeSignal } from '../primitives';
import { Store } from '../primitives/classes';
import type { Booleanish } from '../types/eventhandlers';
import type { ImgHTMLAttributes } from '../types/index';
import {
  arrayOfJSX,
  comment,
  createBoundary,
  flatten,
  getShow,
  indexes,
  arrayToDF,
  numArray,
  isArray,
  removeNodes,
  getIncrementalNodes,
} from './helpers';

function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
  return Nixix.create('img', { src: './' + props.src, ...props });
}

function Suspense(props: SuspenseProps) {
  let { children, onError, fallback } = props;
  if (!children) {
    raise(`The Suspense component must have children that return a promise.`);
  }
  const [loading, setLoading] = callStore<{ rejected: Booleanish }>({
    rejected: 'true',
  });
  fallback = fallback
    ? fallback instanceof Array
      ? fallback
      : [fallback]
    : ([comment('nixix-fallback')] as any);
  const commentBoundary = createBoundary(fallback as any, 'suspense');
  let resolvedJSX: typeof fallback = null;
  let liveFragment: LiveFragment = null;
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
      resolvedJSX = arrayToDF(valueArray) as any;
      setLoading({
        rejected: false,
      });
    })
    ?.catch(() => {
      resolvedJSX = onError ? (arrayToDF(onError) as any) : fallback;
      onError &&
        setLoading((prev) => {
          prev.rejected =
            prev.rejected === false || prev.rejected === true ? 'true' : true;
          return prev;
        });
    });
  return commentBoundary;
}

function For(props: ForProps) {
  let { fallback, children, each } = props;
  let callback = children[0];
  let liveFragment: LiveFragment = null;
  children = arrayOfJSX(each, callback);
  fallback
    ? isArray(fallback)
      ? null
      : (fallback = [fallback] as any)
    : (fallback = [comment('nixix-fallback')] as any);
  const commentBoundary = createBoundary(
    children.length > 0 ? children : (fallback as any),
    'for'
  );
  const removedNodes = [];
  callReaction(() => {
    if (!liveFragment) {
      liveFragment = new LiveFragment(...indexes(commentBoundary));
    }
    const eachLen = each.$$__value.length;
    if (eachLen === 0) {
      removeNodes(eachLen, liveFragment, removedNodes);
      return liveFragment.replace(arrayToDF(fallback) as any);
    } else {
      if (fallback?.[0]?.isConnected || (fallback as Element)?.isConnected) {
        liveFragment.empty();
      }
      let childnodesLength = liveFragment.childNodes.length;
      if (childnodesLength === eachLen) return;
      if (childnodesLength > eachLen) {
        removeNodes(eachLen, liveFragment, removedNodes);
      } else if (childnodesLength < eachLen) {
        const targetLength =
          removedNodes.length + liveFragment.childNodes.length;
        if (targetLength === eachLen) {
          Boolean(removedNodes.length) &&
            liveFragment.appendChild(arrayToDF(removedNodes));
          removedNodes.length = 0;
        } else if (targetLength < eachLen) {
          Boolean(removedNodes.length) &&
            liveFragment.appendChild(arrayToDF(removedNodes));
          childnodesLength = liveFragment.childNodes.length; // 4
          if (childnodesLength === eachLen) return;
          const indexArray = numArray(childnodesLength, eachLen);
          children = getIncrementalNodes(indexArray, Store, each, callback);
          liveFragment.append(arrayToDF(children as any) as any);
          nixixStore.Store[`_${each.$$__id}_`].cleanup?.();
        } else if (targetLength > eachLen) {
          // [<div class="text-blue-200" >, <div>, <div>, <div>]
          // [<div class="text-blue-200" >, <div>, ]
          const restoredNodes = removedNodes.splice(
            0,
            eachLen - childnodesLength
          );
          liveFragment.appendChild(arrayToDF(restoredNodes));
        }
      }
    }
  }, [each]);

  return commentBoundary;
}

function Show(props: ShowProps) {
  let { children, when, switch: signalSwitch, fallback } = props;
  fallback
    ? isArray(fallback)
      ? null
      : (fallback = [fallback])
    : (fallback = [comment('nixix-fallback')]);
  children = flatten(children);
  let liveFragment: LiveFragment = null;
  const show = getShow(when, children, fallback);
  const commentBoundary = createBoundary(show, 'show');
  callReaction(() => {
    if (!liveFragment) {
      liveFragment = new LiveFragment(...indexes(commentBoundary));
    }
    if (when()) {
      liveFragment.replace(arrayToDF(children) as any);
    } else {
      liveFragment.replace(arrayToDF(fallback) as any);
    }
  }, [signalSwitch]);

  return commentBoundary;
}

function asyncComponent(FC: () => Promise<JSX.Element>): any {
  return FC;
}

const lazy = asyncComponent;

export { For, Img, Suspense, Show, asyncComponent, lazy };
