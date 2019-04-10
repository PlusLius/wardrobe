const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebPackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode:'development',
  devtool:'source-map',
  devServer:{
    contentBase:path.join(__dirname,'../src'),
    compress:true,
    port:8080,
    historyApiFallback:true
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
        loader:'babel-loader',
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
    })
  ]
}
