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
        'ecmaVersion': 6,
        "sourceType":"module",
        "ecmaFeatures":{
          "jsx":true,
          "experimentalObjectRestSpread":true,
          "modules":true
        }
    },
    'rules': { //设置规则
        "no-unused-vars":'off',
        'no-console':'off',
        'indent': 'off',
        'linebreak-style':'off',
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
