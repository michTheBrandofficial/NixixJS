export {}
declare global {
  interface Window {
    $$__routeStore: {
      [path: string]: string | Node | (string | Node)[];
    }
  }
  var window: Window & typeof globalThis;
}
