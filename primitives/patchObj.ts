import { apply } from "./apply";
import { diff } from "./diff";

export function patchObj<T extends object | any[]>(oldObj: T, newObj: T) {
  const diffed = diff(newObj, oldObj)
}