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
  const array = each.$$__value as [];
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
  if (Array.isArray(arr)) return arr.flat(Infinity);
  else return [arr];
}

export function getShow(bool: boolean, children: any, fallback: any) {
  return bool ? children : fallback;
}

// childNodes = 7;
// eachLen = 4;
// divArray = [<div>, <div>, <div>, <div>, <div class="bg-blue-300" >, <div>, <div>]; length = 7;
// toRemove = divArray.slice(4) = [<div class="bg-blue-300" >, <div>, <div>]
// <<<DONE>>>;
// divArray = [<div>, <div>, <div>, <div>]; length = 4;
// childNodes = 4;
// eachLen = 2;
// anotherToRemove = divArray.slice(2) = [<div>, <div>]
// removedNodes = first batch in + second batch in + n batches...
// removedNodes =  [<div>, <div>, <div class="bg-blue-300" >, <div>, <div>, <div>]
export function removeNodes(
  eachLen: number,
  liveFragment: LiveFragment,
  removedNodes: any[]
) {
  const cachedNodes = liveFragment?.childNodes?.slice(eachLen) as any[];
  removedNodes.unshift(...cachedNodes);
  cachedNodes.forEach((node) => {
    liveFragment.removeChild(node);
  });
}

export function getIncrementalNodes(
  indexArray: any[],
  Store: any,
  each: any,
  callback: Required<ForProps>['children'][number]
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
