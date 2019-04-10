const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebPackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode:'development',
  devtool:'source-map',
  devServer:{
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
  resolve:{
    extensions:[
      '.js',
      '.jsx',
      '.json'
    ]
  },
  entry:{
    app:'./src/index.js'
  },
  output:{
    filename:'bundle.js',
    path:path.join(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        use:[
          {
            loader:'babel-loader'
          },
          {
            loader:'eslint-loader'
          }
        ],
        exclude:'/node_modules/'
      },
      {
        test:/\.css$/,
        loader:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        test:/\.less$/,
        loader:[
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test:/\.(jpg|png|svg)$/,
        loader:'file-loader'
      }
    ]
  },
  plugins:[
    new CleanWebPackPlugin(),
    new HtmlWebPackPlugin({
      template : path.join(__dirname,"../src/index.html"),
      filename:"index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
