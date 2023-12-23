import { transformSync, types as t } from "@babel/core";

/**
 * @typedef {import('vite').Plugin } Plugin
 */

/* 
export default function (babel) {
  const { types: t } = babel;

  return {
    name: "ast-transform", // not required
    visitor: {
      JSXOpeningElement(path) {
        const propsNode = path.get("attributes");

        const newPropsNode = t.arrowFunctionExpression(
          [],
          // if the props are there, create them, else, make the func return null

          !propsNode.length
            ? t.nullLiteral()
            : t.objectExpression(
                propsNode.map((attr) => {
                  const key = t.isJSXIdentifier(attr.node.name) ? t.stringLiteral(attr.node.name.name) : t.cloneNode(attr.node.name);

                  const value = t.isJSXExpressionContainer(attr.node.value)
                    ? attr.node.value.expression
                    : t.cloneNode(attr.node.value);
                  return t.objectProperty(key, value);
                })
              )
        );

        const childrenNode = path.parentPath.get("children");

        const newChildrenNode = t.arrowFunctionExpression(
          [],
          t.arrayExpression(childrenNode.map((child) => {
            let returnedValue = '';
            t.isJSXText(child.node) && (returnedValue = t.stringLiteral(child.node.value));
            t.isJSXExpressionContainer(child.node) ? (returnedValue = child.node.expression) : child.node
            return (t.isJSXText
          })),
          false
        );

        path.pushContainer("attributes", newPropsNode);
      }
    }
  };
}

*?/

import { createFilter } from "@rollup/pluginutils";

/**
 * <> jaj <View /> </>
 * target --> (Nixix.create('fragment', () => null, () => ['jaj', Nixix.create(View, () => null)]))
 * 
 * @returns {import('@types/babel__core').PluginItem}
 */
function babelPlugin() {
  return {
    name: "custom-reactive-plugin",
    visitor: {
      JSXOpeningElement(path) {
        const propsNode = path.get("attributes");
        if (!propsNode.length) return;
        console.log(propsNode[0].node.name.name)
        
        // attr.node.name.name, attr.node.value

        const newPropsNode = t.jsxAttribute(
          t.jsxIdentifier("props"),
          t.jsxExpressionContainer(
            // make an arrowFunctionExpression
            t.arrowFunctionExpression(
              [],
              t.objectExpression(propsNode.map((attr) => t.objectProperty(attr.node.name, attr.node.value)))
            )
          )
            
          );
          t.stringl

        // path.pushContainer("attributes", newPropsNode);
      },
    }
      JSXSpreadChild(path) {
        path.node
      }
    }
  }
}

/**
 * @param {{exclude?: string[], include?: string[]}} options
 */
export function nixixPlugin(options = {}) {
  const filter = createFilter(options.include || [], options.exclude || []);
  /**
   * @type Plugin
   */
  const plugin = {
    name: "nixix:store-reactivity",
    enforce: "pre",
    transform: (code, id) => {
      if (
        !/\.jsx/.test(id) ||
        !/\.tsx/.test(id) ||
        id.includes("node_modules") ||
        id.includes("?worker") ||
        !filter(id)
      )
        return;

      const { ast } = transformSync(code, { ast: true, plugins: [babelPlugin
      ()]}) || {};
    },
  };

  return [plugin];
}
