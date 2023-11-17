import { DOCUMENT_FRAGMENT_NODE } from './functions.js';

export class BaseFragment implements TBaseFragment {
  constructor() {
    let args = [].slice.call(arguments) as (typeof prev)[],
      valid = false,
      parent: Null<ParentNode> = null,
      children: Null<Node[]> = null,
      prev: Null<Node> = null,
      next: Null<Node> = null,
      node: Null<Node> = null;

    if (args.length === 2) {
      prev = args[0];
      next = args[1];

      if (prev || next) {
        parent = prev ? prev?.parentNode : next?.parentNode;
        children = [];
        node = prev ? prev?.nextSibling : parent?.firstChild;

        while (node && node !== next) {
          children.push(node);
          node = node.nextSibling;
        }

        if (node === next) {
          valid = true;
        }
      }
    }

    this._childNodes = children;
    this._previousSibling = prev || null;
    this._nextSibling = next || null;
    this._ownerDocument = parent?.ownerDocument;
    this._nodeType = DOCUMENT_FRAGMENT_NODE;
  }
  _childNodes: any;
  _previousSibling: any;
  _nextSibling: any;
  _ownerDocument: Null<Document>;
  _nodeType: any;

  get childNodes() {
    return this._childNodes;
  }

  get parentNode() {
    return this._previousSibling.parentNode;
  }

  get previousSibling() {
    return this._previousSibling;
  }

  get nextSibling() {
    return this._nextSibling;
  }

  get ownerDocument() {
    return this._ownerDocument;
  }

  get nodeType() {
    return this._nodeType;
  }
}
