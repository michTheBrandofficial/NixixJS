const esbuildOptions = {
  jsxFactory: 'Nixix.create',
  jsxFragment: '"fragment"',
  jsxImportSource: 'nixix',
  jsxDev: false,
  jsx: 'transform',
  jsxInject: "import Nixix from 'nixix/dom';",
  minifyIdentifiers: true,
};

const devEsbuildOptions = {
  jsxFactory: 'Nixix.create',
  jsxFragment: "'fragment'",
  jsxImportSource: './index.js',
  jsxInject: 'import Nixix from "dom"',
};

module.exports = { devEsbuildOptions, esbuildOptions };
