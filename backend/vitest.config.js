import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./__tests__/setup.js'],
    testTimeout: 20000,
    hookTimeout: 30000,
  },
});
