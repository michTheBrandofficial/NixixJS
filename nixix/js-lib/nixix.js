/**
 * @version nixix@1.0.3
 * @param tagNameFC tagNameFC: property of the element to create e.g 'div', 'a', 'main' or a function component.
 * @param props object of properties of the element to create which can be dom attributes or html attributes or undefined
 * @param children an arrray of children which can be dom nodes or strings: textContent property
 * @returns  a real dom node
 */
export const fragment = 'fragment';
const Nixix = (tagNameFC, props, ...children) => {
    if (tagNameFC == 'fragment') {
        if (children != null)
            children;
    }
    else if (typeof tagNameFC === 'function') {
        if ((props != null) && (props != undefined)) {
            return tagNameFC(props);
        }
        else {
            return tagNameFC();
        }
    }
    else if (typeof tagNameFC === 'string') {
        const element = document.createElement(tagNameFC);
        if ((props != null) || (props != undefined)) {
            for (const [k, v] of Object.entries(props)) {
                if (k === 'className') {
                    element.setAttribute('class', v);
                }
                else if (k.startsWith('on')) {
                    const domAttribute = k.slice(2);
                    element.addEventListener(domAttribute.toLowerCase(), eval(v));
                }
                else {
                    element.setAttribute(k, v);
                }
            }
            ;
        }
        if ((children != undefined) || (children != null)) {
            for (const child of children) {
                if (typeof child === 'string') {
                    element.textContent = child;
                }
                else if (typeof child === 'object') {
                    element.append(child);
                }
            }
        }
        console.log(element);
        return element;
    }
};
// nixix hooks
class State {
    initialState;
    constructor(initialState) {
        this.initialState = initialState;
    }
    createState() {
        return [
            this.initialState,
            () => { }
        ];
    }
}
export default Nixix;
export { State };
