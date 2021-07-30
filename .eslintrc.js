module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  // parserOptions: {
  //   parser: 'babel-eslint'
  // },
  parser: 'vue-eslint-parser',
  parserOptions: {
    sourceType: 'module',
  },
  // rules: {
  //   'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  //   'indent': 'off',
  //   'no-tabs': 'off',
  //   semi: [0],
  //   'no-mixed-spaces-and-tabs': [0],
  //   singleQuote: 0,
  //   'space-before-function-paren': 0,
  //   'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  // }
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off',
    'no-mixed-operators': 0,
    'vue/max-attributes-per-line': [
      1,
      {
        'singleline': 5,
        'multiline': {
          'max': 1,
          'allowFirstLine': false
        }
      }
    ],
    'vue/attribute-hyphenation': 0,
    'vue/html-self-closing': 0,
    'vue/component-name-in-template-casing': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-unused-components': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/no-parsing-error': 0,
    "no-ternary": 0,//禁止使用三目运算符
    "no-nested-ternary": 0,//禁止使用嵌套的三目运算
    "comma-dangle": [1, "never"],//对象字面量项尾不能有逗号
    "eqeqeq": 1,//必须使用全等
    "eol-last": 0,//文件以单一的换行符结束
    "no-extra-semi": 1,//禁止多余的冒号
    "camelcase": 0,//强制驼峰法命名
    "dot-location": 0,//对象访问符的位置，换行的时候在行首还是行尾
    "linebreak-style": [0, "windows"],//换行风格
    "spaced-comment": 0,//注释风格要不要有空格什么的
    "no-multi-spaces": 0,//不能用多余的空格
    "no-irregular-whitespace": 0,//不能有不规则的空格
    "new-cap": 0,//函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
    "space-before-function-paren": [0, "always"],//函数定义时括号前面要不要有空格
    'no-console': 0,
    "no-unused-vars": 0,
    'no-tabs': 0,
    'quotes': [
      0,
      'single',
      {
        'avoidEscape': true,
        'allowTemplateLiterals': true
      }
    ],

    "quote-props": [0, "always"],//对象字面量中的属性名是否强制双引号
    'semi': [
      1,
      'never',
      {
        'beforeStatementContinuationChars': 'never'
      }
    ],
    'no-delete-var': 1,
    'prefer-const': 0
  },
}
