import { nixixStore } from '../index';

export default class NestedRoute {
  element: JSX.Element;
  constructor(element: JSX.Element, childRoutes: any[]) {
    this.element = element;
    childRoutes.forEach((childRoute) => {
      this[childRoute.path] = childRoute.element
    })
  }
}

export function changeRouteType(route: any, common?: true | false) {
  if (common) {
    if (route instanceof NestedRoute) {
      if (route.element instanceof Array) {
        nixixStore.$$__commonRouteProvider.replaceChildren(...route.element);
      } else {
        nixixStore.$$__commonRouteProvider.replaceChildren(route.element);
      }
    } else {
      if (route instanceof Array) {
        nixixStore.$$__commonRouteProvider.replaceChildren(...route);
      } else {
        nixixStore.$$__commonRouteProvider.replaceChildren(route);
      }
    }
  } else if (common === false) {
    if (route instanceof NestedRoute) {
      if (route.element instanceof Array) {
        nixixStore.$$__routeProvider.replaceChildren(...route.element);
      } else {
        nixixStore.$$__routeProvider.replaceChildren(route.element);
      }
    } else {
      if (route instanceof Array) {
        nixixStore.$$__routeProvider.replaceChildren(...route);
      } else {
        nixixStore.$$__routeProvider.replaceChildren(route);
      }
    }
  }
}

export function changeLocOnError(error?: boolean, routesObject?: {}): string {
  if (error) {
    window.history.pushState({}, null, routesObject['errorPage']['errorRoute']);
    return routesObject['errorPage']['errorRoute'];
  }
  window.history.pushState({}, null, '/');
  return '/';
}

export function changeNestedRoute(outlet:Element, routeElement: Element | Element[]) {
  if (!routeElement) {
    outlet.replaceChildren('');
  } else {
    if (routeElement instanceof Array) {
      outlet.replaceChildren(...routeElement)
    } else {
      outlet.replaceChildren(routeElement);
    }
  }
}