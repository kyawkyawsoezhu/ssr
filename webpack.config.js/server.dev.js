const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
const nodemonPlugin = new NodemonPlugin();

module.exports = {
  name: "server",
  mode: "development",
  watch: true,
  target: "node",
  externals: [nodeExternals()],
  entry: "./src/server.js",
  output: {
    path: path.resolve("./"),
    filename: "server.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: "ignore-loader"
      }
    ]
  },
  plugins: [nodemonPlugin]
};
