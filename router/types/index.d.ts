import { ExoticComponent, NixixNode, RouteExoticCompoent } from '../../types'

export type RoutePath = string;
export interface RouteLink {
  children?: NixixNode<any>;
  to?: RoutePath
}
export interface RouteConfig {
  element: NixixNode<any>, 
  children?: NixixNode<any>;
  path?: string,
  common?: boolean;
  errorPage?: boolean
}
export type PathToRoute = RoutePath
declare const Link: ExoticComponent<RouteLink>
declare const Routes: ExoticComponent<{children?: JSX.Element[] | JSX.Element, callback?: (() => PathToRoute)}>
declare const Route: ExoticComponent<RouteConfig>;
declare const Outlet: (props?: HTMLAttributes<HTMLSpanElement>) => JSX.Element
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
declare const Router: RouteExoticCompoent<{push: (path: string) => void}>;


export {
  Link,
  Routes,
  Route, 
  Outlet,
  Router
}


