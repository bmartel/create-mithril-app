module.exports = function(api) {
  api.cache.using(() => process.env.NODE_ENV === "production");

  const isTest = process.env.NODE_ENV === 'test';
  const presets = [["@babel/preset-env", isTest ?  {"targets": { "node": "current" }} : { useBuiltIns: "entry" }]];
  const plugins = ["@babel/plugin-syntax-dynamic-import", "@babel/plugin-proposal-object-rest-spread"];

  return {
    presets,
    plugins,
  };
};
