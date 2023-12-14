export class Signal implements SignalObject<any> {
  value: any;
  $$__id: number;
  constructor(value: any, id: number) {
    this['value'] = value;
    this['$$__id'] = id;
  }
}

