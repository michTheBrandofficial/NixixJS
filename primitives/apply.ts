import { EmptyObject } from "../types";
import { entries, isPrimitive } from "./helpers";

/**
 * THIS FUNCTION SHOULD BE USED IN THE PRIMITIVES MODULE, IT USES $$__id in the implementation;
 * @example
 * 	newObject = apply(oldObject, patch);
 */
export function apply<T extends EmptyObject, U extends object>(obj: T, diff: U): void {
	// if diff is undefined, meaning there is no difference, just return;
	if (!diff) return;
	console.log(diff);
	if (typeof diff === 'object') {
		entries(diff).forEach(([k,v], i) => {
			if (k === '$$__id') return;
			// @ts-expect-error
			if (isPrimitive(v)) obj[k] = v;
			else apply(obj[k], v)
		})
	}
}
