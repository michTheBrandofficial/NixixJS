import {
  ExoticComponent,
  ImgHTMLAttributes,
  type NixixNode,
} from '../../types/index';
import { StoreObject } from '../../primitives/types';

// ExoticComponents
/**
 * @deprecated
 */
export const Img: ExoticComponent<ImgHTMLAttributes<HTMLImageElement>>;
interface SuspenseProps extends JSX.IntrinsicAttributes {
  fallback: NixixNode;
  onError?: NixixNode;
}
/**
   * ```jsx
   * When you have a Functional Compoonent that handles some asynchronous tasks before it returns a value, you should use this Component to to show a fallback and when the asynchronous task is done, it will replace the fallback with that Functional Component.
   * 
   * import { Suspense } from 'nixix';
   * function App() {
      return (
        <div>
          <Suspense fallback={<div>Loading...</div>} >
            <AsynchronousTasksToReturnSomeJSX />
          </Suspense>
        </div>
      )
   }
   * ```
   */
export const Suspense: ExoticComponent<SuspenseProps>;

type Props = {
  [index: string]: any;
};
type AsyncComponent<T extends Props> = (
  FC: (props?: T) => Promise<JSX.Element>
) => (props?: T) => JSX.Element;
/**
 *
 * ```jsx
 * For IDEs not to show errors when you use a component that has the return type 'Promise<JSX.Element>', you should use this function.
 *
 * This function simply returns the function passed as an argument to it. It is used to override the return type 'Promise<JSX.Element>' of async components to 'JSX.Element'.
 *
 * Example:
 *
 * function Product() {
 *    return new Promise((resolve, reject) => {
 *       resolve(<div>Product</div>);
 *    })
 * }
 *
 * 👆 The above function has a return type of 'Promise<JSX.Element>' and IDEs show errors when you call the function in a JSX scope. To stop this, use the function like this:
 *
 * import { asyncComponent } from 'nixix';
 *
 * const Product = asyncComponent(function () {
 *    return new Promise((resolve, reject) => {
 *       resolve(<div>Product</div>);
 *    })
 * })
 *
 *
 * Now, you can call this function anywhere in your component tree without your IDE showing any errors. Obviously, this would not return the expected value, so you need to wrap it in a Suspense Component.
 *
 * ```
 */
export const asyncComponent: AsyncComponent<Props>;

interface ForProps<T extends StoreObject<any[]> = StoreObject<any[]>> {
  fallback?: NixixNode;
  children?: (value: T['$$__value'][number], index?: number) => JSX.Element;
  parent?: JSX.Element | HTMLElement;
  each: T;
}

export const For: <T extends StoreObject<any[]>>(
  props?: ForProps<T>
) => JSX.Element;

interface ShowProps<T extends SignalObject<any> | StoreObject<any>>
  extends JSX.IntrinsicAttributes {
  when: () => boolean;
  switch: T;
  fallback?: NixixNode;
}

export const Show: <T extends SignalObject<any> | StoreObject<any>>(
  props?: ShowProps<T>
) => JSX.Element;

export const lazy: AsyncComponent<Props>;
