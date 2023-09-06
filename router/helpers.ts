import { nixixStore } from '../dom';

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
        if (route === null || route === undefined) {
          // if route equals to null, then show an errorPage.
          const routeStore = nixixStore.$$__routeStore;
          const errorPage = routeStore.errorPage;
          const pageToShow = errorPage ? (routeStore[errorPage.errorRoute]) : '404 Not Found';
          const commonProvider = nixixStore.$$__commonRouteProvider;

          pageToShow instanceof Array ? commonProvider.replaceChildren(...pageToShow) : commonProvider.replaceChildren(pageToShow);
          return 
        }
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
        if (route === null || route === undefined) {
          // if route equals to null, then show an errorPage.
          const routeStore = nixixStore.$$__routeStore;
          const errorPage = routeStore.errorPage;
          const pageToShow = errorPage ? (routeStore[errorPage.errorRoute]) : '404 Not Found';
          const provider = nixixStore.$$__routeProvider;

          pageToShow instanceof Array ? provider.replaceChildren(...pageToShow) : provider.replaceChildren(pageToShow);
          return 
        }
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