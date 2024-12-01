module.exports = {
    globals: {
        TextEncoder: require('util').TextEncoder,
        TextDecoder: require('util').TextDecoder,
      },
    preset: 'ts-jest', // Use ts-jest for TypeScript support
    testEnvironment: 'node', // Simulates a browser environment
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Add setup for testing library
    moduleNameMapper: {
      '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
      "\\.(css|scss)$": "identity-obj-proxy", // Handle CSS imports
    },
    transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/" // Add dependencies you need Jest to transform
  ],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore build files
    collectCoverage: true, // Generate coverage reports
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}', // Include TS/TSX files
      '!src/**/*.d.ts', // Exclude type definitions
      '!src/index.tsx', // Exclude index entry point
      '!src/reportWebVitals.ts', // Exclude CRA boilerplate
    ],
    coverageReporters: ['json', 'lcov', 'text', 'clover'], // Specify coverage report formats
  };