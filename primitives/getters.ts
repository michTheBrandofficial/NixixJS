import { nixixStore } from "../index";

export function render(element: NixixNode, root: HTMLElement) {
  if (!Array.isArray(element)) {
    root.append(element);
  } else {
    element.forEach(el => {
      render(el, root)
    })
  }
  doBgWork(root);
}

async function doBgWork(root: Element) {
  await Promise.resolve();
  nixixStore['$$__routeProvider'] = root;
}

export function callRef<R extends Element | HTMLElement>(ref: R): MutableRefObject {
  if (nixixStore['refCount'] === undefined) {
    nixixStore['refCount'] = 0;
  } else if (nixixStore['refCount'] != undefined) {
    nixixStore['refCount']  = nixixStore['refCount']  + 1;
  }
  return { 
    current: {} as Current, 
    refId: nixixStore['refCount'],
    nextElementSibling: ref,
    prevElementSibling: ref,
    parent: ref ? ref as HTMLElement : null
  };
}
