import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',

  use: {
    baseURL: 'http://localhost:4173',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'off',
    // All API calls go to localhost:5000 (VITE_API_URL fallback baked at build
    // time). Every test that touches the UI must mock these before navigating.
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Start `vite preview` before tests; dist/ must already be built.
  // `reuseExistingServer` skips the spawn if port 4173 is already listening
  // (handy locally; CI always does a fresh start).
  webServer: {
    command: 'npm run preview',
    port: 4173,
    reuseExistingServer: !process.env.CI,
    timeout: 20_000,
  },
});
