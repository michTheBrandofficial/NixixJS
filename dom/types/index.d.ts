import '../../types/index';
/**
 * jsxFactory - Nixix.create()
 */
declare const Nixix: {
  create: <T extends keyof HTMLElementTagNameMap>(
    target: T | ((props: {}) => JSX.Element) | 'fragment',
    props: JSX.IntrinsicElements[T] | null,
    ...children: (string | Node)[]
  ) => Element;
};
/**
 * render function
 * @param element JSX.Element to render
 * @param root element which element will be appended to
 */
export function render(element: JSX.Element, root: HTMLElement): void;

export const nixixStore = window.$$__NixixStore;

export function getStoreValue(store: any): any;

export default Nixix;
