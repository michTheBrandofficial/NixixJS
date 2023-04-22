export class Signal {
  /**
   * @param {any} value
   * @param {number} id
   */
  constructor(value, id) { 
    this['value'] = value;
    this['$$__id'] = id;
  }
}



export class Store {
  /**
   * @typedef {import('../types').StoreClass} StoreClass
   * @param {{value: any, id: number | string, name?: string | null, firstValue?: number}} param0
   * @interface StoreClass
   */
  constructor({value, id, name}) {
    this['$$__id'] = id;
    name ? this['$$__name'] = `['${name}']` : null;
    value ? this['$$__value'] = value : null;

    if (value !== null) {
      Object.entries(value).forEach(obj => {
        this[obj[0]] = new Store({ value: null, id: `_${id}_`, name: obj[0]} );
        addStoreChildren(obj[1], `_${id}_`, this[obj[0]]);
      })
    };
  }
}



/* 
  addStoreChildren(firstObjValue[1], id, this[firstObjValue[0]])

  parent[objKey] = new Store()
*/

/**
 * 
 * @param {string | boolean | object | number} children 
 * @param {number | string} id 
 * @param {Store} [parent] 
 */
function addStoreChildren(children, id, parent) {
  if (children instanceof Object) {
    // change this to a for loop
    Object.entries(children).forEach(child => {
      parent[child[0]] = new Store({value: null, id: id, name: `${parent.$$__name.replace(`['`, '')}['${child[0]}`});
  
      addStoreChildren(child[1], `${id}`, parent[child[0]]);
    })
  } else {
    return;
  }
}