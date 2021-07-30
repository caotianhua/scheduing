// mock数据
const express = require('express')
const app = express()
const webpack = require('webpack')
// var appData = require('./mock/mock.json')
var router = express.Router()
// 通过路由请求本地数据
app.use('/api', router)
// app.get('/', function (req, res) { //请求，响应
//   res.send('<h1>服务器已经起动了</h1>')
// })

// app.listen(8080, function () {  //监听9093端口
//   console.log('node app start at port 8080')
// })
module.exports = {

  // publicPath: '/',  //本地开发
  publicPath: './', // 打包时

  // publicPath:'/',    // 公共路径
  outputDir: process.env.NODE_ENV === 'development' ? 'devdist' : 'dist', // 不同的环境打不同包名
  lintOnSave: false, // eslint开关
  // webpack-dev-server 相关配置
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })

    ]
    // "import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" } // `style: true` 会加载 less 文件
  },
  devServer: {
    port: 8080,
    //  host: 'localhost',
    host: '0.0.0.0',

    https: false, // true转化为https 要想调用摄像头，可以设置为true
    open: true,
    disableHostCheck: true,
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery'
    //   })
    // ]
    proxy: {
      '/apiix': { // 要代理的接口名

        target: 'http://192.168.2.105:6080/', // 要代理的接口地址
        ws: true, // true如果要代理websockets
        secure: false, // 如果是https接口，需要配置这个参数哦
        changeOrigin: true, // 允许跨域
        pathRewrite: { '^/apiix': '' } // 接口名重写
      }
    }
    //  添加before方法
    // before(app) {
    //    app.get('/login', (req, res) => {
    //      res.json({
    //        errno: 0,
    //      })
    //    })
    //  }

  },

  pluginOptions: {
    moment: {
      locales: [
        ''
      ]
    }
  }
}
