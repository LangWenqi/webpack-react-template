const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const paths = require("./paths");
const antdTheme = require(paths.theme);

/**
 * 获取生产环境和开发环境CSS Loader配置
 */
const getCssLoader = function(isProduction, cssOptions, preProcessor) {

  const loaders = [
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    "postcss-loader"
  ];

  if (isProduction) {
    loaders.unshift(MiniCssExtractPlugin.loader);
  } else {
    loaders.unshift("style-loader");
  }
  if (preProcessor) {
    const loader = {
      loader: require.resolve(preProcessor),
      options: {}
    }
    if (preProcessor === "less-loader") {
      loader.options.lessOptions = {
        modifyVars: {...antdTheme()},
        javascriptEnabled: true
      } 
    }
    loaders.push(loader);
    if (preProcessor === "sass-loader") {
      loader.options.implementation = require("sass");
      loaders.push(
        {
          loader: "sass-resources-loader",
          options: {
            resources: [
              path.resolve(paths.src, "./styles/variable.scss"),
              path.resolve(paths.src, "../src/styles/mixin.scss"),
            ],
          }
        }
      );
    }
  }
  
  return loaders;
};

module.exports = getCssLoader;