module.exports = function getPrototypeMethods(prototype) {
  return Object.getOwnPropertyNames(prototype).filter(function (name) {
    return (
      typeof prototype[name] === "function" && prototype.hasOwnProperty(name)
    );
  });
};
