declare namespace Nix {
  interface Element extends Node{}

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