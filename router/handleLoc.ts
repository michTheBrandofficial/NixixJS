import { createFragment } from "../dom/helpers";
import { nixixStore } from "../dom";
import type { EmptyObject } from "../types";
import { callLoader } from "./callLoader";
import { navigate } from "./Router";
import { isFunction } from "../shared";
import { buildComponent } from "../dom/index";

export function handleLocation() {
  const {
    $$__routeStore: { provider, routeMatch },
  } = nixixStore as Required<typeof nixixStore>;
  callLoader(routeMatch!).then((data) => {
    const { redirect } = nixixStore.$$__routeStore!;
    // if redirect, stop executing and navigate again;
    if (typeof redirect === "string") {
      nixixStore.$$__routeStore!.redirect = null;
      return navigate(redirect as `/${string}`);
    }
    switchRoutes({ provider, routeMatch, loaderData: data });
  });
}

export function switchRoutes({ provider, routeMatch, loaderData }: EmptyObject) {
  const route = routeMatch!.route;
  const element = route.element;
  switch (element) {
    case null:
    case undefined:
      break;
    default:
      nixixStore.$$__routeStore!.currentRoute! = route;
      let routePage: any;
      
      if (isFunction(element)) {
        routePage = buildComponent(element, {}, []);
        route.element = routePage
      } else routePage = element;
      provider?.replace(createFragment(routePage));
      break;
  }
}

export function changeTitle(title: string) {
  document.title = title;
}
