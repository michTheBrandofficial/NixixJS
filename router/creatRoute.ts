import { nixixStore } from '../dom';
import { createFragment, warn } from '../dom/helpers';
import { comment } from '../hoc/helpers';
import { LiveFragment } from '../live-fragment';
import { handleLocation } from './handleLoc';
import { getWinPath, pushState } from './helpers';

export type RouteStoreType = typeof nixixStore.$$__routeStore;

export function createRouteBoundary(routes: RouteStoreType, path: string) {
  const routeBoundary = createFragment([
    comment(`route-${path}`),
    routes![path].element,
    comment(`route-${path}`),
  ]);
  return routeBoundary;
}

export type BrowserRouterConfig = {
  routes: RouteStoreType;
  popHandler: typeof handleLocation;
};
export function createBrowserRouter(config: BrowserRouterConfig) {
  const { routes, popHandler } = config;
  nixixStore.$$__routeStore = routes;
  window.onpopstate = popHandler;

  /**
   * route precedence
   * window path - 0;
   * callback() -> path - 1;
   * errorPage - 2
   */
  let winPath = getWinPath();
  switch (winPath in routes!) {
    case true:
      const routeBoundary = createRouteBoundary(routes, winPath);
      const LF = new LiveFragment(
        routeBoundary.firstChild!,
        routeBoundary.lastChild!
      );
      routes!.provider = LF;
      return routeBoundary;
    case false:
      const errorPath = routes?.errorRoute!;
      switch (errorPath) {
        case null:
        case undefined:
          warn(`Specify an errorRoute in your Routes component`);
          return [];
        default:
          pushState(errorPath);
          const routeBoundary = createRouteBoundary(routes, errorPath);
          const LF = new LiveFragment(
            routeBoundary.firstChild!,
            routeBoundary.lastChild!
          );
          routes!.provider = LF;
          return routeBoundary;
      }
  }
}
