module.exports = {
  linters: {
    '**/*.{css,gql,graphql,html,json,less,md,mdx,scss,vue,yaml,yml}': ['prettier --write', 'git add'],
    '**/*.{js,jsx}': [
      'prettier --write',
      "eslint --cache --ext '.js,.jsx' --fix",
      'git add',
    ],
  },
  concurrent: false,
}
