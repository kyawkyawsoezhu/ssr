const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: path.resolve("dist/index.html")
});
const cleanPlugin = new CleanWebpackPlugin(["dist"], {
  root: path.resolve()
});
const cssExtractPlugin = new MiniCssExtractPlugin({
  filename: "[name].[hash].css",
  chunkFilename: "[id].[hash].css"
});
const optimizeCSSPlugin = new OptimizeCSSAssetsPlugin();
const uglifyJSPlugin = new UglifyJsPlugin({
  cache: true,
  parallel: true,
  sourceMap: true
});
const dotenv = new Dotenv();

module.exports = {
  name: "client",
  mode: "production",
  devtool: "source-map",
  entry: "./src/client.js",
  output: {
    path: path.resolve("dist/assets"),
    filename: "[name].[hash].js"
  },
  optimization: {
    minimizer: [uglifyJSPlugin, optimizeCSSPlugin]
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
        loader: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [htmlPlugin, cleanPlugin, cssExtractPlugin,dotenv]
};
