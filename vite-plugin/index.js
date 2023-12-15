import { join, normalize } from "path";

/**
 * @typedef {import('vite').Plugin} Plugin
 * @param {{hmr?: boolean, dev?: boolean}} param0 
 */
export function NixixPlugin({hmr, dev}) {
  /**
   * @type {Plugin}
   */
  const reactivityplugin = {
    name: "nixix-reactivity",
    apply: () => {
      return true;
    },

    async transform(code, id) {
      // if file extension is not ts | js | jsx | tsx.
      if (/node_modules/.test(id) || !/\.(t|j)sx?$/.test(id)) return;
        return {
          code: `${code}`,
        };
    },
  };

  const plugins = [reactivityplugin];
  hmr && plugins.push(...NixixHMR(null, dev))
  return plugins;
}

export default function NixixHMR(projectRoot, dev) {
  const hmrplugin = {
    name: "nixix-vite-hmr",
    apply: "serve",

    async transform(code, id) {
      // if file extension is not ts | js | jsx | tsx.
      if (/node_modules/.test(id) || !/\.(t|j)sx?$/.test(id)) return;
      // project root
      const root = projectRoot?.split?.("/") || ["src", "index.tsx"];
      const path = normalize(join(`${process.cwd()}`, ...root));
      const regExp = normalize(id).includes(path);
      if (regExp) {
        const prelude = `if (import.meta.hot) {
          import.meta.hot?.accept((newMod) => {
            delete nixixStore['$$__routeStore']
            agnosticRouteObjects.length = 0;
            // @ts-ignore
            (nixixStore?.root)?.replaceChildren?.("");
        
            newMod?.default?.();
          });
        };
        import { agnosticRouteObjects } from "${dev ? 'router/utils' : 'nixix/router/utils'}";
        `;
        return {
          code: `${prelude}${code}`,
        };
      }
    },
  };

  return [hmrplugin];
}

const esbuildOptions = {
  jsxFactory: "Nixix.create",
  jsxFragment: '"fragment"',
  jsxImportSource: "nixix",
  jsxDev: false,
  jsx: "transform",
  jsxInject: "import Nixix, { nixixStore, turnOnJsx } from 'nixix/dom';",
  minifyIdentifiers: true,
};

const devEsbuildOptions = {
  jsxFactory: "Nixix.create",
  jsxFragment: "'fragment'",
  jsxImportSource: "./index.js",
  jsxInject: 'import Nixix, { nixixStore, turnOnJsx } from "dom"',
};

export { devEsbuildOptions, esbuildOptions };
