"use strict";
// shows the vdom 
export default function virtualDom(el) {
    const element = el;
    const tagName = element.tagName.toLowerCase();
    let props = {};
    if (element.attributes.length != 0) {
        const attributes = Array.from(element.attributes);
        for (let i = 0; i < attributes.length; i++) {
            props[attributes[i]["name"]] = attributes[i]["value"];
        }
    }
    else {
        props = null;
    }
    let children = null;
    if (element.childNodes.length != 0) {
        children = [];
        for (let i = 0; i < element.childNodes.length; i++) {
            if (element.childNodes[i].nodeName === '#text') {
                if (element.childNodes[i].nodeValue?.replace(/\t/g, '').replace(/\n/g, '').length != 0) {
                    children.push(element.childNodes[i].nodeValue?.replace(/\t/g, '').replace(/\n/g, ''));
                }
            }
            else {
                children.push(virtualDom(element.childNodes[i]));
            }
        }
    }
    return { tagName: tagName, props: props, children: children };
}
