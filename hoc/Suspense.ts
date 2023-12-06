import { raise, createFragment } from "../dom/helpers";
import { LiveFragment } from "../live-fragment";
import { callStore, callReaction } from "../primitives";
import { compFallback, createBoundary } from "./helpers";

export function Suspense(props: SuspenseProps) {
  let { children, onError, fallback } = props;
  if (!children) {
    raise(`The Suspense component must have children that return a promise.`);
  }
  fallback = fallback || (compFallback() as any);
  const [loading, setLoading] = callStore(
    {
      rejected: true,
    },
    { equals: true }
  );
  const commentBoundary = createBoundary(fallback as any, "suspense");
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
