module.exports = {
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: true,
      },
    ],
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '^\\$app(.*)$': '<rootDir>/.svelte-kit/dev/runtime/app$1',
    '^\\$root/(.+)$': '<rootDir>/src/$1',
  },
}
