import {
  AnchorHTMLAttributes,
  EmptyObject,
  ExoticComponent,
  FormHTMLAttributes,
  NixixNode,
  RouteExoticComponent,
  ValueType,
} from "../../types";

export interface LoaderProps {
  params: EmptyObject<string>
  /**
   * Experimental *use at your own risk*
   */
  request: Request;
}

export interface ActionProps extends LoaderProps {
}

export interface LoaderFunction {
  (config: LoaderProps): Promise<any>;
}

export interface ActionFunction {
  (config: ActionProps): Promise<any>;
}

export type RoutePath = string;
export interface RouteLink<T extends string>
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: NixixNode;
  to: ValueType<T>;
}
export interface RouteConfig<T extends string> {
  element: NixixNode;
  children?: NixixNode;
  path?: T;
  errorRoute?: boolean;
  loader?: LoaderFunction;
  action?: ActionFunction;
}

export type FormActionProps = {
  action: `/${string}`,
  method: 'put' | 'post' | 'delete' | 'patch'
} & FormHTMLAttributes<HTMLFormElement>

export type PathToRoute = `/${string}`;
declare const Link: <T extends PathToRoute>(props: RouteLink<T>) => JSX.Element;
declare const Routes: ExoticComponent<{
  children?: NixixNode;
}>;
declare const Route: <T extends PathToRoute>(props: RouteConfig<T>) => someView;
declare const Form: (props: FormActionProps) => someView;
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
  push: <P extends PathToRoute>(path: P) => void;
}>;

/**
 * To be used to navigate the pages
 */
declare const navigate: (path: PathToRoute) => void;

/**
 * To be used within a loader context to redirect to new pages
 * ```jsx
 *  <Route 
 *    path='/products' 
 *    loader={async () => {
 *      // CAN BE USED TO PROTECTED ROUTES
 *     // DO SOME AUTHENTICATION HERE
 *     redirect('/sign-in')
 *    }} 
 *    element={<Products />}>
 *  </Route>
 * ```
 */
declare const redirect: (path: PathToRoute) => void;

export { Link, Routes, Route, Form, Router, navigate, redirect };
