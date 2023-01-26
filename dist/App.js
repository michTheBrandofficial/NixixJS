import Nixix from '../js-lib/nixix.js';
const App = () => {
  return Nixix("div", null, Nixix("ul", null, Nixix("li", null, "Home"), Nixix("li", null, "About"), Nixix("li", null, "Contact")));
};