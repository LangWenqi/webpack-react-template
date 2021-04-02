/**
 * 切割代码块规则配置
 */
const splitChunks = {
  // "initial" | "all"(推荐) | "async" (默认就是async)
  // async表示只从异步加载得模块（动态加载import()）里面进行拆分
  // initial表示只从入口模块进行拆分
  // all表示以上两者都包括

  // 如果此处设置all，下面cacheGroups默认与此处相同，也可在下面单独设置
  chunks: "async",
  minSize: 30720,
  maxSize: 3145728,
  // 最小 chunk ，默认1
  minChunks: 1,
  // 最大异步请求数， 默认5
  maxAsyncRequests: 6,
  // 最大初始化请求数，默认3
  maxInitialRequests: 4,
  // 打包分隔符
  automaticNameDelimiter: "-",
  // / 这里开始设置缓存的 chunks
  cacheGroups: {
    common: {
      name: "common",
      chunks: "all",
      // 属性的值为数字，可以为负数。作用是当缓存组中设置有多个拆分规则，而某个模块同时符合好几个规则的时候，则需要通过优先级属性priority来决定使用哪个拆分规则。
      // 优先级高者执行。我这里给common设置的优先级为-20，给venders设置的优先级为-10，这样当一个第三方库被引用超过2次的时候，就不会打包到业务模块里了。
      priority: -20,
      // 在分割之前，这个代码块最小应该被引用的次数（译注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
      minChunks: 2,
      reuseExistingChunk: true
    },
    vendors: {
      // 要缓存的 分隔出来的 chunk 名称 
      name: "vendors",
      // 分割所需最小体积
      // minSize: 30000,
      // 用于控制哪些模块被这个缓存组匹配到。原封不动传递出去的话，它默认会选择所有的模块。可以传递的值类型：RegExp、String和Function
      test: /[\\/]node_modules[\\/]/,
      // (打包的chunks的名字)：字符串或者函数(函数可以根据条件自定义名字)
      chunks: "all",
      priority: -10
    },
    react: {
      name: "react",
      test: /[\\/]node_modules[\\/](scheduler|react|react-dom|prop-types)/,
      chunks: "all",
      enforce: true
    },
    antd: {
      name: "antd",
      test: /[\\/]node_modules[\\/](@ant-design|antd)/,
      chunks: "all"
    },
    styles: {
      name: "styles",
      test: /\.css$/,
      chunks: "all",
      enforce: true
    }
  }
};

module.exports = splitChunks;