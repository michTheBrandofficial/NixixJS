import { matchRoutes } from "@remix-run/router";
import { agnosticRouteObjects } from "./utils";
import { lastElement, len } from "./helpers";
import type {
  ActionProps,
  PathToRoute,
  actionData as ActionDataFunction,
} from "./types/index";
import { callEffect, callReaction, callStore, effect, getValueType } from "../primitives";
import type { EmptyObject } from "../types";
import { raise } from "../dom/helpers";
import { navigate } from "./Router";

type CallActionConfig = {
  path: `/${string}`;
  formData: FormData;
};

export async function callAction({ path, formData }: CallActionConfig) {
  const routeMatches = matchRoutes(agnosticRouteObjects, {
    pathname: path,
  });

  if (routeMatches && len(routeMatches) !== 0) {
    const routeMatch = lastElement(routeMatches);
    const payLoad = {
      params: routeMatch.params || {},
      request: new Request(path),
    } as ActionProps;
    payLoad.request.formData = async () => formData;
    // @ts-ignore
    const {action, actionSignal} = routeMatch.route;
    (action?.(payLoad as any) as Promise<EmptyObject>).then(val => {
      actionSignal[1](val)
    });
  }
}


export const actionData: typeof ActionDataFunction = (path: PathToRoute, value: any) => {
  const [val, setVal]= callStore(value)!;
  callEffect(() => {
    const routeMatches = matchRoutes(agnosticRouteObjects, {
      pathname: path,
    });

    if (routeMatches && len(routeMatches) !== 0) {
      const routeMatch = lastElement(routeMatches);
      // @ts-ignore
      const [adStore] = routeMatch.route.actionSignal as typeof valStore  || [];
      if (!adStore) raise(`Specify an action function for ${path}`)
      callReaction(() => {
        setVal(adStore)
        navigate(path)
      }, [adStore])
    } else raise(`There are no route matches for ${path}.`);
  });
  return val as any;
};
