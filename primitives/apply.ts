// @ts-nocheck

/**
 * @example
 * 	newObject = apply(oldObject, patch);
 */
export function apply<T, U>(obj: T, diff: U) {
	if (typeof obj !== typeof diff) {
		return diff;
	}

	if (typeof diff === 'object') {
		if (Array.isArray(diff)) {
			return diff;
		}

		let out = obj;
		if (Array.isArray(obj)) {
			for (let i in diff) {
				out[i] = apply(obj[i], diff[i]);
			}
		} else {
			for (let i in diff) {
				out[i] = apply(obj[i], diff[i]);
			}
		}

		return out;
	}
	return diff;
}
