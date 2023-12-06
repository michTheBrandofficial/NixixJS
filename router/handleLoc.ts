import { createFragment } from '../dom/helpers';
import { nixixStore } from '../dom';
import { getWinPath, changeRouteComment } from './helpers';

export function handleLocation() {
  const path = getWinPath();
  const {
    $$__routeStore: { provider, routeMatch },
    commentForLF
  } = nixixStore as Required<typeof nixixStore>;
  
  const route = routeMatch!.route;
  const element = route.element;
  switch (element) {
    case null:
    case undefined:
      break;
    default:
      if (nixixStore.$$__routeStore?.currentRoute === route) return;
      nixixStore.$$__routeStore!.currentRoute!.element = createFragment(provider?.replace(element));
      nixixStore.$$__routeStore!.currentRoute! = route;
      commentForLF && changeRouteComment(
        path,
        provider?.previousSibling,
        provider?.nextSibling
      );
      break;
  }
}
