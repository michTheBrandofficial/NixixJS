import { type Primitive } from "./types";

const primitivesMap = {
  'string': String,
  'boolean': Boolean,
  'number': Number
} as const

type KeyofPMap = keyof typeof primitivesMap

export class Signal {
  constructor(public value: Primitive, public readonly $$__reactive: true, public $$__effects?: CallableFunction[]) {
    const ClassConstructor = primitivesMap[typeof value as KeyofPMap] as (any);
    if (ClassConstructor) {
      class _Signal extends ClassConstructor {
        constructor(public value: any, public readonly $$__reactive: true, public $$__effects?: CallableFunction[]) {
          super(value)
        }
      } 
      return new _Signal(value, $$__reactive, []) as Signal
    } else return { value, $$__reactive, $$__effects: [] } as Signal
  }
}

