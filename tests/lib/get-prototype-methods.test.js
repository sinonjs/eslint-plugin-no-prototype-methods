"use strict";

var assert = require("@sinonjs/referee-sinon").assert;
var getPrototypeMethods = require("../../lib/get-prototype-methods");

describe("getPrototypeMethods", function () {
  it("returns only own methods", function () {
    var obj = {
      // eslint-disable-next-line no-empty-function
      hello: function () {},
      // eslint-disable-next-line no-empty-function
      world: function () {},
      apple: "pie",
    };

    var actual = getPrototypeMethods(obj);

    assert.equals(actual, ["hello", "world"]);
  });
});
