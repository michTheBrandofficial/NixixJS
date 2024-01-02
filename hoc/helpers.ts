import { nixixStore, removeNode } from "../dom/index";
import { createFragment, createText } from "../dom/helpers";
import { Store } from "../primitives/classes";
import { LiveFragment } from "../live-fragment/types";

export function comment(str: string) {
  return document.createComment(str);
}

export function indexes(arr: Array<any>) {
  return [arr[0], arr[arr.length - 1]];
}

type CommentName = "suspense" | "for" | "show" | "index";

export function boundary(commentName?: CommentName) {
  const { commentForLF } = nixixStore;
  return commentForLF ? comment(`nixix-${commentName}`) : createText("");
}

export function compFallback() {
  const { commentForLF } = nixixStore;
  return commentForLF ? comment("nixix-fallback") : createText("");
}

export function createBoundary(
  values: any,
  commentName: CommentName
): DocumentFragment {
  return createFragment([boundary(commentName), values, boundary(commentName)]);
}

export function numArray(start: number, end: number) {
  const arr = [];
  for (let index = start; index < end; index++) {
    arr.push(index);
  }
  return arr;
}

export function arrayOfJSX(each: any[], callback: any): any[] {
  const array = each as [];
  const returnedValue = array.map((e, i) => {
    return callback(e, i);
  });
  return returnedValue;
}

export function checkLength(array: any[]) {
  return array.length === 0 ? false : array;
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

/* childNodes = 7;
  eachLen = 4;
  divArray = [<div>, <div>, <div>, <div>, <div class="bg-blue-300" >, <div>, <div>]; length = 7;
  toRemove = divArray.slice(4) = [<div class="bg-blue-300" >, <div>, <div>]
  <<<DONE>>>;
  divArray = [<div>, <div>, <div>, <div>]; length = 4;
  childNodes = 4;
  eachLen = 2;
  anotherToRemove = divArray.slice(2) = [<div>, <div>]
  removedNodes = first batch in + second batch in + n batches...
  removedNodes =  [<div>, <div>, <div class="bg-blue-300" >, <div>, <div>, <div>]
*/
export function removeNodes(
  eachLen: number,
  liveFragment: LiveFragment,
  removedNodes?: any[]
) {
  const cachedNodes = liveFragment?.childNodes?.slice(eachLen) as any[];
  removedNodes?.unshift?.(...cachedNodes);
  cachedNodes.forEach((node) => {
    liveFragment.removeChild(node);
    if (!removedNodes) removeNode(node);
  });
}

export function getIncrementalNodes(
  indexArray: any[],
  each: any[],
  callback: Required<ForProps>["children"][number]
) {
  let returnedValue = indexArray.map((nIndex) => {
    each[nIndex] = new Store({
      value: each[nIndex],
    });
    return callback(each[nIndex], nIndex) as any;
  });
  return returnedValue;
}
