import { getSignalValue } from "../dom/helpers";
import { Signal, Store } from "../primitives/classes";

export function getWinPath() {
  return window.location.pathname;
}

export function len(val: string | Array<any>) {
  return val.length;
}

export function trimTrailingSlash(str: string) {
  return str ? (str.endsWith("/") ? str.slice(0, len(str) - 1) : str) : "";
}

export function startsWithSlash(path?: string) {
  if (!path) return "";
  switch (path?.startsWith("/")) {
    case true:
      return path;
    case false:
      return `/${path}`;
  }
}

export function pushState(path?: string) {
  window.history.pushState({}, "", path);
}

export function changeRouteComment(path: string, ...comments: Comment[]) {
  comments.forEach((c) => {
    c.textContent = `${path}`;
  });
}

export function lastElement<T>(arr: T[]): T {
  return arr?.[len(arr) - 1];
}

export function isNull(val: any) {
  return val === null || val === undefined;
}

export function getLink(link: string | Store | Signal): string {
  switch (true) {
    // @ts-expect-error
    case link.$$__reactive:
      return getSignalValue(link as Signal) as any;
    default:
      return link as any;
  }
}

type ForEachParams<T> = Parameters<Array<T>["forEach"]>;

/**
 * Returns void, to be used when you want to mutate some outside code in an array
 */
export function forEach<T>(
  arr: Array<T>,
  cb: ForEachParams<T>[0],
  thisArg?: ForEachParams<T>[1]
) {
  arr?.forEach(cb, thisArg);
}

export function routePromise(path: string) {
  return new Promise<string>((resolve) => {
    resolve(path);
  });
}
