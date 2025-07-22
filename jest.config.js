const nextJest = require("next/jest")

const createJestConfig = nextJest({
    dir: "./",
})

const customJestConfig = {
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts", "!src/types/**/*"],
    moduleNameMapping: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    testMatch: [
        "<rootDir>/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}",
    ],
}

module.exports = createJestConfig(customJestConfig)
