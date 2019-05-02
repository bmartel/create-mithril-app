module.exports = {
  root: true,
  env: {
    browser: true,
    node: true<% if (mocha === 'yes'){ %>,
    mocha: true<% } %><% if (jest === 'yes'){ %>,
    jest: true<% } %>
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [<% if (prettier === 'yes'){ %>
    'plugin:prettier/recommended',
    'prettier'<% } %>
  ],<% if (prettier === 'yes'){ %>
  plugins: [
    'prettier'
  ],<% } %>
  // add your custom rules here
  rules: {
  },
  globals: {
    requestAnimationFrame: true,
    cancelAnimationFrame: true,
    Promise: true,
  },
}
