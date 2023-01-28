
/**
 * @version nixix@1.0.3
 * @param tagNameFC tagNameFC: property of the element to create e.g 'div', 'a', 'main' or a function component.
 * @param props object of properties of the element to create which can be dom attributes or html attributes or undefined
 * @param children an arrray of children which can be dom nodes or strings: textContent property
 * @returns  a real dom node
 */
export const fragment: Fragment = 'fragment';
const Nixix = (tagNameFC: elementType | FunctionComponent, props: {} | null | undefined, ...children: [] | null | undefined): Nix.Element | Nix.Element[] | Fragment=> {

  if (tagNameFC == 'fragment') {
    if (children != null) children;
  } else if (typeof tagNameFC === 'function') {
    if ((props != null) && (props != undefined)) {
      return tagNameFC(props);
    } else {
      return tagNameFC();
    }
  } else if (typeof tagNameFC === 'string') {
    const element = document.createElement(tagNameFC as elementType);
    if ((props != null) || (props != undefined)) {
      for (const [k, v] of Object.entries(props)) {
        if (k === 'className') {
          element.setAttribute('class', v as string);
        } else if (k.startsWith('on')) {
          const domAttribute = k.slice(2);
          element.addEventListener(domAttribute.toLowerCase(), eval(v as string))
        } else {
          element.setAttribute(k, v as string);
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
  }

};

// nixix hooks
class State<T> {
  initialState: T;
  constructor(initialState: T) {
    this.initialState = initialState;
  }
  createState(): [T, Function] {
    return [
      this.initialState,
      (): void => {}
    ]
  }
}

export default Nixix;
export {
  State
}