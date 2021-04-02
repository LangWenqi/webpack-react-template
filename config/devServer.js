const config = require('./config');
/**
 * 获取开发配置信息
 */
const devServer = {
  // 当使用内联模式(inline mode)时，在开发工具(DevTools)的控制台(console)将显示消息
  clientLogLevel: "warn",

  // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台
  quiet: true,

  // 参考：https://www.webpackjs.com/configuration/stats/#stats
  stats: "errors-only",

  // 诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏
  noInfo: true,

  // 出现编译器错误或警告时，在浏览器中显示全屏覆盖
  // overlay: {
  //   errors: true,
  //   warnings: false
  // },

  // 是否自动打开浏览器预览
  open: false,

  // 打开浏览器的显示URL路径
  openPage: "",

  // The Unix socket to listen to (instead of a host)
  // socket: "socket",

  // 此模式使用ws作为服务器，并在客户端上使用本机WebSocket
  transportMode: "ws",

  // 启动时通过ZeroConf网络广播服务器
  // bonjour:true,

  // 添加访问服务器白名单
  // allowedHosts: [],

  // 此选项将绕过主机检查，不建议这样做，因为不检查主机的应用容易受到DNS重新绑定攻击的攻击
  disableHostCheck: false,

  // 一切服务都启用gzip 压缩
  // compress: false,

  // 在所有响应中添加首部内容
  // headers: {},

  // mime文件映射表
  // mimeTypes: {},

  // 当使用内联模式(inline mode)并代理 dev-server 时，内联的客户端脚本并不总是知道要连接到什么地方
  // public: "",

  // 此路径下的打包文件可在浏览器中访问
  // publicPath: "",

  // 启用服务的根路径，默认所在的目录就是项目的根目录
  contentBase: config.dev.output.path,

  // 将指定URL映射成contentBase访问
  // contentBasePublicPath: "/serve-content-base-at-this-url",

  // 告诉服务器监听文件变化路径位置
  // watchContentBase: "",

  // 检测文件配置高级选项
  // watchOptions: {},

  // 静态文件高级配置
  // staticOptions: {},

  // 告诉devServer将编译内容写入磁盘
  writeToDisk: false,

  // 默认访问文件
  index: "index.html",

  // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
  historyApiFallback: true,

  // webpack 不监听文件的变化，每次请求来的时候重新编译，在惰性模式，每个请求结果都会产生全新的编译
  // lazy: true,

  // 在惰性模式中，此选项可减少编译，使用 filename，可以只在某个文件被请求时编译
  // filename: "vendors.js",

  // 在 dev-server 的两种不同模式之间切换
  // inline | iframe 
  inline: true,

  // 检测到文件更改是否刷新浏览器
  liveReload: false,

  // 启用 webpack 的模块热替换特性
  hot: true,

  // 是否在构建失败时将页面刷新作为后备选择
  hotOnly: true,

  // 使用http2服务
  // http2: true,

  // 带有 HTTPS 的 HTTP/2 提供服务
  // https: true,

  // 指定SSL .pfx文件的路径
  // pfx: "",

  // The passphrase to a SSL PFX file
  // pfxPassphrase: "passphrase",

  // 此选项使浏览器可以使用您的本地IP打开
  // useLocalIp: true,

  // 如果希望局域网IP访问可以添加参数
  // host: "0.0.0.0",

  // 指定要监听请求的端口号
  port: config.dev.port,

  // 配置代理服务设置
  proxy: config.dev.proxy || {},

  // 提供在服务器内部先于所有其他中间件执行自定义中间件的功能，可以自定义处理
  before(app) {
      
  },

  // 提供在服务器内部在所有其他中间件之后执行自定义中间件的功能
  after(app) {
  }
};

module.exports = devServer;