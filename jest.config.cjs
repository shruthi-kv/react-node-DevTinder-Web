// module.exports = {
//   testEnvironment: "jsdom",
//   moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
//   setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"], 
//   transform: {
//     "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
//   },
//   setupFilesAfterEnv: ["@testing-library/jest-dom"],
// };


// /** @type {import('jest').Config} */
// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//   },
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest",
//   },
// };


// module.exports = {
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   setupFiles: ["<rootDir>/jest.setup.js"],
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest",
//   },
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//   },
// };


module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
};