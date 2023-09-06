import {
  AnchorHTMLAttributes,
  ExoticComponent,
  NixixNode,
  RouteExoticComponent,
} from '../../types';

export type RoutePath = string;
export interface RouteLink<T extends string>
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: NixixNode;
  to?: T;
}
export interface RouteConfig<T extends string> {
  element: NixixNode;
  children?: NixixNode;
  path?: T;
  common?: boolean;
  errorPage?: boolean;
}

export type PathToRoute = RoutePath;
declare const Link: <T extends string>(props: RouteLink<T>) => JSX.Element;
declare const Routes: ExoticComponent<{
  children?: JSX.Element[] | JSX.Element;
  callback?: () => PathToRoute;
}>;
declare const Route: <T extends string>(props: RouteConfig<T>) => JSX.Element;
declare const Outlet: (props?: HTMLAttributes<HTMLSpanElement>) => JSX.Element;
/**
 * ```jsx
 *  Should be used to programmatically switch routes.
 *
 *  import { Router } from 'nixix/router';
 *  function signUp() {
      // code goes here
      Router.push('/home')
 }
 * ```
 */
declare const Router: RouteExoticComponent<{
  push: <P extends string>(path: P) => void;
}>;

export { Link, Routes, Route, Outlet, Router };
