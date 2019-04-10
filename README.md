## .editorconfig

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
    })
  ]
}


```
