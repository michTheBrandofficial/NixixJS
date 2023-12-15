import { createFragment } from "../dom/helpers";
import { LiveFragment } from "../live-fragment";
import { callEffect, callReaction } from "../primitives";
import { getShow, createBoundary, compFallback } from "./helpers";

export function Show(props: ShowProps) {
  let { children, when, switch: signalSwitch, fallback } = props;
  fallback = createFragment(fallback || (compFallback() as any));
  children = createFragment(children);
  const commentBoundary = createBoundary("", "show");
  let bool: boolean | null = null;
  let liveFragment: LiveFragment = new LiveFragment(
    commentBoundary.firstChild!,
    commentBoundary.lastChild!
  );
  callEffect(() => {
    bool = when();
    const show = getShow(bool!, children, fallback);
    liveFragment.replace(createFragment(show));
  });

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
