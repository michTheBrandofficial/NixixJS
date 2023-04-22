/** 
 * @typedef {import('../types').MutableRefObject} MutableRefObject
*/

/**
 * @typedef {import('nixix-types').NixixNode<any>} NixixNode
 * @param {NixixNode} element 
 * @param {HTMLElement} root 
 */
export function render(element, root) {
  if (!Array.isArray(element)) {
    // @ts-ignore
    root.append(element);
  } else {
    element.forEach(el => {
      render(el, root)
    })
  }
  doBgWork(root);
}

async function doBgWork(root) {
  await Promise.resolve();
  window.history.pushState({}, "", '/');
  window['$$__routeProvider'] = root;
}

/**
 * @template {Element & null} R 
 * @param {R} ref 
 * @returns {MutableRefObject}
 */
export function callRef(ref) {
  if (window['refCount'] === undefined) {
    window['refCount'] = 0;
  } else if (window['refCount'] != undefined) {
    window['refCount']  = window['refCount']  + 1;
  }
  return { 
    // @ts-ignore
    current: {}, 
    refId: window['refCount'],
    nextElementSibling: ref,
    prevElementSibling: ref,
    parent: ref ? ref : null
  };
}
