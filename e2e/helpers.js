// Shared Playwright helpers.
//
// All API calls in the built SPA go to `http://localhost:5000` (the VITE_API_URL
// fallback baked at build time). No real backend runs during E2E tests, so every
// test fixture that navigates to an API-consuming page must call
// `applyApiMocks(page)` BEFORE `page.goto()` to intercept those requests.
//
// CORS note: POST requests from localhost:4173 to localhost:5000 trigger a CORS
// preflight OPTIONS before the actual POST. Playwright's route interception
// still enforces CORS headers on synthetic responses, so every handler for a
// cross-origin POST URL must respond to OPTIONS with the headers below.

export const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

/** @param {import('@playwright/test').Page} page */
export async function applyApiMocks(page) {
  // A single catch-all for all localhost:5000 traffic. Handles:
  //   • OPTIONS preflight → 204 with CORS headers
  //   • Everything else   → 200 with an empty JSON array (safe default for list endpoints)
  // Tests that need a different response for a specific URL can register their
  // own handler AFTER this call — Playwright uses LIFO ordering so the
  // later-registered handler takes priority.
  await page.route('http://localhost:5000/**', (route) => {
    if (route.request().method() === 'OPTIONS') {
      route.fulfill({ status: 204, headers: CORS_HEADERS });
    } else {
      route.fulfill({ status: 200, contentType: 'application/json', body: '[]' });
    }
  });
}

/** Sample career fixture used by careers-related tests */
export const SAMPLE_CAREER = {
  _id: '507f1f77bcf86cd799439011',
  position: 'Senior Gas Engineer',
  department: 'Engineering',
  location: 'Multan',
  type: 'Full-time',
  description: 'Oversee industrial gas production and quality control.',
  requirements: ['5+ years experience', 'Chemical engineering degree'],
  isActive: true,
};
