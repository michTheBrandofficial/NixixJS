import { matchRoutes } from "@remix-run/router";
import { raise } from "../dom/helpers";
import { RouteStoreType, createBrowserRouter } from "./createRoute";
import {
  forEach,
  getWinPath,
  isNull,
  startsWithSlash,
  trimTrailingSlash,
} from "./helpers";
import { agnosticRouteObjects } from "./utils";
import { Router } from "./Router";
import type { LoaderFunction, ActionFunction } from "./types/index";
import changeRouteMatches from "./routeMatches";

type AgnosticRouteProps = {
  element: JSX.Element;
  path: string;
  errorRoute?: boolean;
  action?: ActionFunction;
  loader?: LoaderFunction;
};

export function popHandler() {
  Router.push(getWinPath());
}

type BuildRouteConfig = {
  routes: RouteStoreType;
  children: RoutesProps["children"];
  parentPath?: `/${string}`;
};
export function buildRoutes(config: BuildRouteConfig) {
  const { parentPath, children, routes } = config;
  forEach(children, (child) => {
    // if no path, check if parentPath else set to '/'
    isNull(child.path)
      ? (child.path = "/")
      : parentPath &&
        (child.path = `${trimTrailingSlash(
          startsWithSlash(parentPath)
        )}${startsWithSlash(child.path)}`);

    let route: any = {
      element: child.element,
      path: child.path,
      loader: child.loader,
      action: child.action,
    };

    isNull(child.errorRoute) === false &&
      (config.routes!["errorRoute"] = route);
    agnosticRouteObjects.push(route);
    child.children &&
      buildRoutes({
        routes,
        children: child.children,
        parentPath: child.path as `/${string}`,
      });
  });
}

type RoutesProps = {
  children: (AgnosticRouteProps & { children?: AgnosticRouteProps[] })[];
};
export function Routes(props: RoutesProps) {
  if (!props) raise(`No props were passed to the Routes component`);
  const { children } = props;
  const routes: RouteStoreType = {
    routeMatch: {} as any,
    // current route will be the route that get first and changes when we switch routes successfully
    currentRoute: {},
  };
  buildRoutes({ children, routes });
  let routeMatches = changeRouteMatches(
    matchRoutes(agnosticRouteObjects as any, {
      pathname: getWinPath(),
    })
  );

  return createBrowserRouter({
    routes,
    routeMatches,
    popHandler,
  });
}

type RouteProps = AgnosticRouteProps & { children?: AgnosticRouteProps };
export function Route(props: RouteProps) {
  if (!props) raise(`No props were passed to the Route component`);
  return props;
}
