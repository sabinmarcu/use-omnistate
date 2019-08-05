const makeConfig = (config = {}) => {
  Object.assign(
    { modules: true },
    config,
  );
  return {
    "presets": [
      ["@babel/env", config],
      "@babel/flow"
    ]
  }
}

module.exports = makeConfig();
module.exports.makeConfig = makeConfig;