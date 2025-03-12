
import identityObjProxy from 'identity-obj-proxy';

export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    '\\.css$': 'jest-transform-stub' //configured Jest to handle css files to fix the tests that were failing due to import css
  },
  moduleNameMapper: {
    '\\.module\\.css$': identityObjProxy,
  },
};