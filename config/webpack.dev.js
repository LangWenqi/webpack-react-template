const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const { merge } = require('webpack-merge')
const path = require("path");
const fs = require("fs");
const devServer = require("./devServer");
const webpackBaseConfig = require("./webpack.base");
const paths = require("./paths");

function getDevExtends () {
  let webpackExtends = null;

  if (fs.existsSync(paths.extends)) {
    webpackExtends = require(paths.extends);
  }
  
  let devServerExtends = {};
  let devExtends = {}
  
  if (webpackExtends && webpackExtends.dev) {
    devExtends = { ...webpackExtends.dev, devServer: undefined };
    if (webpackExtends.dev.devServer) {
      devServerExtends = webpackExtends.dev.devServer;
    }
  }
  return {
    devExtends,
    devServerExtends
  }
}

const { devExtends, devServerExtends } = getDevExtends();

const devCompiler =  merge(devServer, devServerExtends);

const webpackDevConfig = merge(webpackBaseConfig, {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:${devCompiler.port}`]
      }
    }),
    // webpack5引用三方插件 process is undefined
    new webpack.DefinePlugin({
      "process.platform": JSON.stringify(process.platform),
      "process.env.TERM": JSON.stringify(process.env.TERM),
      "process.env.WDS_SOCKET_HOST": JSON.stringify(process.env.WDS_SOCKET_HOST),
      "process.env.WDS_SOCKET_PORT": JSON.stringify(process.env.WDS_SOCKET_HOST),
      "process.env.WDS_SOCKET_PATH": JSON.stringify(process.env.WDS_SOCKET_PATH),
      "process.env.FAST_REFRESH": JSON.stringify(process.env.FAST_REFRESH)
    }),
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
    })
  ]
}, devExtends)

const compiler = webpack(webpackDevConfig);
const server = new WebpackDevServer(
  // webpack基础配置
  compiler,
  // devserver配置
  devCompiler
);
// 终止进程时，关闭服务
["SIGINT", "SIGTERM"].forEach(signal => {
  process.on(signal, () => {
    server.close(() => {
      // 正常退出
      process.exit(0);
    });
  });
});
// 监听端口
server.listen(devCompiler.port);
