module.exports = {
  setupFilesAfterEnv: ["<rootDir>/lib/setupTests.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/.yarn/",
    "<rootDir>/.yalc/",
    "<rootDir>/dist/",
  ],
  testRunner: "jest-circus/runner",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
}
