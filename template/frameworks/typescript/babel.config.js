module.exports = function(api) {
  api.cache.using(() => process.env.NODE_ENV === 'production')

  const isTest = process.env.NODE_ENV === 'test'

  const presets = [
    ['@babel/env', isTest ? { targets: { node: 'current' } } : { useBuiltIns: 'entry', corejs: '3' }],
    '@babel/typescript',
  ]

  const plugins = [
    '@babel/syntax-dynamic-import',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
  ]

  return {
    presets,
    plugins,
  }
}
