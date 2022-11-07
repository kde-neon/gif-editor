module.exports = {
  root: true,
  env: {
    node: 1
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  "rules": {
    "quotes": [0, "single", { "avoidEscape": true }]
  }
}
