import type {
  AgnosticRouteMatch,
  AgnosticRouteObject,
} from "@remix-run/router";
import { nixixStore } from "../dom";
import { createFragment, createText, warn } from "../dom/helpers";
import { comment } from "../hoc/helpers";
import { LiveFragment } from "../live-fragment";
import { handleLocation } from "./handleLoc";
import { isNull } from "./helpers";

export type RouteStoreType = typeof nixixStore.$$__routeStore;

type RouteObject = { element: any; path: `/${string}` };

export function boundary(path?: `/${string}`) {
  const { commentForLF } = nixixStore;
  return commentForLF ? comment(`${path}`) : createText("");
}

export function createRouteBoundary({ element, path }: RouteObject) {
  const routeBoundary = createFragment([
    boundary(path),
    element,
    boundary(path),
  ]);
  return routeBoundary;
}

export function createRouteLF(routes: RouteStoreType, thisRoute: RouteObject) {
  const routeBoundary = createRouteBoundary(thisRoute as any);
  routes!.provider = new LiveFragment(
    routeBoundary.firstChild!,
    routeBoundary.lastChild!
  );
  return routeBoundary;
}

export function redirect(path: `/${string}`) {
  // check for the path;
  // run the browser router config again;
}

export type BrowserRouterConfig = {
  routes: RouteStoreType;
  routeMatches: any;
  popHandler: typeof handleLocation;
};
export function createBrowserRouter(config: BrowserRouterConfig) {
  const { routes, popHandler, routeMatches } = config;
  nixixStore.$$__routeStore = routes;
  window.onpopstate = popHandler;
  /**
   * route precedence
   * window path - 0;
   * callback() -> path - 1;
   * errorPage - 2
   */
  switch (true) {
    case routeMatches instanceof Array:
      const routeMatch: AgnosticRouteMatch<string, AgnosticRouteObject> =
        routeMatches[routeMatches.length - 1];
      if (!routeMatch) return [];
      routes!.currentRoute = routeMatch.route as any;
      return createRouteLF(routes, routeMatch.route as any);
    case isNull(routeMatches):
      const errorRoute = routes?.errorRoute!;
      if (isNull(errorRoute)) {
        warn(`Specify an not found route in your Routes component`);
        return [];
      }
      routes!.currentRoute = errorRoute;
      return createRouteLF(routes, errorRoute as any);
  }
}
