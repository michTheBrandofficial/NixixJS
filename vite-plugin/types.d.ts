import { Plugin as Plugin_2 } from 'vite';

export declare const esbuildOptions: {
  jsxFactory: 'Nixix.create';
  jsxFragment: '"fragment"';
  jsxImportSource: 'nixix';
  jsxDev: false;
  jsx: 'transform';
  jsxInject: "import Nixix from 'nixix/dom';";
  minifyIdentifiers: true;
};

export declare const devEsbuildOptions: {
  jsxFactory: 'Nixix.create';
  jsxFragment: "'fragment'";
  jsxImportSource: './index.js';
  jsxInject: 'import Nixix from "dom"';
};

/**
 * This function for HMR in NixixJS is experimental
 */
export default function NixixHMR(
  projectRoot?: `${string}/${string}`,
  dev?: boolean
): Plugin_2[];
