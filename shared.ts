export function raise(message: string) {
  throw `${message}`;
}

export function warn(message: string) {
  console.warn(message);
}

export function isNull(value: any) {
  return value === null || value === undefined;
}

export function entries(obj: object) {
  return Object.entries(obj);
}

export function nonNull<V>(value: V, fallback: any) {
  return isNull(value) ? fallback : value;
}