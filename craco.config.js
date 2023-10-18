const CracoAlias = require("craco-alias");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "jsconfig",
        jsConfigPath: "jsconfig.paths.json",
      },
    },
    {
      plugin: require("craco-cesium")(),
    },
    {
      plugin: HtmlWebpackPlugin,
      options: {
        template: './public/index.html',
      },
    },
  ],
};
