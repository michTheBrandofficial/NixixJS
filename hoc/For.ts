import { createFragment } from "../dom/helpers";
import { LiveFragment } from "../live-fragment";
import { callReaction } from "../primitives";
import {
  arrayOfJSX,
  createBoundary,
  removeNodes,
  numArray,
  getIncrementalNodes,
  compFallback,
} from "./helpers";

export function For(props: ForProps) {
  let { fallback, children, each } = props;
  let [callback] = children!;
  fallback = fallback || (compFallback() as any);
  children = arrayOfJSX(each, callback);
  const commentBoundary = createBoundary(createFragment(children), "for");
  const liveFragment: LiveFragment = new LiveFragment(
    commentBoundary.firstChild!,
    commentBoundary.lastChild!
  );

  callReaction(function ForEff() {
    const eachLen = each.length;
    if (eachLen === 0) {
      return liveFragment.replace(
        (removeNodes(eachLen, liveFragment), createFragment(fallback))
      );
    } else {
      if (fallback?.[0]?.isConnected || (fallback as Element)?.isConnected) {
        liveFragment.empty();
      }
      let childnodesLength = liveFragment.childNodes.length;
      if (childnodesLength === eachLen) return;
      if (childnodesLength > eachLen) {
        removeNodes(eachLen, liveFragment);
      } else if (childnodesLength < eachLen) {
        // nodes -> 3, eachLen -> 6 --> create new nodes and append
        const indexArray = numArray(childnodesLength, eachLen);
        children = getIncrementalNodes(indexArray, each, callback);
        liveFragment.append(createFragment(children));
      }
    }
  }, [each]);

  return commentBoundary;
}
