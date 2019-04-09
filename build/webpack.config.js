const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool:'source-map',
  resolve:{
    extensions:[
      '.js',
      '.json',
      '.jsx'
    ]
  },
  entry:{
    app:'./src/app.js'
  },
  output:{
    filename:'bundle.js',
    path:path.join(__dirname,'dist')
  },
  module:{
    rules:[
      {
        test:/\.js|jsx$/,
        loader:'babel-loader',
        exclude:'/node_modules/'
      },
      {
        test:/\.css$/,
        loader:[
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebPackPlugin({
      template : path.join(__dirname,"../src/index.html"),
      filename:"index.html"
    })
  ]
}
