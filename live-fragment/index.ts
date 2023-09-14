import { BaseFragment } from './base-fragment.js';
import {
  DOCUMENT_FRAGMENT_NODE,
  makeDOMException,
  slice,
} from './functions.js';

/*
 * LiveFragment object; used to represent a "live"-DocumentFragment.
 *
 * Has the same API as a DocumentFragment, with some additions.  Operations
 * on a LiveFragment are propagated to its parent.
 *
 * new LiveFragment(parent)
 *  creates a LiveFragment holding all child nodes of `parent`.
 *
 * new LiveFragment([nodes])
 *  creates a LiveFragment holding all nodes in `nodes`, which must be
 *  contiguous and have the same parent
 *
 * new LiveFragment(prevSibling, nextSibling)
 *  creates a LiveFragment between `prevSibling` and `nextSibling`.  At least
 *  one of the arguments must be non-null, and when they are both present, they
 *  must have the same parent and be specified in the right order.
 */
export class LiveFragment extends BaseFragment {
  /* Append node to fragment, removing it from its parent first.
			Can be called with a DocumentFragment or a LiveFragment */
  appendChild(node: Null<NodeFragment | DocumentFragment>) {
    if (node instanceof LiveFragment) {
      node = node.getDocumentFragment();
    }

    if (node?.nodeType === DOCUMENT_FRAGMENT_NODE) {
      slice.call(node.childNodes).forEach(this.appendChild, this);
      return;
    }

    // Remove child from its parent first
    if (node?.parentNode) {
      node.parentNode.removeChild(node);
    }

    this._removeChildNoFail(node);

    if (this.nextSibling) {
      this._parentNode?.insertBefore(node as any, this.nextSibling);
    } else {
      this._parentNode?.appendChild(node as any);
    }

    this._childNodes.push(node);

    return node;
  }

  /* Insert node into fragment before reference node, removing it from its
			parent first. Can be called with a DocumentFragment or a
			LiveFragment */
  insertBefore(
    newNode: NodeFragment | DocumentFragment,
    refNode: NodeFragment
  ) {
    let index;

    if (!refNode) {
      return this.appendChild(newNode);
    }

    if (newNode instanceof LiveFragment) {
      newNode = newNode.getDocumentFragment() as any;
    }

    if (newNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
      slice.call(newNode.childNodes).forEach((n) => {
        this.insertBefore(n, refNode);
      }, this);
      return;
    }

    // Remove child from its parent first
    if (newNode.parentNode) {
      newNode.parentNode.removeChild(newNode);
    }

    this._removeChildNoFail(newNode);

    index = this._childNodes.indexOf(refNode);

    if (index === -1) {
      throw makeDOMException(8);
    }

    this._parentNode?.insertBefore(newNode, refNode);
    this._childNodes.splice(index, 0, newNode);

    return newNode;
  }

  /* Remove node from fragment */
  removeChild(node: NodeFragment) {
    let index = this._childNodes.indexOf(node);

    if (index === -1) {
      throw makeDOMException(8);
    }

    this._parentNode?.removeChild(node);
    this._childNodes.splice(index, 1);

    return node;
  }

  _removeChildNoFail(node: Null<NodeFragment | DocumentFragment>) {
    let index = this._childNodes.indexOf(node);

    if (index === -1) {
      return;
    }

    this._parentNode?.removeChild(node as any);
    this._childNodes.splice(index, 1);

    return node;
  }

  /* Replace node in fragment */
  replaceChild(newNode: NodeFragment, oldNode: NodeFragment) {
    var index = this._childNodes.indexOf(oldNode);

    if (index === -1) {
      throw makeDOMException(8);
    }

    this._parentNode?.replaceChild(newNode, oldNode);
    this._childNodes.splice(index, 1, newNode);

    return oldNode;
  }

  /* Remove all nodes from fragment */
  empty() {
    this._childNodes.forEach((node: NodeFragment) => {
      this._parentNode?.removeChild(node);
    }, this);

    this._childNodes = [];
  }

  /* Extend fragment to adjacent node */
  extend(node: NodeFragment) {
    if (node) {
      if (node === this._nextSibling) {
        this._childNodes.push(this._nextSibling);
        this._nextSibling = this._nextSibling.nextSibling;
        return;
      }

      if (node === this._previousSibling) {
        this._childNodes.unshift(this._previousSibling);
        this._previousSibling = this._previousSibling.previousSibling;
        return;
      }
    }

    throw makeDOMException(8);
  }

  /* Shrink fragment by removing extremal node */
  shrink(node: NodeFragment) {
    if (node) {
      if (node === this.firstChild) {
        this._childNodes.shift();
        this._previousSibling = node;
        return;
      }

      if (node === this.lastChild) {
        this._childNodes.pop();
        this._nextSibling = node;
        return;
      }
    }

    throw makeDOMException(8);
  }

  /* Empty LiveFragment and return a DocumentFragment with all nodes.
			Useful to perform operations on nodes while detached from the
			document.  Call LiveFragment#appendChild with the DocumentFragment
			to reattach nodes.  Useless when LiveFragment is empty. */
  getDocumentFragment() {
    const frag = this.ownerDocument?.createDocumentFragment();
    this._childNodes.forEach(frag?.appendChild, frag);
    this._childNodes = [];
    return frag;
  }

  hasChildNodes() {
    return this._childNodes.length > 0;
  }

  /* Prepend node inside frament */
  prepend(node: NodeFragment) {
    this.insertBefore(node, this.firstChild);
  }

  /* Append node inside fragment */
  append(...node: NodeFragment[]) {
    node.forEach((childNode) => {
      this.appendChild(childNode);
    });
  }

  /* Insert node outside and before fragment */
  before(node: NodeFragment) {
    var newPrevious;

    if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
      newPrevious = node.lastChild;
    } else {
      newPrevious = node;
    }

    this.parentNode?.insertBefore(node, this.firstChild || this.nextSibling);
    this._previousSibling = newPrevious;
  }

  /* Insert node outside and after fragment */
  after(node: NodeFragment) {
    let newNext;

    if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
      newNext = node.firstChild;
    } else {
      newNext = node;
    }

    this.parentNode?.insertBefore(node, this.nextSibling);
    this._nextSibling = newNext;
  }

  /* Replace nodes in this fragment */
  replace(node: NodeFragment) {
    var newChildren;

    if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
      newChildren = [].slice.call(node.childNodes);
    } else {
      newChildren = [node];
    }

    this.parentNode?.insertBefore(node, this.nextSibling);
    this.empty();

    this._childNodes = newChildren;
  }

  /* Remove nodes in this fragment */
  remove() {
    this.empty();
  }

  /* Check for child existence */
  contains(node: TBaseFragment) {
    var i, len;

    if (node === this) {
      return true;
    } else {
      for (i = 0, len = this._childNodes.length; i < len; i++) {
        if (this._childNodes[i].contains(node)) {
          return true;
        }
      }
    }

    return false;
  }
}
