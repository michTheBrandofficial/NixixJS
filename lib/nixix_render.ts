import virtualDom from "./nixix_virtualDom.js";
import createElement from "./nixix_createElement.js";

export default function render($el: string, $Dom: HTMLElement ): Element {
  const vDom = virtualDom(document.createRange().createContextualFragment($el).children[0]);
  const el = createElement(vDom);
  $Dom.replaceWith(el);
  return el;
}