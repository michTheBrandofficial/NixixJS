import Nixix from "../index.js";

const myWindow = window;

/**
 * 
 * @param {{children: any, to: string}} param0 
 */
export function Link({children, to}) {
  /**
   * @typedef {import('nixix-types/eventhandlers.js').MouseEvent<HTMLAnchorElement>} MouseEvent
   * @param {MouseEvent} event 
   */
  function changeLocation(event) {
    event.preventDefault();
    const currentLocation = myWindow.location.pathname;
    if (!window.$$__routeStore['common']) {
      myWindow.$$__routeStore[currentLocation] = Array.from(myWindow.$$__routeProvider.childNodes);
    } else {
      myWindow.$$__routeStore[currentLocation] = Array.from(myWindow.$$__commonRouteProvider.childNodes);
    }
    myWindow.history.pushState({}, "", event.currentTarget.href);
    handleLocation();
  }
  return (
    // @ts-ignore
    Nixix.create('a', {href: to ? to : '/', 'on:click': changeLocation}, children)
  )
};

export const Router = {
  push:
  /**
   * 
   * @param {string} path 
   */ 
  (path) =>  {
    function changeLocation() {
      const currentLocation = window.location.pathname;
      if (!window['$$__routeStore']['common']) {
        window['$$__routeStore'][currentLocation] = Array.from(window.$$__routeProvider.childNodes);
      } else {
        window['$$__routeStore'][currentLocation] = Array.from(window['$$__commonRouteProvider'].childNodes);
      }
      window.history.pushState({}, "", path);
      handleLocation();
    }

    changeLocation();
  }
} 

/**
 * 
 * @param {{children: {element: JSX.Element, path: string, common?: boolean}[]}} param0 
 */
export function Routes({children}) {
  const routes = {};
  children.forEach(child => {
    if (child.path === null || child.path === undefined) { 
      child.path = '/'
    }
    routes[child.path] = child.element;
    if (child.common !== undefined && child.common !== null) {
      routes['common'] = true;
    }
  });
  myWindow.$$__routeStore = routes;
  myWindow.onpopstate = handleLocation;
  if (!routes['common']) {
    return routes['/'];
  } else {
    window.$$__commonRouteProvider = document.createElement('span');
    if (routes['/'] instanceof Array) {
      window.$$__commonRouteProvider.append(...routes['/'])
    } else {
      window.$$__commonRouteProvider.append(routes['/'])
    }
    return window.$$__commonRouteProvider
  }
}

/**
 * 
 * @param {{element: JSX.Element, path: string, common?: boolean}} param0 
 */
export function Route({element, path, common}) {
  if (common !== null && common !== undefined) {
    return {element, path, common};
  } else {
    return {element, path};
  };  
}

function handleLocation() {
  const path = myWindow.location.pathname;
  const route = myWindow.$$__routeStore[path] || null;
  if (!window.$$__routeStore['common']) {
    if (route instanceof Array) {
      window.$$__routeProvider.replaceChildren(...route);
    } else {
      window.$$__routeProvider.replaceChildren(route);
    }
  } else {
    if (route instanceof Array) {
      window.$$__commonRouteProvider.replaceChildren(...route);
    } else {
      window.$$__commonRouteProvider.replaceChildren(route);
    }
  }
}