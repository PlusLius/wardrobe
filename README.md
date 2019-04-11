## .editorconfig

[![Build Status](https://www.travis-ci.org/PlusLius/wardrobe.svg?branch=master)](https://www.travis-ci.org/PlusLius/wardrobe)

> 让不同的编辑器保持同样的代码风格

### 属性
```
indent_style: 设置缩进风格，tab或者空格。tab是hard tabs，space为soft tabs。
indent_size: 缩进的宽度，即列数，整数。如果indent_style为tab，则此属性默认为tab_width。
tab_width: 设置tab的列数。默认是indent_size。
end_of_line： 换行符，lf、cr和crlf
charset： 编码，latin1、utf-8、utf-8-bom、utf-16be和utf-16le，不建议使用utf-8-bom。
trim_trailing_whitespace： 设为true表示会除去换行行首的任意空白字符
insert_final_newline: 设为true表明使文件以一个空白行结尾
root: 表明是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件。
```

## 通配符

```
名称 | 描述
--- | ---|
* | 匹配除/之外的任意字符串
** | 匹配任意字符串
? |	匹配任意单个字符
[name] | 匹配name字符
[!name] |匹配非name字符
{s1,s2,s3} | 匹配任意给定的字符串(since 0.11.0)
```

## 实例

```
root = true

[*]
charset = utf-8 //所有文件使用utf-8编码

indent_style = space //使用空格缩进
indent_size = 2 //空格的长度为2

end_of_line = lf //设置换行符
insert_final_newline = true //空白行结尾
trim_trailing_whitespace = true //除去行首的任意空白字符

[*.json]
indent_size = 4 //json文件的缩进长度为4

```

## travis

> 用来持续构建的工具

```yml
language:node_js //设置语言
node_js: //语言版本
  - "7"
  - "8"
brancher: //跑构建的分支
  only:
    - "dev"
    - "master"
install: //下载软件包
  - "npm install"
script: //执行脚本
  - "npm run build"
```

## eslint配置

```js
module.exports = {
    'env': {//环境变量
        'browser': true,
        'commonjs': true,
        'es6': true
    },
    'extends': 'eslint:recommended',//使用最佳实践
    'globals': { //全局变量
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': { //解析参数
        'ecmaVersion': 2018
    },
    'rules': { //设置规则
        'indent': [//缩进
            'error',
            4
        ],
        'linebreak-style': [ //换行符
            'error',
            'unix'
        ],
        'quotes': [ //引号
            'error',
            'single'
        ],
        'semi': [ //分号
            'error',
            'never'
        ]
    }
}

```

## React环境搭建

```
使用@babel7 + webpack4

//.babelrc
{
  "presets":[
    "@babel/preset-env", //可以根据配置的目标浏览器或者运行环境来自动将ES2015+的代码转换为es5。
    "@babel/preset-react" //用来转换jsx语法
  ],
  "plugins": [
    "@babel/plugin-transform-runtime" //让js支持es6API,安装这个的同时也要安装@bebel/runtime，才能进行转换
  ]
}

```

### fetch的使用

```js
fetch('some-url', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(content)
})

fetch('some-url')
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject({
        status: response.status,
        statusText: response.statusText
      })
    }
  })
  .catch(error => {
    if (error.status === 404) {
      // do something about 404
    }
  })
```

```js
module.exports = {
  devtool:'source-map',
  devServer:{ //配置静态资源文件的打包路径
    hot:true,//开启热更新
    contentBase:path.join(__dirname,'../src'),
    compress:true, //开启gzip压缩
    port:8080 //指定端口
    historyApiFallback:true //指定history模式找不到页面时的跳转路径
    historyApiFallback:{ //写法
      rewrites:[ //重定向
        {
          from:'xxx/xxx'//url
          from :/^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9])/,
          to:''//重定向url
          to:function(context){
            return '/' + context.match[1] + context.match[2]
          }
        }
      ]
    },
     proxy:{ //配置接口代理
      '/':{ //让服务器代理去请求
        target:'https://m.weibo.cn',
        changeOrigin:true ,//设置跨域信息,
        logLevel:'debug', //查看请求信息/api/comments/show?id=41935867588333502&page=1 -> https://m.weibo.cn
        pathRewrite:{ //重写url将commentsurl重写api/comments去请求
          '^/comments':'/api/comments'
        },
        headers:{ //设置headers
          'Cookie':'xxx'
        }
      }
    }
  },
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
    rules:[ //将js或jsx文件中的代码块转换成符合规定的代码,会调用.babelrc里面的配置文件,根据里面的配置进行转换
      {
        test:/\.js|jsx$/,
        loader:'babel-loader',
        exclude:'/node_modules/'
      },
      {
        test:/\.css$/,
        loader:[
          'style-loader', //将css文件加入到html中
          'css-loader' //将css字符串转换成css文件
        ]
      },
      {
        test:/\.less$/,
        loader:[
          'style-loader', //将css文件加入到html中
          'css-loader', //将css字符串转换成css文件
          'less-loader' //先将less文件转换成css字符串
        ]
      },
      {
        test:/\.(jpg|png|svg)$/, //处理图片文件
        loader:'file-loader'
      }
    ]
  },
  plugins:[
    new CleanWebPackPlugin(),//清除dist目录下的文件
    new HtmlWebPackPlugin({
      template : path.join(__dirname,"../src/index.html"),
      filename:"index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),//开启热更新
    new webpack.NamedModulesPlugin()//开启热更新
  ]
}


```

## 模块热更新

```js
if(module.hot){
  module.hot.accept('./component',function(){

  })
}
```

## 添加eslint

```js
'parserOptions': { //解析参数
    'ecmaVersion': 6,
    "sourceType":"module",
    "ecmaFeatures":{
      "jsx":true,
      "experimentalObjectRestSpread":true,
      "modules":true
    }
},

test:/\.(js|jsx)$/,
  use:[
    {
      loader:'babel-loader'
    },
    {
      loader:'eslint-loader'
    }
  ],
```

## 区分生产环境和开发环境

```js
//根据环境变量来区分生产环境和开发环境，利用merge合并基础配置
module.exports = env => {
  let config = env === 'production' ? productionConfig : developmentConfig
  return merge(generateConfig(env),config)
}
```

## 资源引用问题

```js
//css中
url('~@/assets/images/add-icon.png')
//js中
import icon from '@/assets/images/icon/add-icon'
或者
reequire('@/assets/images/icon/add-icon')
```

## 添加postcss插件

```js
//添加css兼容代码插件
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
//指定添加兼容css代码的范围
"browserslist":[
    ">= 1%",
    "last 2 versions"
]
```

## postcss插件进行移动端适配

```
1.postcss-importpostcss-import主要功有是解决@import引入路径问题。使用这个插件，可以让你很轻易的使用本地文件、node_modules或者web_modules的文件。这个插件配合postcss-url让你引入文件变得更轻松。


2.postcss-url该插件主要用来处理文件，比如图片文件、字体文件等引用路径的处理。


3.cssnano 主要用来压缩和清理CSS代码

4.postcss-px-to-viewport 插件主要用来把px单位转换为vw、vh、vmin或者vmax这样的视窗单位，也是vw适配方案的核心插件之一。

5.postcss-aspect-ratio-mini主要用来处理元素容器宽高比。在实际使用的时候，具有一个默认的结构

6.postcss-write-svg 插件主要用来处理移动端1px的解决方案。该插件主要使用的是border-image和background来做1px的相关处理。
```
```js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-url'),
    require('postcss-px-to-viewport')({
      viewportWidth: 750,// 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 1334,// 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置著作权归作者所有。
      unitPrecision: 3,// 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）著作权归作者所有。
      viewportUnit: 'vw',// 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'],//// 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名著作权归作者所有。
      minPixelValue: 1,// 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值著作权归作者所有。
      mediaQuery: false,// 允许在媒体查询中转换`px`
      exclude: /(\/|\\)(node_modules)(\/|\\)/
    }),
    require('postcss-css-reset'), //重置样式
  ]
}
```

## 添加UI测试

```json
"jest": {
    "setupFiles": [//执行配置文件
      "<rootDir>/test/__test__/setup.js"
    ],
    "moduleFileExtensions": [
      "js",
      "jsx"
    ],
    "moduleDirectories": [
      "node_modules",
      "bower_components",
      "shared"
    ],
    "moduleNameMapper": { //忽略css,图片文件
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/test/__mocks__/styleMock.js"
    },
    "testPathIgnorePatterns": [ //忽略其他无关目录
      "<rootDir>/node_modules/",
      "<rootDir>/dist/",
      "<rootDir>/build/"
    ]
  },
```

```js
//测试组件文件是否展示正常
describe('UI 测试',() => {
  it('test should equlas hah',() => {
      const wrapper = mount(<App/>)
      const content = wrapper.find('.test')
      expect(content).toHaveLength(1)
      expect(content.text()).toBe('haha')
  })
})
```

## 添加css模块化

```js
  {
    loader:'css-loader',
    options:{
      modules: true,
      localIdentName: '[name]__[local]__[hash:base64:5]'
    }
  },
```

## 引入dva简化开发

```js
import dva from 'dva'
import router from './router'
import models from './models'

const app = dva()

//将各个组件中的action,reducer,整合到一起
odels.forEach(model => app.model(model))
//将router整合到一起
app.router(router)
//将挂载根组件整合到一起
app.start('#root')


//router通过connect来接收reducer的状态
export default connect(state => state.home)(Home)


function delay(ms) {
  return new Promise((resolve,reject) => {
      setTimeout(function () {
          resolve()
      },ms)
  })
}

//定义组件内部的状态
export default {
  namespace:'home',
  state:{
    number:0
  },
  effects:{//处理异步的action
    *asyncAdd(action,{call,put}){
      yield call(delay,1000)
      yield put({type:'add'})
    }
  },
  reducers:{//reducer处理action传过来的参数
    add(state){
      return {
        number:state.number + 1
      }
    }
  }
}

```
