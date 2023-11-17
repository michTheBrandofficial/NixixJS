import { createFragmentWithChildren, raise, warn } from '../dom/helpers';
import { comment } from '../hoc/helpers';
import Nixix, { nixixStore } from '../dom';
import { type MouseEvent } from '../types/eventhandlers';
import { EmptyObject } from '../types/index';
import NestedRoute, {
  changeRouteComment,
  getWinPath,
  isNull,
  pushState,
} from './helpers';
import { LiveFragment } from '../live-fragment';

type RouteStoreType = typeof nixixStore.$$__routeStore;

function createRouteBoundary(routes: RouteStoreType, path: string) {
  const routeBoundary = createFragmentWithChildren([
    comment(`route-${path}`),
    routes![path],
    comment(`route-${path}`),
  ]);
  return routeBoundary;
}

type BrowserRouterConfig = {
  routes: RouteStoreType;
  popHandler: typeof handleLocation;
  callback?: () => string;
};
export function createBrowserRouter(config: BrowserRouterConfig) {
  const { routes, popHandler, callback } = config;
  nixixStore.$$__routeStore = routes;
  window.onpopstate = popHandler;

  callback && pushState(callback() || '');
  /**
   * route precedence
   * window path - 0;
   * callback() -> path - 1;
   * errorPage - 2
   */
  const winPath = getWinPath();
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

export const Router = {
  push: (path: string) => {
    const currentLoc = getWinPath();
    const {
      $$__routeStore: { provider, ...rest },
    } = nixixStore as Required<typeof nixixStore>;
    rest![currentLoc] = provider!.childNodes;
    switch (path in rest) {
      case true:
        pushState(path);
        handleLocation();
        break;
      case false:
        if (rest.errorRoute) pushState(rest.errorRoute), handleLocation();
        break;
    }
  },
};

export function handleLocation() {
  const path = getWinPath();
  const {
    $$__routeStore: { provider, ...rest },
  } = nixixStore as Required<typeof nixixStore>;
  const element = rest![path];
  switch (element) {
    case null:
    case undefined:
      break;
    default:
      changeRouteComment(
        path,
        provider?.previousSibling,
        provider?.nextSibling
      );

      provider?.replace(element);
      break;
  }
}

// HOC

type RoutesProps = {
  children: {
    element: JSX.Element;
    path: string;
    errorRoute?: boolean;
    children?: any;
  }[];
  callback?: () => string;
};
export function Routes(props: RoutesProps) {
  if (!props) raise(`No props were passed to the Routes component`);
  const { children, callback } = props;
  const routes: RouteStoreType = {};
  children.forEach((child) => {
    if (isNull(child.path)) child.path = '/';
    if (isNull(child.errorRoute) === false) routes['errorRoute'] = child.path;

    routes[child.path] = child.element;
  });

  return createBrowserRouter({ routes, popHandler: handleLocation, callback });
}

type RouteProps = Omit<RoutesProps['children'][number], 'errorRoute'> & {
  errorPage?: EmptyObject;
};
export function Route(props: RouteProps) {
  if (!props) raise(`No props were passed to the Route component`);
  return props;
}

export function Link(props: { children: JSX.Element; to: string }) {
  const { children, to, ...rest } = props;
  function changeLocation(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    Router.push(to);
  }
  return Nixix.create(
    'a',
    { ...rest, href: to ? to : '/', 'on:click': changeLocation },
    children ? children : ''
  );
}
