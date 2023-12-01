export function asyncComponent(FC: () => Promise<JSX.Element>): any {
  return FC;
}

export const lazy = asyncComponent;