
/**
 * @version nixix@1.0.3
 * @param tag tagName property of the element to create e.g 'div', 'a', 'main'
 * @param props object of properties of the element to create which can be dom attributes or html attributes or undefined
 * @param children an arrray of children which can be dom nodes or strings: textContent property
 * @returns  a real dom node
 */
const Nixix = (tag: elementType, props: {} | null | undefined, ...children: [] | null | undefined) => {

  const element = document.createElement(tag);
  if ((props != null) || (props != undefined)) {
    for (const [k, v] of Object.entries(props)) {
      if (k === 'className') {
        element.setAttribute('class', v as string);
      } else if (k.startsWith('on')) {
        const domAttribute = k.slice(2);
        element.setAttribute(`on${domAttribute.toLowerCase()}`, v as string);
      }
    };
  }
  if ((children != undefined) || (children != null)) {
    for (const child of children) {
      if (typeof child === 'string') {
        element.textContent = child as string;
      } else if (typeof child === 'object') {
        element.append(child);
      }
    }
  }
  console.log(element)

  return element;

};

export default Nixix;