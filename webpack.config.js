const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
  dev: {
    plugins: [
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`这是扩展文件: http://localhost:${1027}`]
        }
      })
    ],
    devServer: {
      port: 1027
    }
  },
  build: null
}
