import Nixix, { nixixStore } from '../dom';
import { createFragment, raise } from '../dom/helpers';
import { LiveFragment } from '../live-fragment';
import { callReaction, callStore } from '../primitives';
import { Store } from '../primitives/classes';
import type { ImgHTMLAttributes } from '../types/index';
import {
  arrayOfJSX,
  comment,
  createBoundary,
  getIncrementalNodes,
  getShow,
  numArray,
  removeNodes,
} from './helpers';

function Img(props: ImgHTMLAttributes<HTMLImageElement>) {
  return Nixix.create('img', { src: './' + props.src, ...props });
}

function Suspense(props: SuspenseProps) {
  let { children, onError, fallback } = props;
  if (!children) {
    raise(`The Suspense component must have children that return a promise.`);
  }
  fallback = fallback || (comment('nixix-fallback') as any);
  const [loading, setLoading] = callStore(
    {
      rejected: true,
    },
    { equals: true }
  );
  const commentBoundary = createBoundary(fallback as any, 'suspense');
  let resolvedJSX: typeof fallback | null = null;
  let liveFragment: LiveFragment = new LiveFragment(
    commentBoundary.firstChild!,
    commentBoundary.lastChild!
  );
  callReaction(
    function SuspenseEff() {
      liveFragment.replace(createFragment(resolvedJSX as any) as any);
    },
    [loading]
  );

  Promise.all(children!)
    ?.then((value) => {
      resolvedJSX = value;
      setLoading({
        rejected: false,
      });
    })
    ?.catch(() => {
      resolvedJSX = onError ? onError : fallback;
      onError && setLoading({ rejected: !loading.$$__value.rejected });
    });
  return commentBoundary;
}

function For(props: ForProps) {
  let { fallback, children, each } = props;
  let [callback] = children!;
  fallback = fallback || (comment('nixix-fallback') as any);
  children = arrayOfJSX(each, callback);
  const commentBoundary = createBoundary(
    children.length > 0 ? children : fallback,
    'for'
  );
  let liveFragment: LiveFragment = new LiveFragment(
    commentBoundary.firstChild!,
    commentBoundary.lastChild!
  );
  const removedNodes: any[] = [];
  callReaction(() => {
    const eachLen = each.$$__value.length;
    if (eachLen === 0) {
      removeNodes(eachLen, liveFragment, removedNodes);
      return liveFragment.replace(createFragment(fallback));
    } else {
      // @ts-expect-error
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
            liveFragment.appendChild(createFragment(removedNodes));
          removedNodes.length = 0;
        } else if (targetLength < eachLen) {
          Boolean(removedNodes.length) &&
            liveFragment.appendChild(createFragment(removedNodes));
          childnodesLength = liveFragment.childNodes.length; // 4
          if (childnodesLength === eachLen) return;
          const indexArray = numArray(childnodesLength, eachLen);
          children = getIncrementalNodes(indexArray, Store, each, callback);
          liveFragment.append(createFragment(children));
          nixixStore.Store?.[`_${each.$$__id}_`].cleanup?.();
        } else if (targetLength > eachLen) {
          // [<div class="text-blue-200" >, <div>, <div>, <div>]
          // [<div class="text-blue-200" >, <div>, ]
          const restoredNodes = removedNodes.splice(
            0,
            eachLen - childnodesLength
          );
          liveFragment.appendChild(createFragment(restoredNodes));
        }
      }
    }
  }, [each]);

  return commentBoundary;
}

function Show(props: ShowProps) {
  let { children, when, switch: signalSwitch, fallback } = props;
  fallback = createFragment(fallback || (comment('nixix-fallback') as any));
  children = createFragment(children);
  let bool = when();
  const show = getShow(bool, children, fallback);
  const commentBoundary = createBoundary(show, 'show');
  let liveFragment: LiveFragment = new LiveFragment(
    commentBoundary.firstChild!,
    commentBoundary.lastChild!
  );

  callReaction(() => {
    const newBool = when();
    switch (newBool) {
      case true:
        if (bool === true) return;
        fallback = liveFragment.childNodes;
        liveFragment.replace(createFragment(children));
        bool = newBool;
        break;
      case false:
        if (bool === false) return;
        children = liveFragment.childNodes;
        liveFragment.replace(createFragment(fallback));
        bool = newBool;
        break;
    }
  }, [signalSwitch]);

  return commentBoundary;
}

function asyncComponent(FC: () => Promise<JSX.Element>): any {
  return FC;
}

const lazy = asyncComponent;

export { For, Img, Show, Suspense, asyncComponent, lazy };
