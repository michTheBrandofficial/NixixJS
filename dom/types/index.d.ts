import { LiveFragment } from '../../live-fragment/types';
import { NixixNode } from '../../types/index'
/**
 * jsxFactory - Nixix.create()
 */
declare const Nixix: {
  create: <T extends keyof JSX.IntrinsicElements>(
    target: T | ((props: {}) => JSX.Element) | 'fragment',
    props: JSX.IntrinsicElements[T] | null,
    ...children: (string | Node)[]
  ) => Element;
};

type RenderConfig = {
  commentForLF: boolean
}
/**
 * render function
 * @param element JSX.Element to render
 * @param root element which element will be appended to
 */
export function render(element: NixixNode | (() => NixixNode), root: HTMLElement, {
  commentForLF
}?: RenderConfig): void;

type RouteType = {
  element?: any;
  path?: `/${string}`
}

interface $$__NixixStore {
  $$__lastReactionProvider?: 'signal' | 'store';
  commentForLF: boolean;
  $$__routeStore?: {
    errorRoute?: RouteType;
    provider?: LiveFragment;
    routeMatch?: {
      route: RouteType
    };
    redirect?: string | null;
    currentRoute?: RouteType;
  };
  Store?: {
    [index: string]: WindowStoreObject;
  };
  SignalStore?: {
    [index: string]: {
      value: any;
      effect?: CallableFunction[];
    };
  };
  storeCount?: number;
  signalCount?: number;
  refCount?: number;
  jsx?: boolean;
}

export const nixixStore: $$__NixixStore;

/**
 * @deprecated PLEASE DO NOT USE THIS FUNCTION
 */
export function getStoreValue(store: any): any;

export default Nixix;
