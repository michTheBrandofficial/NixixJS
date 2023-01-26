import Nixix from '../js-lib/nixix.js';
import render from '../js-lib/render.js'
const App = () => {
  return Nixix("div", {className: 'john', onClick: 'callme()'}, Nixix("ul", null, Nixix("li", null, "Home"), Nixix("li", null, "About"), Nixix("li", null, "Contact")));
};

App()
render(App(), document.querySelector('div#root'))