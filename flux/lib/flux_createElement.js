export default function createElement({ tagName, props, children }) {
    const el = document.createElement(tagName);
    // the element's properties
    if (props != null) {
        for (const [name, val] of Object.entries(props)) {
            const value = val;
            el.setAttribute(name, value);
        }
    }
    // the element's children
    if (children != null) {
        for (let i = 0; i < children.length; i++) {
            if (typeof children[i] === 'string') {
                el.append(children[i]);
            }
            else {
                el.appendChild(createElement(children[i]));
            }
        }
    }
    console.log(el);
    return el;
}
