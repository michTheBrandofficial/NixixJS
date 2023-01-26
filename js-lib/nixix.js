/**
 * @version nixix@1.0.3
 * @param tag tagName property of the element to create e.g 'div', 'a', 'main'
 * @param props object of properties of the element to create which can be dom attributes or html attributes or undefined
 * @param children an arrray of children which can be dom nodes or strings: textContent property
 * @returns  a real dom node
 */
const Nixix = (tag, props, ...children) => {
    const element = document.createElement(tag);
    if ((props != null) || (props != undefined)) {
        for (const [k, v] of Object.entries(props)) {
            element.setAttribute(k, v);
        }
        ;
    }
    // if ((children != undefined) || (children != null)) {
    //   for (const child of children) {
    //     if (typeof child === 'string') {
    //       element.textContent = child as string;
    //     } else if (typeof child === 'object') {
    //       element.append(child);
    //     }
    //   }
    // }
    console.log(children);
    return element;
};
export default Nixix;
