/**
 * @version nixix@1.0.3
 * @param tag tagName property of the element to create e.g 'div', 'a', 'main'
 * @param props object of properties of the element to create which can be dom attributes or html attributes or undefined
 * @param children an arrray of children which can be dom nodes or strings: textContent property
 * @returns  a real dom node
 */
declare const Nixix: (tag: elementType, props: {} | null | undefined) => HTMLAnchorElement | HTMLElement | HTMLBodyElement;
export default Nixix;
