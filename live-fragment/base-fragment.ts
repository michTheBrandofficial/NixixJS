import { DOCUMENT_FRAGMENT_NODE } from './functions.js';

export class BaseFragment implements TBaseFragment {
  constructor(parentNode?: ParentNode | Array<Node>, nextSibling?: Node) {
    let args = [].slice.call(arguments) as (typeof prev)[],
      valid = false,
      parent: Null<ParentNode> = null,
      children: Null<Node[]> = null,
      prev: Null<Node> = null,
      next: Null<Node> = null,
      node: Null<Node> = null,
      i: Null<number> = null,
      len: Null<number>;

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
    } else if (args.length == 1) {
      // handle contiguous slice of childNodes or children
      if (
        typeof (args?.[0] as any)?.length === 'number' &&
        (args?.[0] as any)?.length > 0
      ) {
        children = [].slice.call(args[0]);
        parent = children[0].parentNode;
        len = children.length;
        node = prev = children[0].previousSibling;
        next = children[len - 1].nextSibling;
        valid = true;
      } else if (typeof args?.[0]?.nodeType === 'number') {
        // handle parent passed as argument
        parent = args[0] as ParentNode;
        children = [].slice.call(parent.childNodes);
        prev = next = null;
        valid = true;
      }
    }

    this._parentNode = parent;
    this._childNodes = children;
    this._previousSibling = prev || null;
    this._nextSibling = next || null;
    this._ownerDocument = this?._parentNode?.ownerDocument;
    this._nodeType = DOCUMENT_FRAGMENT_NODE;
  }
  _parentNode: Null<ParentNode>;
  _childNodes: any;
  _previousSibling: any;
  _nextSibling: any;
  _ownerDocument: Null<Document>;
  _nodeType: any;

  get firstChild() {
    return this._childNodes[0] || null;
  }

  get lastChild() {
    return this._childNodes[this._childNodes.length - 1] || null;
  }

  get childNodes() {
    return this._childNodes;
  }

  get parentNode() {
    return this._parentNode;
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
