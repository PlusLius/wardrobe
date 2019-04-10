const productionConfig = require('./webpack.pro.config')
const developmentConfig = require('./webpack.dev.config')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const generateConfig = env => {

  const scriptLoader = [
    {
      loader:'babel-loader'
    }
  ].concat(env === 'production' ? [] : [{
    loader:'eslint-loader'
  }])

  const styleLoader = env === 'production' ? [
    'style-loader',
    'css-loader',
    'less-loader'
  ] : [
    'style-loader',
    'css-loader',
    'less-loader'
  ]

  const fileLoader = []

  return {
    devtool:'source-map',
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
      path:path.join(__dirname,'../dist')
    },
    module:{
      rules:[
        {
          test:/\.(js|jsx)$/,
          use:scriptLoader,
          exclude:'/node_modules/'
        },
        {
          test:/\.less$/,
          loader:styleLoader
        },
        {
          test:/\.(jpg|png|svg)$/,
          loader:'file-loader'
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
}

module.exports = env => {
  let config = env === 'production' ? productionConfig : developmentConfig
  return merge(generateConfig(env),config)
}
