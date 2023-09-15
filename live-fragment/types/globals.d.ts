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
