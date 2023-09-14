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

export function flatten(arr: Array<any>) {
  return arr.flat(1);
}
