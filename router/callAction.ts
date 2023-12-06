import { matchRoutes } from "@remix-run/router";
import { agnosticRouteObjects } from "./utils";
import { len } from "./helpers";
import type { ActionProps } from "./types/index";

type CallActionConfig = {
  path: `/${string}`;
  formData: FormData;
};

export async function callAction({ path, formData }: CallActionConfig) {
  const routeMatches = matchRoutes(agnosticRouteObjects, {
    pathname: path,
  });

  if (routeMatches && len(routeMatches) !== 0) {
    const routeMatch = routeMatches[len(routeMatches) - 1];
    const payLoad = {
      params: routeMatch.params || {},
      request: new Request(path),
    } as ActionProps;
    payLoad.request.formData = async () => formData; 
    routeMatch.route.action?.(payLoad as any);
  }
}
