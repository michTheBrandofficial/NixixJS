import { createFragment } from "../dom/helpers";
import { LiveFragment } from "../live-fragment";
import { callEffect, callReaction, Store } from "../primitives";
import {
  arrayOfJSX,
  createBoundary,
  removeNodes,
  numArray,
  getIncrementalNodes,
  compFallback,
} from "./helpers";

export function Index(props: ForProps) {
  let { fallback, children, each } = props;
  let [callback] = children!;
  fallback = fallback || (compFallback() as any);
  // create the children on the resolve immediate, because arr.map may access arr.length and return a signal which is not wanted.

  const commentBoundary = createBoundary("", "index");
  let liveFragment: LiveFragment = new LiveFragment(
    commentBoundary.firstChild!,
    commentBoundary.lastChild!
  );
  callEffect(() => {
    children = arrayOfJSX(each, callback);
    liveFragment.replace(createFragment(children));
  });
  const removedNodes: any[] = [];

  callReaction(() => {
    const eachLen = each.length;
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
          children = getIncrementalNodes(indexArray, each, callback);
          liveFragment.append(createFragment(children));
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
  