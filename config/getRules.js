const getCssLoader = require("./getCssLoader");
const paths = require("./paths");
const config = require("./config");
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

/**
 * 获取加载Loader配置规则
 */

const getRules = function(isProduction) {
  return [
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      enforce: 'pre',
      use: [
        {
          options: {
            cache: false,
            // formatter: require.resolve('react-dev-utils/eslintFormatter'),
            eslintPath: require.resolve('eslint'),
            // resolvePluginsRelativeTo: __dirname,
            // configFile: path.join(__dirname, '../.eslintrc'),
            useEslintrc: true
          },
          loader: require.resolve('eslint-loader'),
        },
      ],
      include: paths.src,
    },
    {
      oneOf: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ["babel-loader", "ts-loader"]
        },
        {
          test: cssRegex,
          exclude: [cssModuleRegex],
          use: getCssLoader(isProduction, {
            importLoaders: 1,
            sourceMap: !isProduction
          })
        },
        {
          test: cssModuleRegex,
          // exclude: [/node_modules/],
          use: getCssLoader(isProduction, {
            importLoaders: 1,
            sourceMap: !isProduction,
            modules: {
              localIdentName: "[path]-[name]--[local]--[hash:5]"
            },
          }),
        },
        {
          test: lessRegex,
          exclude: [lessModuleRegex],
          use: getCssLoader(isProduction, {
            importLoaders: 1,
            sourceMap: !isProduction
          }, 'less-loader')
        },
        {
          test: lessModuleRegex,
          // exclude: [/node_modules/],
          use: getCssLoader(isProduction, {
            importLoaders: 1,
            sourceMap: !isProduction,
            modules: {
              localIdentName: "[path]-[name]--[local]--[hash:5]"
            },
          }, 'less-loader'),
        },
        {
          test: sassRegex,
          exclude: [sassModuleRegex],
          use: getCssLoader(isProduction, {
            importLoaders: 1,
            sourceMap: !isProduction
          }, 'sass-loader')
        },
        {
          test: sassModuleRegex,
          // exclude: [/node_modules/],
          use: getCssLoader(isProduction, {
            importLoaders: 1,
            sourceMap: !isProduction,
            modules: {
              localIdentName: "[path]-[name]--[local]--[hash:5]"
            },
          }, 'sass-loader'),
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          issuer: /\.tsx?$/,
          use: [
            "babel-loader",
            {
              loader: "@svgr/webpack",
              options: {
                babel: false,
                icon: true
              }
            },
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                fallback: "file-loader",
                name: "images/[name].[hash:8].[ext]",
                publicPath: "/",
                esModule: false
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                fallback: "file-loader",
                name: "images/[name].[hash:8].[ext]",
                publicPath: "/",
                esModule: false
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "font/[name].[hash:8].[ext]",
                publicPath: "/",
                esModule: false
              }
            }
          ]
        }
      ]
    }
  ];
};

module.exports = getRules;