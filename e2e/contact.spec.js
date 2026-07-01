import { test, expect } from '@playwright/test';
import { applyApiMocks } from './helpers.js';

// Contact form E2E tests.
//
// The contact form POSTs to http://localhost:5000/api/contact — a cross-origin
// request from the preview server at :4173. Cross-origin POST with
// Content-Type: application/json triggers a CORS preflight OPTIONS before the
// real POST. All route mocks that cover /api/contact must respond to OPTIONS
// with the required CORS headers; the shared catch-all in applyApiMocks handles
// OPTIONS for any URL not covered by a more-specific handler, but because
// Playwright uses LIFO ordering, a handler registered in a test body overrides
// the catch-all for that URL and must therefore handle OPTIONS itself.

test.beforeEach(async ({ page }) => {
  await applyApiMocks(page);
  await page.goto('/contact');
  await page.waitForLoadState('networkidle', { timeout: 15_000 });
  // The footer also contains a newsletter form, so `locator('form')` hits strict mode.
  // Check the contact form's first required field instead.
  await expect(page.locator('#name')).toBeVisible({ timeout: 10_000 });
});

// ── Form rendering ────────────────────────────────────────────────────────────

test('contact page renders the form with all required fields', async ({ page }) => {
  await expect(page.locator('#name')).toBeVisible();
  await expect(page.locator('#email')).toBeVisible();
  await expect(page.locator('#message')).toBeVisible();
  await expect(page.getByRole('button', { name: /send/i })).toBeVisible();
});

// ── Successful submission flow ────────────────────────────────────────────────

test('successful submission shows a confirmation message', async ({ page }) => {
  // page.route() + route.fulfill() does not reliably bypass CORS for cross-origin
  // POST requests in headless Chrome. Patching window.fetch() in the page's own
  // JS context avoids the CORS preflight entirely and gives a proper Response object
  // that submitContact() in api.js can parse with res.json() without throwing.
  await page.evaluate(() => {
    const _origFetch = window.fetch;
    window.fetch = async (url, init) => {
      if (typeof url === 'string' && url.includes('/api/contact') && init?.method === 'POST') {
        return new Response(JSON.stringify({ message: 'Message received successfully' }), {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return _origFetch(url, init);
    };
  });

  await page.locator('#name').fill('Ahmed Khan');
  await page.locator('#email').fill('ahmed@example.com');
  await page.locator('#message').fill('I need a quote for industrial oxygen cylinders.');

  await page.getByRole('button', { name: /send/i }).click();

  // The success state replaces the form with a confirmation.
  await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 10_000 });
  // The contact form's name input disappears when submitted successfully.
  await expect(page.locator('#name')).not.toBeVisible({ timeout: 5_000 });
});

// ── Client-side validation ────────────────────────────────────────────────────

test('submitting an empty form shows a validation error without calling the API', async ({
  page,
}) => {
  let apiCalled = false;
  await page.route('http://localhost:5000/api/contact', () => {
    apiCalled = true;
  });

  // The Contact form has HTML5 `required` attributes on name, email, and
  // message. Native browser validation fires before the React handler and
  // prevents submission — we remove it so React's custom validation runs
  // and we can assert the in-page error message.
  await page.evaluate(() => {
    // The footer also has a form; target the contact form by its unique className.
    document.querySelector('form.space-y-5').setAttribute('novalidate', '');
  });

  // Leave all required fields empty and submit.
  await page.locator('#name').fill('');
  await page.locator('#email').fill('');
  await page.locator('#message').fill('');
  await page.getByRole('button', { name: /send/i }).click();

  // React's validation shows an in-page error message.
  await expect(
    page.getByText(/required fields/i).first(),
  ).toBeVisible({ timeout: 5_000 });

  // The API should NOT have been called (React validation fired first).
  expect(apiCalled).toBe(false);
});

// ── Network error handling ────────────────────────────────────────────────────

test('network error during submission shows an error message', async ({ page }) => {
  // Abort the entire route (including OPTIONS preflight) — the browser sees a
  // network failure, the catch block in handleSubmit fires, and the error
  // message appears.
  await page.route('http://localhost:5000/api/contact', (route) =>
    route.abort('failed'),
  );

  await page.locator('#name').fill('Test User');
  await page.locator('#email').fill('test@example.com');
  await page.locator('#message').fill('Network error test message.');

  await page.getByRole('button', { name: /send/i }).click();

  await expect(
    page.getByText(/error|failed|try again/i).first(),
  ).toBeVisible({ timeout: 10_000 });
});

// ── Office information section ────────────────────────────────────────────────

test('contact page lists all six office locations', async ({ page }) => {
  const cities = ['Multan', 'Faisalabad', 'Islamabad', 'Lahore', 'Peshawar', 'Karachi'];
  for (const city of cities) {
    await expect(page.getByText(city).first()).toBeVisible({ timeout: 5_000 });
  }
});
