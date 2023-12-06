import { handleLocation } from "./handleLoc";
import { nixixStore } from "../dom";
import { getLink, isNull, pushState } from "./helpers";
import { agnosticRouteObjects } from "./utils";
import {
  AgnosticRouteMatch,
  AgnosticRouteObject,
  matchRoutes,
} from "@remix-run/router";
import { warn } from "dom/helpers";

export const Router = {
  push: (path: string) => {
    let { $$__routeStore } = nixixStore as Required<typeof nixixStore>;
    path = getLink(path);
    const routeMatches = matchRoutes(agnosticRouteObjects, {
      pathname: path,
    })!;
    // this function works with handleLocation
    switch (true) {
      case routeMatches instanceof Array:
        const routeMatch: AgnosticRouteMatch<string, AgnosticRouteObject> =
          routeMatches[routeMatches.length - 1];
        pushState(path);
        nixixStore.$$__routeStore!.routeMatch = routeMatch as any;
        handleLocation();
        break;
      case isNull(routeMatches):
        const errorRoute = $$__routeStore?.errorRoute!;
        if (isNull(errorRoute)) {
          return warn(`Specify an not found route in your Routes component`);
        }
        if (errorRoute)
          pushState(errorRoute.path),
            (nixixStore.$$__routeStore!.routeMatch!.route = errorRoute),
            handleLocation();
        break;
    }
  },
};

export const callRouter = () => {
  return {
    router: Router
  };
};
