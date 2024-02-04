class Component {
  /**
   * This function is used to bind event handlers that are methods of the sub classes of `Component`
   */
  static bindEvent<T extends Function = Function>(fn: T) {
    return fn.bind(this);
  }

  /**
   * This function is used to render the jsx
   */
}

export default Component;