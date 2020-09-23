module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prefer-const': 0,
    'indent': 0,
    'space-before-function-paren': 0,
    'no-unused-vars': ['error', { 'args': 'none' }],
    'no-useless-escape': 0,
    "camelcase": [2, {"properties": "always"}]
  }
}
