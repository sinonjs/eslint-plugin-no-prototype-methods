"use strict";

var rule = require("../../../lib/rules/no-prototype-methods");
var RuleTester = require("eslint").RuleTester;
var getPrototypeMethods = require("../../../lib/get-prototype-methods");
var ruleTester = new RuleTester();

var arrayMethods = getPrototypeMethods(Array.prototype);
var INVALID_ARRAY_EXAMPLES = [].concat(
  arrayMethods.map(createInvalidArrayPrototypeExample),
  arrayMethods.map(createInvalidArrayLiteralExample)
);

function createInvalidArrayPrototypeExample(propertyName) {
  // Array.prototype.constructor has a function name of `Array` not `constructor`
  if (propertyName === "constructor") {
    return {
      code: "Array.prototype.constructor()",
      errors: [
        {
          message:
            "Do not access Array prototype method 'constructor' from target object.",
          type: "CallExpression",
        },
      ],
    };
  }

  return {
    code: "Array.prototype." + propertyName + "()",
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

function createInvalidArrayLiteralExample(propertyName) {
  // Array.prototype.constructor has a function name of `Array` not `constructor`
  if (propertyName === "constructor") {
    return {
      code: "[].constructor()",
      errors: [
        {
          message:
            "Do not access Array prototype method 'constructor' from target object.",
          type: "CallExpression",
        },
      ],
    };
  }

  return {
    code: "[]." + propertyName + "()",
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

var objectMethods = getPrototypeMethods(Object.prototype);
var INVALID_OBJECT_EXAMPLES = [].concat(
  objectMethods.map(createInvalidObjectPrototypeExample)
);

function createInvalidObjectPrototypeExample(propertyName) {
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

ruleTester.run("no-prototype-methods", rule, {
  valid: [],
  invalid: INVALID_OBJECT_EXAMPLES.concat(INVALID_ARRAY_EXAMPLES),
});
