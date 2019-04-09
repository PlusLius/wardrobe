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
