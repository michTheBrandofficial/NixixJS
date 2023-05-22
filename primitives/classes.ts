export class Signal implements SignalObject<any> {
  value: any;
  $$__id: number;
  constructor(value: any, id: number) { 
    this['value'] = value;
    this['$$__id'] = id;
  }
}



export class Store implements StoreObject {
  $$__id: string | number;
  $$__value?: any;
  $$__name?: string;
  constructor({value, id, name}: { value: any; id: number | string; name?: string | null; firstValue?: number; }) {
    this['$$__id'] = id;
    name ? this['$$__name'] = `['${name}']` : null;
    value ? this['$$__value'] = value : null;

    if (value !== null) {
      Object.entries(value).forEach((obj: [string, string]) => {
        this[obj[0]] = new Store({ value: null, id: `_${id}_`, name: obj[0]} );
        addStoreChildren(obj[1], `_${id}_`, this[obj[0]]);
      })
    };
  }
}

function addStoreChildren(children: string | boolean | object | number, id: number | string, parent: Store) {
  if (children instanceof Object) {
    // change this to a for loop
    Object.entries(children).forEach(child => {
      parent[child[0]] = new Store({value: null, id: id, name: `${parent.$$__name?.replace(`['`, '')}['${child[0]}`});
  
      addStoreChildren(child[1], `${id}`, parent[child[0]]);
    })
  } else {
    return;
  }
}