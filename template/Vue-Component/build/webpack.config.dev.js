/**
 * 本地预览
 */

const path = require("path");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.config.base.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(webpackBaseConfig, {
  mode: "development",
  // 入口
  entry: {
    main: "./example/index",
    vendors: ["vue"]
  },
  // 输出
  output: {
    path: path.join(__dirname, "../example/dist"),
    publicPath: "",
    filename: "[name].js",
    chunkFilename: "[name].chunk.js"
  },
  resolve: {},
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  devtool: "#eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: "index.html",
      template: path.join(__dirname, "../example/index.html")
    }),
    // new BundleAnalyzerPlugin()
  ],
  devServer: {
    port: 8000,
    compress: true,
    open: true,
    hot: true
  }
});
