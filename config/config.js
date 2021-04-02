const path = require("path");
const paths = require("./paths");

const config = {
  dev: {
    entry: [require.resolve("react-dev-utils/webpackHotDevClient"), path.resolve(paths.src, "./index.tsx")],
    
    output: {
      filename: "js/[name].[fullhash:8].js",
      path: paths.build,
      publicPath: "/"
    },
    port: 8080,
    proxy: {
			'/api': {
				target: 'http://192.168.138.26:8000',
				changeOrigin: true,
				onProxyReq(proxyReq, req, res) {
					// proxyReq.setHeader('cookie', `distribution=${req.headers.distribution}`)
        },
        // pathRewrite:{
        //   '^/api':''
        // }
      },
    },
    devtool : "source-map"
  },
  build: {
    entry: [path.resolve(paths.src, "./index.tsx")],
    output: {
      filename: "js/[name].[chunkhash:8].js",
      path: paths.build,
      publicPath: "/"
    },
    devtool : false
  }
}

module.exports = config;