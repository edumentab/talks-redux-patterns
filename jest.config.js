module.exports = {
  transform: {
    '\\.m?[tj]sx?$': 'babel-jest'
  },
  clearMocks: true,
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    './jest.setup.js'
  ]
}
