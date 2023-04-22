export {}
declare global {
  interface Window {
    $$__routeStore: {
      [path: any]: string | Node | (string | Node)[];
    }
    $$__routeProvider: Element;
    $$__commonRouteProvider: Element;
  }
  var window: Window;
}
