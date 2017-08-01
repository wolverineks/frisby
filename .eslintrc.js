module.exports = {
  extends: ['standard', 'plugin:flowtype/recommended'],
  plugins: ['standard', 'promise', 'mocha', 'flowtype'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    camelcase: 'error',
    'no-throw-literal': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-pending-tests': 'error',
    'mocha/no-skipped-tests': 'error',
    'mocha/no-identical-title': 'error',
    'mocha/valid-test-description': 'error',
    'mocha/no-mocha-arrows': 'error'
  }
}
