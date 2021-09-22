module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true
  },
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-arrow-callback': 'error',
    'no-useless-constructor': 'error',
    'guard-for-in': 'error',
    'no-proto': 'error',
    'no-return-assign': 'error',
    'radix': 'error'
  }
};
