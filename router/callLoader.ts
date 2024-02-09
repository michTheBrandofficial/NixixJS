import {
  AgnosticRouteMatch,
  AgnosticRouteObject,
  LoaderFunction,
  matchRoutes
} from "@remix-run/router";
import { getWinPath, lastElement, len } from "./helpers";
import type { LoaderProps } from "./types/index";
import { store, type NonPrimitive, callEffect, callReaction } from "../primitives";
import { agnosticRouteObjects } from "./utils";
import { raise } from "../dom/helpers";
import { navigate } from "./Router";

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
    (async () => undefined)();
  return val;
}

export function loaderData(path: `/${string}`, value: NonPrimitive) {
  const [val, setVal] = store(value);
  callEffect(() => {
    const routeMatches = matchRoutes(agnosticRouteObjects, {
      pathname: path,
    });

    if (routeMatches && len(routeMatches) !== 0) {
      const routeMatch = lastElement(routeMatches);
      // @ts-ignore
      const [adStore] =
        (routeMatch.route.actionSignal) || [];
      if (!adStore) raise(`Specify an action function for ${path}`);
      callReaction(() => {
        setVal(adStore);
        navigate(path);
      }, [adStore]);
    } else raise(`There are no route matches for ${path}.`);
  });
}
