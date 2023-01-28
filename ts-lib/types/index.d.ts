export {}

declare global {
  declare namespace Nix {
    interface Element extends Node{}
  
    interface State {
      initialState: string | number | Function
    }
  }

  type elementType = 
    | 'fragment'
    | 'a' 
    | 'abbr' 
    | 'address' 
    | 'bdo' 
    | 'body' 
  ;
  
  type Fragment = string;
  
  
  type FunctionComponent = (props?: {}) => Nix.Element
}