import { getSignalValue, getStoreValue } from '../dom/helpers';
import { Signal, Store } from '../primitives';

export function getWinPath() {
  return window.location.pathname;
}

export function pushState(path?: string) {
  window.history.pushState({}, '', path);
}

export function changeRouteComment(path: string, ...comments: Comment[]) {
  comments.forEach((c) => {
    c.textContent = `route-${path}`;
  });
}

export function isNull(val: any) {
  return val === null || val === undefined;
}

export function getLink(link: string | Store | Signal): string {
  switch (true) {
    case link instanceof Signal:
      return getSignalValue(link as Signal) as any;
    case link instanceof Store:
      return getStoreValue(link as Store) as any;
    default:
      return link as any;
  }
}

export function routePromise(path: string) {
  return new Promise<string>((resolve) => {
    resolve(path);
  });
}
