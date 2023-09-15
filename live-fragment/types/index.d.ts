interface TBaseFragment {
  _parentNode: Null<ParentNode>;
  _childNodes: any;
  _previousSibling: any;
  _nextSibling: any;
  _ownerDocument: Null<Document>;
  _nodeType: any;
}

type Null<T> = T | null | undefined;

type NodeFragment = Node & TBaseFragment;

declare class BaseFragment implements TBaseFragment {
  constructor(
    parentNode?: ParentNode | Array<Node> | Node | string,
    nextSibling?: Node
  );
  _parentNode: Null<ParentNode>;
  _childNodes: any;
  _previousSibling: any;
  _nextSibling: any;
  _ownerDocument: Null<Document>;
  _nodeType: any;
  get firstChild(): any;
  get lastChild(): any;
  get childNodes(): any;
  get parentNode(): Null<ParentNode>;
  get previousSibling(): any;
  get nextSibling(): any;
  get ownerDocument(): Null<Document>;
  get nodeType(): any;
}

export declare class LiveFragment extends BaseFragment {
  appendChild(
    node: Null<NodeFragment | DocumentFragment>
  ): Null<DocumentFragment | NodeFragment>;
  insertBefore(
    newNode: NodeFragment | DocumentFragment,
    refNode: NodeFragment
  ): Null<DocumentFragment | NodeFragment>;
  removeChild(node: NodeFragment): NodeFragment;
  _removeChildNoFail(
    node: Null<NodeFragment | DocumentFragment>
  ): Null<DocumentFragment | NodeFragment>;
  replaceChild(newNode: NodeFragment, oldNode: NodeFragment): NodeFragment;
  empty(): void;
  extend(node: NodeFragment): void;
  shrink(node: NodeFragment): void;
  getDocumentFragment(): DocumentFragment | undefined;
  hasChildNodes(): boolean;
  prepend(node: NodeFragment): void;
  append(node: NodeFragment): void;
  before(node: NodeFragment): void;
  after(node: NodeFragment): void;
  replace(node: NodeFragment): void;
  remove(): void;
  contains(node: TBaseFragment): boolean;
}
