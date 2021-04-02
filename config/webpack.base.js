
const WebpackBar = require("webpackbar");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const mode = process.env.NODE_ENV || "development";
const isProduction = mode === "production";
const isReport = process.env.report;

const config = require("./config");

const paths = require("./paths");

const splitChunks = require("./splitChunks");

const getRules = require("./getRules");

const getPlugin = function() {

  // 通用插件
  let basic = [
    new WebpackBar(),
  ];
  if (isReport) {
    basic.unshift(new BundleAnalyzerPlugin());
  }
  return basic;
};

/**
 * webpack 核心配置
 */
const webpackBaseConfig = {
  mode: mode,
  stats: "errors-only",
  devtool: isProduction ? config.build.devtool : config.dev.devtool,
  // context 是webpack entry的上下文，是入口文件所处的目录的绝对路径。默认情况下，当前项目根目录
  context: paths.root,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    alias: {
      "@": paths.src
    }
  },
  optimization: {
    moduleIds: "named",
    splitChunks: splitChunks,
  },
  performance: {
    //生成文件的最大体积,整数类型（以字节为单位）
    maxAssetSize: 3 * 1024 * 1024,
    //入口起点的最大体积,整数类型（以字节为单位）
    maxEntrypointSize: 3 * 1024 * 1024,
    //只给出 js 文件的性能提示, 提供资源文件名的断言函数
    // assetFilter: function(assetFilename) {
    //   return assetFilename.endsWith('.js') || assetFilename.endsWith('.css');
    // }
  },
  entry: isProduction ? config.build.entry : config.dev.entry,
  output: isProduction ? config.build.output : config.dev.output,
  module: {
    rules: getRules(isProduction)
  },
  plugins: getPlugin(isProduction)
};

module.exports = webpackBaseConfig;

