type vDom = {
  tagName: string, 
  props: {} | null, 
  children: Array<string | object> | null
};

export default function createElement({ tagName, props, children }: vDom): Element {
  const el: Element = document.createElement(tagName);
  // the element's properties
  if (props != null) {
    for (const [name, val] of Object.entries(props))  {
      const value = val as string;
      el.setAttribute(name, value);
    }
  }
  // the element's children
  if (children != null) {
    for (let i = 0; i < children.length; i++) {
      if (typeof children[i] === 'string') {
        el.append(children[i] as string);
      } else {
        el.appendChild(createElement(children[i] as vDom));
      }
    }
  }
  console.log(el);
  return el;
}