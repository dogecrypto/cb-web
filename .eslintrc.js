module.exports = {
  extends: ['standard', 'plugin:react/recommended'],
  globals: {
    fetch: true
  },
  "env": {
    "jest": true
  },
  parser: 'babel-eslint',
  plugins: ['standard', 'react'],
  rules: {
    'no-throw-literal': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    'react/no-array-index-key': 'error',
    'react/no-string-refs': 0,
    'react/no-typos': 'error',
    'react/prop-types': 0,
    'react/self-closing-comp': ['error', { component: true }],
    camelcase: 'warn'
  }
}
