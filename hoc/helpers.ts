import { LiveFragment } from '../live-fragment/types';

export function comment(str: string) {
  return document.createComment(str);
}

export function indexes(arr: Array<any>) {
  return [arr[0], arr[arr.length - 1]];
}

export function createBoundary(
  values: Array<any>,
  commentName: 'suspense' | 'for' | 'show'
): [Comment, ...any[], Comment] {
  return [
    comment(`nixix-${commentName}`),
    ...values,
    comment(`nixix-${commentName}`),
  ];
}

export function numArray(start: number, end: number) {
  const arr = [];
  for (let index = start; index < end; index++) {
    arr.push(index);
  }
  return arr;
}

export function arrayOfJSX(each: any, callback: any) {
  const array = each.$$__value;
  return array.map((_, i) => {
    return callback(each, i) as any;
  });
}

export function checkLength(array: any[]) {
  return array.length === 0 ? false : array;
}

export function arrayToDF(element: SuspenseProps['fallback']) {
  const DF = new DocumentFragment();
  DF.append(...(element as any));
  return DF;
}

export function isArray(el: any) {
  return Array.isArray(el);
}

export function flatten(arr: Array<any>) {
  return arr.flat(1);
}

export function getShow(when: ShowProps['when'], children: any, fallback: any) {
  return when() ? children : fallback;
}

export function removeNodes(
  eachLen: number,
  liveFragment: LiveFragment,
  removedNodes: any[]
) {
  liveFragment?.childNodes
    ?.slice?.(eachLen)
    ?.forEach((element: HTMLElement) => {
      removedNodes.unshift(liveFragment.removeChild(element as any));
    });
}

export function getIncrementalNodes(
  indexArray: any[],
  Store: any,
  each: any,
  callback: ForProps['children'][number]
) {
  return indexArray.map((nIndex) => {
    const freshStore = new Store({
      value: null,
      id: `_${each.$$__id}_`,
      name: `${nIndex}`,
    });
    Store.addStoreChildren(
      each.$$__value[nIndex],
      freshStore.$$__id,
      freshStore
    );
    each[`${nIndex}`] = freshStore;
    return callback(each, nIndex) as any;
  });
}
