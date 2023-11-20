import { nixixStore } from '../dom';
import { getWinPath, changeRouteComment } from './helpers';

export function handleLocation() {
  const path = getWinPath();
  const {
    $$__routeStore: { provider, ...rest },
  } = nixixStore as Required<typeof nixixStore>;
  const route = rest![path];
  switch (route.element) {
    case null:
    case undefined:
      break;
    default:
      changeRouteComment(
        path,
        provider?.previousSibling,
        provider?.nextSibling
      );

      provider?.replace(route.element);
      break;
  }
}
