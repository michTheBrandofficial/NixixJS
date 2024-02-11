import { EFFECT_STACK } from "./shared";
import { type Primitive } from "./types";

export class Signal {
  $$__reactive = true;
  $$__deps = new Set<CallableFunction>()

  constructor(private _value: Primitive) {
    const symbol = Symbol.toPrimitive
    // @ts-expect-error
    this[symbol] = function toPrimitive() {
      return this.value;
    }
  }

  public toJSON() {
    return this.value;
  }

  get value() {
    const RUNNING = EFFECT_STACK[EFFECT_STACK.length - 1];
    if (RUNNING) this.$$__deps?.add(RUNNING);
    return this._value
  }

  set value(newVal: Primitive) {
    this._value = newVal;
    this.$$__deps?.forEach(fn => fn?.())
  }

  public removeEffect(fn: CallableFunction) {
    if (this.$$__deps?.has(fn)) {
      this.$$__deps?.delete(fn) 
      return true;
    } else return false;
  }
}



