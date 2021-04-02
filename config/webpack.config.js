const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const { merge } = require('webpack-merge');
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const webpackBaseConfig = require("./webpack.base");
const paths = require("./paths");

function getBuildExtends () {
  let webpackExtends = null;

  if (fs.existsSync(paths.extends)) {
    webpackExtends = require(paths.extends);
  }
  
  let buildExtends = {}
  
  if (webpackExtends && webpackExtends.build) {
    buildExtends = { ...webpackExtends.build };
  }
  return {
    buildExtends
  }
}

const { buildExtends } = getBuildExtends();

const webpackBuildConfig = merge(webpackBaseConfig, {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: paths.build,
          globOptions: {
            ignore: ["**/index.html"]
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      hash: false,
      filename: "index.html",
      template: path.resolve(paths.public, "./index.html"),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      ignoreOrder: true,
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css"
    })
   
  ]
}, buildExtends)

webpack(webpackBuildConfig, (err, stats) => {
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    // 未捕获的致命异常
    process.exit(1);
  }

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
});