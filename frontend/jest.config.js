module.exports = {
  preset: "react-native",
  roots: ["<rootDir>/test"],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  cacheDirectory: ".jest/cache",
  clearMocks: true,
  watchman: true
};
