import { matchRoutes } from "@remix-run/router";
import { raise } from "../dom/helpers";
import { callStore } from "../primitives";
import type { EmptyObject } from "../types";
import { navigate } from "./Router";
import { lastElement, len } from "./helpers";
import {
  actionData as ActionDataFunction,
  ActionProps,
  PathToRoute,
} from "./types/index";
import { agnosticRouteObjects } from "./utils";

export class ActionDataHandler {
  private static actionRoute: Set<PathToRoute> = new Set();

  private static pathMap: Map<PathToRoute, ((data: any) => void)> = new Map();

  static subscribeAction(path: PathToRoute, fn: (data: any) => void) {
    this.pathMap.set(path, fn);
  }

  static addActionRoute(path: PathToRoute) {
    this.actionRoute.add(path);
  }

  static setData(path: PathToRoute, data: any[] | object) {
    const { actionRoute } = this;
    actionRoute.has(path)
  }
}

type CallActionConfig = {
  path: `/${string}`;
  formData: FormData;
};

export async function callAction({ path, formData }: CallActionConfig) {
  const routeMatches = matchRoutes(agnosticRouteObjects, {
    pathname: path,
  });

  if (routeMatches && len(routeMatches) !== 0) {
    const routeMatch = lastElement(routeMatches) as any;
    const payLoad = {
      params: routeMatch.params || {},
      request: new Request(path),
    } as ActionProps;
    payLoad.request.formData = async () => formData;
    // @ts-ignore
    const { action, path: rPath } = routeMatch.route;
    const data = (await action?.(payLoad)) as Promise<EmptyObject>;
    // rPath -> /movies/:id
    ActionDataHandler.setData(rPath, data);
    return;
  } else raise(`Specify a route action function for ${path}`);
}

export const actionData: typeof ActionDataFunction = (
  path: PathToRoute,
  value: any
) => {
  const routeMatches = matchRoutes(agnosticRouteObjects, {
    pathname: path,
  });

  if (routeMatches && len(routeMatches) !== 0) {
    const routeMatch = lastElement(routeMatches) as any;
    const { action, path: rPath } = routeMatch
    if (!action)
      raise(`Specify an action function for ${rPath}`);
    const [val, setVal] = callStore(value)!;
    ActionDataHandler.subscribeAction(path, (data) => {
      setVal(data);
      navigate(path);
    });
    return val as any;
  } else raise(`There are no route matches for ${path}.`);
};
