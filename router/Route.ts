import { raise, warn } from "../dom/helpers";
import { RouteStoreType, createBrowserRouter } from "./createRoute";
import {
  forEach,
  getWinPath,
  isNull,
  startsWithSlash,
  trimTrailingSlash,
} from "./helpers";
import { agnosticRouteObjects } from "./utils";
import { navigate } from "./Router";
import type { LoaderFunction, ActionFunction } from "./types/index";
import type { EmptyObject } from "../types";
import { callStore } from "../primitives";
import { nixixStore } from "../dom/index";
import { ActionDataHandler } from "./callAction";

type AgnosticRouteProps = {
  element: JSX.Element;
  path: string;
  errorRoute?: boolean;
  action?: ActionFunction<Promise<any>>;
  loader?: LoaderFunction;
};

/**
 * For a specific route, an action function can be defined.
 * "/movies"
 * When a form is submitted to that route with data, we check if the action attr is a route match -> get the route match and get the action of the route, call it with props 
 * 
 * each `actionData` call should drop it's path to see if it matches with the routes in question.
 * 
 * path -> action `/movies/:id`
 * 
 * Form action=`/movies/new`
 * actionData(`/movies/new`);
 */

export function popHandler() {
  navigate(getWinPath() as `/${string}`);
}

export function configLoaderAndAction({ route }: { route: EmptyObject }) {
  route.action && ActionDataHandler.addActionRoute(route.path);
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

    let route = {
      element: child.element,
      path: child.path,
      loader: child.loader,
      action: child.action,
    } as const;
    configLoaderAndAction({ route });
    isNull(child.errorRoute) === false &&
      (config.routes!["errorRoute"] = route as any);
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
  viewTransitions?: boolean;
};
export function Routes(props: RoutesProps) {
  if (!props) raise(`No props were passed to the Routes component`);
  const { children, viewTransitions } = props;
  nixixStore.viewTransitions = viewTransitions;
  const routes: RouteStoreType = {
    routeMatch: {} as any,
    // current route will be the route that we get first and changes when we switch routes successfully
    currentRoute: {},
  };
  buildRoutes({ children, routes });

  return createBrowserRouter({
    routes,
  });
}

type RouteProps = AgnosticRouteProps & { children?: AgnosticRouteProps };
export function Route(props: RouteProps) {
  if (!props) raise(`No props were passed to the Route component`);
  if (typeof props?.element !== 'function') warn(`Child <Form> components and other functionality may not work. <Route> element prop should be a function that returns JSX.`);
  else return props;
}
