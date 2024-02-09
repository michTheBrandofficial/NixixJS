import { type Primitive } from "./types";

export interface Signal {
  value: Primitive,
  readonly $$__reactive: true,
  $$__effects?: CallableFunction[],
  toJSON(): Primitive;
  [index: symbol]:  () => Primitive;
}



export class Signal {
  constructor(public value: Primitive, public readonly $$__reactive: true, public $$__effects?: CallableFunction[]) {
    const symbol = Symbol.toPrimitive
    this[symbol] = function toPrimitive() {
      return this.value;
    }

  }

  toJSON() {
    return this.value;
  }
}

