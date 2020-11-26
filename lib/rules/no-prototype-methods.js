"use strict";

var getPrototypeMethods = require("../get-prototype-methods");

var DISALLOWED_ARRAY_PROPS = getPrototypeMethods(Array.prototype);
var DISALLOWED_OBJECT_PROPS = getPrototypeMethods(Object.prototype);

module.exports = {
  meta: {
    docs: {
      description: "disallow calling prototype methods directly",
      category: "Possible Errors",
      recommended: false,
      url: "https://github.com/sinonjs/no-prototype-builtins",
    },
    schema: [],
    type: "problem",
  },
  create: function (context) {
    /**
     * Reports if a disallowed property is used in a CallExpression
     *
     * @param {object} node The CallExpression node.
     * @returns {void}
     */
    function disallowBuiltIns(node) {
      if (
        node.callee.type !== "MemberExpression" ||
        node.callee.computed ||
        // allow static method calls
        node.callee.object.name === "Array" ||
        node.callee.object.name === "Object"
      ) {
        return;
      }
      var propName = node.callee.property.name;
      var isArray =
        (node.callee.object.object &&
          node.callee.object.object.name === "Array") ||
        node.callee.object.type === "ArrayExpression";
      var isObject =
        node.callee.object.object &&
        node.callee.object.object.name === "Object";

      if (isObject && DISALLOWED_OBJECT_PROPS.indexOf(propName) > -1) {
        context.report({
          message:
            "Do not access Object prototype method '{{prop}}' from target object.",
          loc: node.callee.property.loc.start,
          data: {
            prop: propName,
          },
          node: node,
        });
      }

      if (isArray && DISALLOWED_ARRAY_PROPS.indexOf(propName) > -1) {
        context.report({
          message:
            "Do not access Array prototype method '{{prop}}' from target object.",
          loc: node.callee.property.loc.start,
          data: {
            prop: propName,
          },
          node: node,
        });
      }
    }

    return {
      CallExpression: disallowBuiltIns,
    };
  },
};
