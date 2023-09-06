import { type HTMLAttributes } from '../types/index';
import { type MouseEvent } from '../types/eventhandlers';
import Nixix, { nixixStore } from '../dom';
import NestedRoute, {
  changeLocOnError,
  changeNestedRoute,
  changeRouteType,
} from './helpers';

// Fix the errorPage
export function Link(props: {children: JSX.Element, to: string}) {
  const { children, to, ...rest } = props
  function changeLocation(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const currentLocation =
      window.location.pathname
        .split('/')
        .filter((str) => str !== '')
        .map((str) => {
          return '/' + str;
        })[0] || '/';

    if (!(nixixStore.$$__routeStore[currentLocation] instanceof NestedRoute)) {
      if (!nixixStore.$$__routeStore['common']) {
        nixixStore.$$__routeStore[currentLocation] = Array.from(
          nixixStore.$$__routeProvider.childNodes
        );
      } else {
        nixixStore.$$__routeStore[currentLocation] = Array.from(
          nixixStore.$$__commonRouteProvider.childNodes
        );
      }
    }

    window.history.pushState({}, '', event.currentTarget.href);
    handleLocation();
  }
  return Nixix.create(
    'a',
    { ...rest, href: to ? to : '/', 'on:click': changeLocation },
    children ? children : ''
  );
}

export const Router = {
  push: (path: string) => {
    function changeLocation() {
      const currentLocation = window.location.pathname;
      if (!nixixStore['$$__routeStore']['common']) {
        nixixStore['$$__routeStore'][currentLocation] = Array.from(
          nixixStore.$$__routeProvider.childNodes
        );
      } else {
        nixixStore['$$__routeStore'][currentLocation] = Array.from(
          nixixStore['$$__commonRouteProvider'].childNodes
        );
      }
      window.history.pushState({}, '', path);
      handleLocation();
    }

    changeLocation();
  },
};

export function Routes({
  children,
  callback,
}: {
  children: {
    element: JSX.Element;
    path: string;
    common?: boolean;
    errorPage?: boolean;
    children?: any;
  }[];
  callback?: () => string;
}) {
  const routes = {};
  children.forEach((child) => {
    if (child.path === null || child.path === undefined) {
      child.path = '/';
    }
    routes[child.path] = child.element;
    if (child.common !== undefined && child.common !== null) {
      routes['common'] = true;
    }
    if (child.errorPage !== undefined && child.errorPage !== null) {
      routes['errorPage'] = {
        errorRoute: child.path,
      };
    }

    if (child.children) {
      routes[child.path] = new NestedRoute(child.element, child.children);
    }
  });
  nixixStore.$$__routeStore = routes;
  window.onpopstate = handleLocation;

  let callbackValue = callback ? callback() : null;
  callbackValue ? window.history.pushState({}, null, callbackValue) : null;

  const loc = routes[window.location.pathname]
    ? window.location.pathname
    : routes['errorPage']
    ? changeLocOnError(true, routes)
    : changeLocOnError(false, routes);

  if (!routes['common']) {
    if (routes[loc] instanceof NestedRoute) {
      return routes[loc].element;
    } else {
      return routes[loc];
    }
  } else {
    window['$$__NixixStore'].$$__commonRouteProvider =
      document.createElement('span');
    if (routes[loc] instanceof NestedRoute) {
      if (routes[loc].element instanceof Array) {
        window['$$__NixixStore'].$$__commonRouteProvider.append(
          ...routes[loc].element
        );
      } else {
        window['$$__NixixStore'].$$__commonRouteProvider.append(
          routes[loc].element
        );
      }
    } else {
      if (routes[loc] instanceof Array) {
        window['$$__NixixStore'].$$__commonRouteProvider.append(...routes[loc]);
      } else {
        window['$$__NixixStore'].$$__commonRouteProvider.append(routes[loc]);
      }
    }
    return window['$$__NixixStore'].$$__commonRouteProvider;
  }
}

export function Route({
  element,
  path,
  common,
  errorPage,
  children,
}: {
  element: JSX.Element;
  path: string;
  common?: boolean;
  errorPage?: { [id: string]: any };
  children?: any;
}) {
  if (common !== null && common !== undefined) {
    if (errorPage) {
      if (children) {
        return { element, path, common, errorPage, children };
      } else {
        return { element, path, common, errorPage };
      }
    } else {
      if (children) {
        return { element, path, common, children };
      } else {
        return { element, path, common };
      }
    }
  } else {
    if (errorPage) {
      if (children) {
        return { element, path, errorPage, children };
      } else {
        return { element, path, errorPage };
      }
    } else {
      if (children) {
        return { element, path, children };
      } else {
        return { element, path };
      }
    }
  }
}

export function Outlet(props?: HTMLAttributes<HTMLSpanElement>) {
  let newProps = null;
  if (props) {
    if (props.className) {
      props = { ...props, className: 'Nixix__Outlet ' + props.className };
    } else {
      props = { ...props, className: 'Nixix__Outlet' };
    }
    newProps = props;
  } else {
    newProps = { className: 'Nixix__Outlet' };
  }
  return Nixix.create('span', newProps);
}

export function handleLocation() {
  const path = window.location.pathname;
  const nestedPath = path
    .split('/')
    .filter((str) => str !== '')
    .map((str) => {
      return '/' + str;
    });

  const routeElement =
    nixixStore.$$__routeStore[
      nestedPath.length !== 0 ? nestedPath.shift() : path
    ] || null;
  if (nixixStore.$$__routeStore['common']) {
    changeRouteType(routeElement, true);
  } else {
    changeRouteType(routeElement, false);
  }

  if (routeElement instanceof NestedRoute) {
    const routeObjKeysWithoutElement = Object.keys(routeElement).filter(
      (key) => key !== 'element'
    );
    let routeElementObjWithoutElement = {};

    routeObjKeysWithoutElement.forEach((key) => {
      routeElementObjWithoutElement[key] = routeElement[key];
    });


    if (routeElement.element instanceof Array) {
      throw 'Nested Routes must have one parent element';
    }

    // outlet compoenent
    const Outlet = (
      routeElement.element as unknown as HTMLElement
    ).querySelector('.Nixix__Outlet');

    if (nestedPath.length === 0) {
      const nestedRouteElement =
        routeElementObjWithoutElement[nestedPath.shift()];

      changeNestedRoute(Outlet, nestedRouteElement);
    } else {
      const nestedRouteElement =
        routeElementObjWithoutElement[nestedPath.shift()];

      const dynamicId = routeObjKeysWithoutElement.find((value) => {
        return value[1] === ':';
      });

      changeNestedRoute(
        Outlet,
        nestedRouteElement
          ? nestedRouteElement
          : (dynamicId ? routeElementObjWithoutElement[dynamicId] : '') 
      );
    }
  }
}
