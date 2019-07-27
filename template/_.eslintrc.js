module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true<% if (test === 'mocha') { %>,
    mocha: true<% } %>
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.mjs'] }
    }
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint:recommended'<% if (typescript === 'yes') { %>,
    'plugin:@typescript-eslint/recommended'<% } %><% if (prettier === 'yes') { %>,
    'plugin:prettier/recommended',
    'prettier',<% if (typescript === 'yes') { %>
    'prettier/@typescript-eslint'<% } %><% } %>
  ],
  plugins: [
    <% if (typescript === 'yes') { %>'@typescript-eslint',<% } %>
    'import'
  ],
  // add your custom rules here
  rules: {
       // Enforce import order
    'import/order': 2,

    // Imports should come first
    'import/first': 2,

    // Allow unresolved imports
    'import/no-unresolved': 0,

    // Allow paren-less arrow functions only when there's no braces
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],

    // Allow async-await
    'generator-star-spacing': 0,

    // Allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,

    // Prefer const over let
    'prefer-const': [2, {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }],

    // No single if in an "else" block
    'no-lonely-if': 2,

    // Force curly braces for control flow,
    // including if blocks with a single statement
    curly: [2, 'all'],

    // No async function without await
    'require-await': 2,

    // Force dot notation when possible
    'dot-notation': 2,

    'no-var': 2,

    // Force object shorthand where possible
    'object-shorthand': 2,

    // No useless destructuring/importing/exporting renames
    'no-useless-rename': 2
  }
}
