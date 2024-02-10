import { create } from "../dom";
import { callAction } from "./callAction";
import { getLink, lastElement, len } from "./helpers";
import type { FormActionProps } from "./types/index";
import { matchRoutes } from "@remix-run/router";
import { agnosticRouteObjects } from "./utils";
import { raise } from "dom/helpers";

export const Form = ({
  children,
  "on:submit": onSubmit,
  ...rest
}: FormActionProps) => {
  let path = `${rest.action}` as `/${string}`;
  const routeMatches = matchRoutes(agnosticRouteObjects, {
    pathname: path
  });

  if (routeMatches && len(routeMatches) !== 0) {
    const routeMatch = lastElement(routeMatches) as any;
    const { action, path: rPath } = routeMatch
    if (!action) 
      raise(`Specify a route action function for ${rPath}`)
    const subMitHandler: FormActionProps["on:submit"] = (e) => {
      e.preventDefault();
      onSubmit?.(e);
      const formData = new FormData(e.currentTarget);
      path = `${rest.action}`
      callAction({ path, formData });
    };
    return create(
      "form",
      { ...rest, "on:submit": subMitHandler },
      children as any
    );
  } else raise(`There are no route matches for ${path}`);
};
