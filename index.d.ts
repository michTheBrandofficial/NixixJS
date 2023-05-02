import Nixix from "nixix-types";

export {}

declare global {
  namespace Nixix {}
  interface Window {
    Store: {
      [index: string]: any;
    };
    SignalStore: {
      [index: string]: any;
    };
    '$$__lastReactionProvider': 'store' | 'signal',
    storeCount: number;
    diffStore: (id: number) => Promise<void>;
    signalCount: number;
    diffSignal: (id: number) => Promise<void>;
  }
}
