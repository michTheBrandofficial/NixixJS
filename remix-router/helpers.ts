import { AgnosticRouteObject } from '@remix-run/router';
import { raise } from '../dom/helpers';

export function noProps(props: any, compName: string) {
  return !props && raise(`No props were passed to the ${compName} component`);
}

export function startsWithSlash(path?: string) {
  if (!path) return '';
  switch (path?.startsWith('/')) {
    case true:
      return path;
    case false:
      return `/${path}`;
  }
}

export function prependParentPaths(
  routeObjs: AgnosticRouteObject[],
  parentPath?: string
) {
  routeObjs.forEach((routeObj) => {
    parentPath &&
      (routeObj.path = `${startsWithSlash(parentPath)}${startsWithSlash(
        routeObj.path!
      )}`);
    routeObj.children && prependParentPaths(routeObj.children, routeObj.path);
  });
  return routeObjs;
}
