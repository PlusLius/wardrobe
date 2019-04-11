const path = require('path')
const webpack = require('webpack')

module.exports = {
  devServer:{
    open:true,
    overlay:true, //开启错误提示
    hot:true,
    contentBase:path.join(__dirname,'../src'),
    compress:true,
    port:8080,
    historyApiFallback:true,
    proxy:{ //配置接口代理
      '/':{ //让服务器代理去请求
        target:'https://m.weibo.cn',
        changeOrigin:true ,//设置跨域信息,
        logLevel:'debug', //查看请求信息/api/comments/show?id=41935867588333502&page=1 -> https://m.weibo.cn
        pathRewrite:{ //重写url将commentsurl重写api/comments去请求
          '^/comments':'/api/comments'
        }
      }
    }
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
