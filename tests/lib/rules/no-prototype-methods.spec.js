"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-prototype-methods");
var RuleTester = require("eslint").RuleTester;
var getPrototypeMethods = require("../../../lib/get-prototype-methods");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

var DISALLOWED_ARRAY_PROPS = getPrototypeMethods(Array.prototype).map(
  (propertyName) => {
    return {
      code: `Array.prototype.${propertyName}()`,
      errors: [
        {
          message:
            "Do not access Array prototype method '" +
            propertyName +
            "' from target object.",
          type: "CallExpression",
        },
      ],
    };
  }
);

var DISALLOWED_OBJECT_PROPS = getPrototypeMethods(Object.prototype).map(
  (propertyName) => {
    return {
      code: "Object.prototype." + propertyName + "()",
      errors: [
        {
          message:
            "Do not access Object prototype method '" +
            propertyName +
            "' from target object.",
          type: "CallExpression",
        },
      ],
    };
  }
);

ruleTester.run("no-prototype-methods", rule, {
  valid: [],
  invalid: DISALLOWED_OBJECT_PROPS.concat(DISALLOWED_ARRAY_PROPS),
});
