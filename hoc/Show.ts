import { createFragment } from "../dom/helpers";
import { LiveFragment } from "../live-fragment";
import { callReaction } from "../primitives";
import { getShow, createBoundary, compFallback } from "./helpers";

export function Show(props: ShowProps) {
  let { children, when, switch: signalSwitch, fallback } = props;
  fallback = createFragment(fallback || (compFallback() as any));
  children = createFragment(children);
  let bool: boolean | null = when();
  const show = getShow(bool!, children, fallback);
  const commentBoundary = createBoundary(createFragment(show), "show");
  let liveFragment: LiveFragment = new LiveFragment(
    commentBoundary.firstChild!,
    commentBoundary.lastChild!
  );

  callReaction(function ShowEff() {
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
