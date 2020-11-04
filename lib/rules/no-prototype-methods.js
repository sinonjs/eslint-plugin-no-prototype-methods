"use strict";

/**
 * getPrototypeMethods
 *
 * @param {object} prototype
 * @returns {Array} Array of method names from the prototype
 */
function getPrototypeMethods(prototype) {
  return Object.getOwnPropertyNames(prototype).filter(function (name) {
    return (
      typeof prototype[name] === "function" && prototype.hasOwnProperty(name)
    );
  });
}

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

      if (DISALLOWED_OBJECT_PROPS.indexOf(propName) > -1) {
        context.report({
          message:
            "Do not access {{obj}} prototype method '{{prop}}' from target object.",
          loc: node.callee.property.loc.start,
          data: {
            obj: "Object",
            prop: propName,
          },
          node: node,
        });
      } else if (DISALLOWED_ARRAY_PROPS.indexOf(propName) > -1) {
        context.report({
          message:
            "Do not access {{obj}} prototype method '{{prop}}' from target object.",
          loc: node.callee.property.loc.start,
          data: {
            obj: "Array",
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
