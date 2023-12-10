import { agnosticRouteObjects } from "../router/utils";
import { nixixStore } from "../dom/index";
// @ts-ignore
export function $$cleanupNixixRuntime(newMod) {
  nixixStore?.root?.replaceChildren?.('');
  // @ts-expect-error
  Object.entries(nixixStore).forEach(([k]) => delete nixixStore[k])
  agnosticRouteObjects.length = 1;
  newMod?.default ? newMod.default() : (new Error(`You didn't wrap the render function call in a function that is default exported.`)) 
}
