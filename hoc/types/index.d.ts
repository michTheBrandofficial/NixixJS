import {
  ExoticComponent,
  ImgHTMLAttributes,
  type NixixNode,
} from '../../types/index';
import { StoreObject } from '../../primitives/types';

interface ComponentFallback {
  fallback?: JSX.Element | null | undefined;
}

/**
 * @deprecated
 */
export const Img: ExoticComponent<ImgHTMLAttributes<HTMLImageElement>>;

interface SuspenseProps extends ComponentFallback {
  onError?: NixixNode;
  children: JSX.Element[] | JSX.Element;
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
  FC: (props?: T) => Promise<someView>
) => (props?: T) => someView;
/**
 * @deprecated
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

interface ForProps<T extends any[]> extends ComponentFallback {
  each: StoreObject<T>;
  children: (item: StoreObject<T>, i: number) => someView;
}

export declare function For<T extends any[]>(props?: ForProps<T>): someView;

interface ShowProps<T> extends ComponentFallback {
  when: () => boolean;
  switch: T;
  children: NixixNode;
}

export declare function Show<T extends SignalObject<string | number | boolean>>(
  props?: ShowProps<T>
): someView;
export declare function Show<T extends StoreObject<object | any[]>>(
  props?: ShowProps<T>
): someView;

export const lazy: AsyncComponent<Props>;
