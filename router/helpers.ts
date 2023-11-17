export function getWinPath() {
  return window.location.pathname;
}

export function pushState(path?: string) {
  window.history.pushState({}, '', path);
}

export function changeRouteComment(path: string, ...comments: Comment[]) {
  comments.forEach((c) => {
    c.textContent = `route-${path}`;
  });
}

export function isNull(val: any) {
  return val === null || val === undefined;
}
