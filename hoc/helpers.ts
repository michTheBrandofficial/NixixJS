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

export function checkLength(array: any[]) {
  return array.length === 0 ? false : array;
}

export function isArrayToDF(element: SuspenseProps['fallback']) {
  if (element instanceof Array) {
    const DF = new DocumentFragment();
    DF.append(...(element as any));
    return DF;
  } else {
    return element;
  }
}

export function isNotArray(el: any) {
  if (!(el instanceof Array)) {
    el = [el];
  }
}

export function flatten(arr: Array<any>) {
  return arr.flat(1);
}

export function getShow(when: ShowProps['when'], children: any, fallback: any) {
  return when() ? children : fallback ? fallback : [];
}
