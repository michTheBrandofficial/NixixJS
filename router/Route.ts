import { raise } from '../dom/helpers';
import { EmptyObject } from '../types';
import { RouteStoreType, createBrowserRouter } from './creatRoute';
import { handleLocation } from './handleLoc';
import { isNull } from './helpers';
import { PathToRoute } from './types/index';

type RoutesProps = {
  children: {
    element: JSX.Element;
    path: string;
    errorRoute?: boolean;
    children?: any;
    protect?: () => Promise<PathToRoute | undefined>;
  }[];
};
export function Routes(props: RoutesProps) {
  if (!props) raise(`No props were passed to the Routes component`);
  const { children } = props;
  const routes: RouteStoreType = {};
  children.forEach((child) => {
    if (isNull(child.path)) child.path = '/';
    if (isNull(child.errorRoute) === false) routes['errorRoute'] = child.path;

    let route: any = { element: child.element };
    child.protect && (route.protect = child.protect);
    routes[child.path] = route;
  });

  return createBrowserRouter({ routes, popHandler: handleLocation });
}

type RouteProps = Omit<RoutesProps['children'][number], 'errorRoute'> & {
  errorPage?: EmptyObject;
};
export function Route(props: RouteProps) {
  if (!props) raise(`No props were passed to the Route component`);
  return props;
}
