const { CheckerPlugin } = require("awesome-typescript-loader");
const { optimize } = require("webpack");
const { join } = require("path");
const CopyPlugin = require("copy-webpack-plugin");

let prodPlugins = [];

if (process.env.NODE_ENV === "production") {
  prodPlugins.push(
    new optimize.AggressiveMergingPlugin(),
    new optimize.OccurrenceOrderPlugin()
  );
}

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: "inline-source-map",
  entry: {
    contentscript: join(__dirname, "src/contentscript/contentscript.ts"),
  },
  output: {
    path: join(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: 'awesome-typescript-loader?{configFileName: "tsconfig.json"}',
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    ...prodPlugins,
    new CopyPlugin({
      patterns: [
        { from: "manifest.json", to: "" },
        { from: "src/assets", to: "assets" },
      ],
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
};
