const productionConfig = require('./webpack.pro.config')
const developmentConfig = require('./webpack.dev.config')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const generateConfig = env => {

  const resolve = (src) => path.join(__dirname,src)

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
    'postcss-loader',
    'less-loader'
  ] : [
    'style-loader',
    'css-loader',
    'postcss-loader',
    'less-loader'
  ]

  const fileLoader = []

  return {
    devtool:'source-map',
    resolve:{
      extensions:[
        '.js',
        '.jsx',
        '.json',
        '.png',
        '.svg'
      ],
      alias:{
         "@":resolve('../src')
      }
    },
    entry:{
      app:'./src/index.js'
    },
    output:{
      filename:'bundle.js',
      path:resolve('../dist')
    },
    module:{
      rules:[
        {
          test:/\.(js|jsx)$/,
          use:scriptLoader,
          exclude:'/node_modules/'
        },
        {
          test:/\.css$/,
          loader:[
            'style-loader',
            'css-loader',
            'postcss-loader'
          ],
          exclude:'/node_modules/'
        },
        {
          test:/\.less$/,
          loader:styleLoader,
          exclude:'/node_modules/'
        },
        {
          test:/\.(jpg|png|svg)$/,
          loader:'file-loader',
          exclude:'/node_modules/'
        },
        {
          test:/\.(eot|woff2?|ttf|svg)$/,
          loader:'file-loader',
          exclude:'/node_modules/'
        }
      ]
    },
    plugins:[
      new HtmlWebPackPlugin({
        template : resolve('../src/index.html'),
        filename:"index.html"
      })
    ]
  }
}

module.exports = env => {
  let config = env === 'production' ? productionConfig : developmentConfig
  return merge(generateConfig(env),config)
}
