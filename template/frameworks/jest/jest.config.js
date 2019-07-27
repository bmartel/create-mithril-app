module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['js', 'ts', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
  },
  testMatch: ['**/src/**/*.spec.(js|ts)|**/__tests__/*.(js|ts)'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js|ts}'],
  setupFiles: ['core-js'],
}
