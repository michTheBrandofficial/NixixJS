import { type MouseEvent } from "nixix-types/eventhandlers";
import Nixix, { nixixStore } from "../index.js";

export function Link({children, to}: { children: any; to: string; }) {

  function changeLocation(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const currentLocation = window.location.pathname;
    if (!nixixStore.$$__routeStore['common']) {
      nixixStore.$$__routeStore[currentLocation] = Array.from(nixixStore.$$__routeProvider.childNodes);
    } else {
      nixixStore.$$__routeStore[currentLocation] = Array.from(nixixStore.$$__commonRouteProvider.childNodes);
    }
    window.history.pushState({}, "", event.currentTarget.href);
    handleLocation();
  }
  return (
    Nixix.create('a', {href: to ? to : '/', 'on:click': changeLocation}, children)
  )
};

export const Router = {
  push:
  (path: string) =>  {
    function changeLocation() {
      const currentLocation = window.location.pathname;
      if (!nixixStore['$$__routeStore']['common']) {
        nixixStore['$$__routeStore'][currentLocation] = Array.from(nixixStore.$$__routeProvider.childNodes);
      } else {
        nixixStore['$$__routeStore'][currentLocation] = Array.from(nixixStore['$$__commonRouteProvider'].childNodes);
      }
      window.history.pushState({}, "", path);
      handleLocation();
    }

    changeLocation();
  }
} 

export function Routes({children}: { children: { element: JSX.Element; path: string; common?: boolean; errorPage?: boolean; }[]; }) {
  const routes = {};
  children.forEach(child => {
    if (child.path === null || child.path === undefined) { 
      child.path = '/'
    }
    routes[child.path] = child.element;
    if (child.common !== undefined && child.common !== null) {
      routes['common'] = true;
    }
    if (child.errorPage !== undefined && child.errorPage !== null) {
      routes['errorPage'] = {
        errorRoute: child.path
      };
    }
  });
  window['$$__NixixStore'].$$__routeStore = routes;
  window.onpopstate = handleLocation;
  function changeLocError(error?: boolean): string {
    if (error) {
      window.history.pushState({}, null, routes['errorPage']['errorRoute']);
      return routes['errorPage']['errorRoute'];
    }
    window.history.pushState({}, null, '/');
    return '/';
  }
  const loc = routes[window.location.pathname] ? window.location.pathname : (routes['errorPage'] ? changeLocError(true) : changeLocError());
  
  if (!routes['common']) {
    return routes[loc];
  } else {
    window['$$__NixixStore'].$$__commonRouteProvider = document.createElement('span');
    if (routes[loc] instanceof Array) {
      window['$$__NixixStore'].$$__commonRouteProvider.append(...routes[loc])
    } else {
      window['$$__NixixStore'].$$__commonRouteProvider.append(routes[loc])
    }
    return window['$$__NixixStore'].$$__commonRouteProvider
  }
}

export function Route({element, path, common, errorPage}: { element: JSX.Element; path: string; common?: boolean; errorPage?: {[id:string]:any}}) {
  if (common !== null && common !== undefined) {
    return errorPage ? {element, path, common, errorPage} : {element, path, common};
  } else {
    return errorPage ? {element, path, errorPage} : {element, path};
  };  
}

function handleLocation() {
  const path = window.location.pathname;
  const route = nixixStore.$$__routeStore[path] || null;
  if (!nixixStore.$$__routeStore['common']) {
    if (route instanceof Array) {
      nixixStore.$$__routeProvider.replaceChildren(...route);
    } else {
      nixixStore.$$__routeProvider.replaceChildren(route);
    }
  } else {
    if (route instanceof Array) {
      nixixStore.$$__commonRouteProvider.replaceChildren(...route);
    } else {
      nixixStore.$$__commonRouteProvider.replaceChildren(route);
    }
  }
}