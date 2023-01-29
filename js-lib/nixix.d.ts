/// <reference types="./types/" />
/**
 * @version nixix@1.0.3
 * @param tagNameFC tagNameFC: property of the element to create e.g 'div', 'a', 'main' or a function component.
 * @param props object of properties of the element to create which can be dom attributes or html attributes or undefined
 * @param children an arrray of children which can be dom nodes or strings: textContent property
 * @returns  a real dom node
 */
export declare const fragment: Fragment;
declare const Nixix: (tagNameFC: elementType | FunctionComponent, props: {} | null | undefined) => Nix.Element | Nix.Element[] | Fragment;
declare class State<T> {
    initialState: T;
    constructor(initialState: T);
    createState(): [T, Function];
}
export default Nixix;
export { State };
