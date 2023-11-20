// Expose `JSX` namespace in `global` namespace
import * as Nixix from './';

export namespace JSX {
  type ElementType = Nixix.JSX.ElementType;
  interface Element extends Nixix.JSX.Element {}
  interface ElementChildrenAttribute
    extends Nixix.JSX.ElementChildrenAttribute {}
  interface IntrinsicAttributes extends Nixix.JSX.IntrinsicAttributes {}
  interface IntrinsicElements extends Nixix.JSX.IntrinsicElements {}
}
