import { applyDiff, getDiff } from "../diff";

export function patchObj<T extends object | any[]>(oldObj: T, newObj: T) {
  const patch = getDiff(oldObj, newObj);
  applyDiff(oldObj, patch);
}
