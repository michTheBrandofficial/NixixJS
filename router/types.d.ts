export {}
declare global {
  interface Window {
    $$__routeStore: {
      [path: string]: string | Node | (string | Node)[];
    }
    $$__routeProvider: Element;
    $$__commonRouteProvider: HTMLSpanElement;
  }
  var window: Window & typeof globalThis;
}
