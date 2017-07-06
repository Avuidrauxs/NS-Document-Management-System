module.exports = {
  transform: {
    '.*': '<rootDir>/node_modules/babel-jest'
  },
  moduleFileExtensions: [
    'es6',
    'js',
    'jsx'
  ],
  collectCoverage: true,
  unmockedModulePathPatterns: [
    'react',
    'enzyme'
  ],
  globals: {
    window: true,
    document: true,
  },
  bail: true,
  verbose: true,
  setupFiles: ['<rootDir>/client/tests/__mock__/jqueryMock.js',
    '<rootDir>/client/tests/__mock__/localStorageMock.js'],
  roots: [
    'client/'
  ],
  collectCoverageFrom: [
    '**/client/actions/**', '**/client/store/**', '**/client/components/**',
    '**/client/reducers/**','!**/node_modules/**', '!**/lcov-report/**',
    '!**/client/utilities/**','!**/client/store/**', '!**/client/components/dashboard/routes.jsx'
  ],
};
