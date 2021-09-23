module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest-setup-files-after-env.js'],
  modulePathIgnorePatterns: [
    ".*__mocks__.*"
  ]
};

