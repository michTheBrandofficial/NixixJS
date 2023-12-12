import { join, normalize } from "path";

export default function NixixHMR(projectRoot, dev) {
  const plugin = {
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
            Object.entries(nixixStore)?.forEach(([k]) => {
              if (k === "root") return;
              // @ts-ignore
              delete nixixStore[k];
            });
            agnosticRouteObjects.length = 0;
            // @ts-ignore
            (nixixStore?.root)?.replaceChildren?.("");
        
            newMod?.default?.();
          });
        };
        import { nixixStore } from "nixix/dom";
        import { agnosticRouteObjects } from "nixix/router/utils";
        `;
        return {
          code: `${prelude}${code}`,
        };
      }
    },
  };

  return [plugin];
}

export const esbuildOptions = {
  jsxFactory: "Nixix.create",
  jsxFragment: '"fragment"',
  jsxImportSource: "nixix",
  jsxDev: false,
  jsx: "transform",
  jsxInject: "import Nixix from 'nixix/dom';",
  minifyIdentifiers: true,
};

export const devEsbuildOptions = {
  jsxFactory: "Nixix.create",
  jsxFragment: "'fragment'",
  jsxImportSource: "./index.js",
  jsxInject: 'import Nixix from "dom"',
};

