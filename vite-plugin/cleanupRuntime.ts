import { agnosticRouteObjects } from "../router/utils";
import { nixixStore } from "../dom/index";

export function $$cleanupNixixRuntime(newMod: {
  default: CallableFunction
}) {
  nixixStore?.root?.replaceChildren?.('');
  Object.entries(nixixStore).forEach(([k]) => delete nixixStore[k])
  agnosticRouteObjects.length = 1;
  newMod?.default ? newMod.default() : (new Error(`You didn't wrap the render function call in a function that is default exported.`)) 
}
