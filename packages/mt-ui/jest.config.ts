import type {Config} from 'jest';

const config: Config = {
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    "@constant": '<rootDir>/constant',
    "@utils": '<rootDir>/utils',
    "@assets": '<rootDir>/assets',
  },
  preset: 'ts-jest',
  transform: {
    "\\.scss$": "jest-transform-css",
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  // fix: ReferenceError: document is not defined
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-dom-setup.js']
};

export default config;