import { nixixStore } from "../dom";
import { createFragment, createText } from "../dom/helpers";
import { comment } from "../hoc/helpers";
import { LiveFragment } from "../live-fragment";
import { getWinPath } from "./helpers";
import { effect } from "../primitives";
import { navigate } from "./Router";

export type RouteStoreType = typeof nixixStore.$$__routeStore;

type RouteObject = { element: any; path: `/${string}` };

export function boundary(path?: `/${string}`) {
  const { commentForLF } = nixixStore;
  return commentForLF ? comment(`${path}`) : createText("");
}

export function createRouteBoundary() {
  const routeBoundary = createFragment([
    boundary(),
    boundary(),
  ]);
  return routeBoundary;
}

export function createRouteLF(routes: RouteStoreType, thisRoute?: RouteObject) {
  const routeBoundary = createRouteBoundary();
  routes!.provider = new LiveFragment(
    routeBoundary.firstChild!,
    routeBoundary.lastChild!
  );
  return routeBoundary;
}

export function popHandler() {
  navigate(getWinPath() as `/${string}`);
}

export type BrowserRouterConfig = {
  routes: RouteStoreType;
};
export function createBrowserRouter(config: BrowserRouterConfig) {
  const { routes } = config;
  nixixStore.$$__routeStore = routes;
  window.onpopstate = popHandler;
  effect(popHandler, "once");
  return createRouteLF(routes);
}
