import { handleLocation } from './handleLoc';
import { nixixStore } from '../dom';
import { getLink, getWinPath, pushState } from './helpers';

export const Router = {
  push: (path: string) => {
    const currentLoc = getWinPath();
    const {
      $$__routeStore: { provider, ...rest },
    } = nixixStore as Required<typeof nixixStore>;
    rest![currentLoc] = provider!.childNodes;
    path = getLink(path);
    switch (path in rest) {
      case true:
        pushState(path);
        handleLocation();
        break;
      case false:
        if (rest.errorRoute) pushState(rest.errorRoute), handleLocation();
        break;
    }
  },
};

export const callRouter = () => {
  return Router;
};
