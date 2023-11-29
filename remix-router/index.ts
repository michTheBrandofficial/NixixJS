import {
  createBrowserHistory,
  createRouter,
  type AgnosticRouteObject,
  matchRoutes,
} from '@remix-run/router';
import { noProps, prependParentPaths } from './helpers';

type RoutesProps = {
  children: AgnosticRouteObject[];
};
export function Routes(props: RoutesProps) {
  noProps(props, 'Routes');
  let { children } = props;
  children = prependParentPaths(children);
  const router = createRouter({
    history: createBrowserHistory(),
    window,
    routes: children,
  }).initialize();
  console.log(
    matchRoutes(children, {
      pathname: '/products/clothes',
    })
  );

  return 'Yay routes work';
}

type RouteProps = AgnosticRouteObject;
export function Route(props: RouteProps) {
  noProps(props, 'Route');
  return props;
}
