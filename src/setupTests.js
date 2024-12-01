// src/setupTests.ts
import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
// Extend Jest's matchers with @testing-library/jest-dom

// Example: Mock console.error to fail tests on React warnings (optional)
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation((message) => {
    throw new Error(message);
  });
});

// Clean up mocks after each test
afterEach(() => {
  jest.restoreAllMocks();
});