import {
  AgnosticRouteMatch,
  AgnosticRouteObject,
  LoaderFunction,
} from "@remix-run/router";
import { getWinPath } from "./helpers";
import type { LoaderProps } from "./types/index";

export async function callLoader({
  route,
  params,
}: Partial<AgnosticRouteMatch<string, AgnosticRouteObject>>) {
  const loaderArgs = {
    params: params || {},
    request: new Request(getWinPath()),
  } as LoaderProps;
  // do something with the data here;
  const val =
    (await (route?.loader as LoaderFunction)?.(loaderArgs)) ||
    (async () => {})();
}
