
import identityObjProxy from 'identity-obj-proxy';

export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest"
  },
  moduleNameMapper: {
    '\\.module\\.css$': identityObjProxy,
  },
};