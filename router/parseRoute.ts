export function createMatch(isExact, path, url, params) {
  return {
    isExact: isExact,
    path: path,
    url: url,
    params: params,
  };
}

export function trimTrailingSlash(url: string) {
  for (var len = url.length; '/' === url[--len]; );
  return url.slice(0, len + 1);
}

export function decodeParam(val: string) {
  try {
    return decodeURIComponent(val);
  } catch (e) {
    return val;
  }
}

export function parseRoute(path: string, url: string) {
  // parent localhost:5173/
  // child localhost:5173/sigin
  // child localhost:5173/products/shoes
}
