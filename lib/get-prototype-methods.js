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

module.exports = getPrototypeMethods;
