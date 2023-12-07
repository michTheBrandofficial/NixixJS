import { createFragment } from "../dom/helpers";
import { nixixStore } from "../dom";
import type { EmptyObject } from "../types";
import { callLoader } from "./callLoader";
import { navigate } from "./Router";

export function handleLocation() {
  const {
    $$__routeStore: { provider, routeMatch },
  } = nixixStore as Required<typeof nixixStore>;
  callLoader(routeMatch!)
  const { redirect } = nixixStore.$$__routeStore!
  // if redirect, stop executing and navigate again;
  if (typeof redirect === "string") {
    nixixStore.$$__routeStore!.redirect = null;
    return navigate(redirect as `/${string}`) 
  }
  switchRoutes({ provider, routeMatch });
}

export function switchRoutes({ provider, routeMatch }: EmptyObject) {
  const route = routeMatch!.route;
  const element = route.element;
  switch (element) {
    case null:
    case undefined:
      break;
    default:
      if (nixixStore.$$__routeStore?.currentRoute === route) return;
      nixixStore.$$__routeStore!.currentRoute!.element = createFragment(
        provider?.replace(element)
      );
      nixixStore.$$__routeStore!.currentRoute! = route;
      break;
  }
}
