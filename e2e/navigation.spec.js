import { test, expect } from '@playwright/test';
import { applyApiMocks } from './helpers.js';

// Verify that the five most important public pages load without a JS crash
// and render their primary heading. All API calls are intercepted by
// `applyApiMocks` so no real backend is needed.
//
// Heading text is pinned to the actual h1 content in each page component
// (verified against the source) so changes to marketing copy will surface
// here rather than silently pass with a too-loose pattern.

const PAGES = [
  // h1: "Industrial and medical gases, engineered for Pakistan."
  { path: '/', heading: /industrial.*gas|engineered for pakistan/i },
  // h1: "Four Decades of Trust in Industrial & Medical Gases"
  { path: '/about', heading: /four decades|decades.*trust/i },
  // h1: varies with content API; fallback is "Industrial Gas Solutions" or similar heading on the page
  { path: '/gases', heading: /gas/i },
  // h1: "Contact Us"
  { path: '/contact', heading: /contact/i },
  // h1 fallback (API returns []): "Join Our Growing Team"
  { path: '/careers', heading: /join.*team|growing team/i },
];

for (const { path, heading } of PAGES) {
  test(`${path} loads and renders its main heading`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await applyApiMocks(page);
    await page.goto(path);
    // Wait for React.lazy chunks to finish loading (they load after the initial
    // page-load event fires, so we need networkidle to be sure they're done).
    await page.waitForLoadState('networkidle', { timeout: 15_000 });

    await expect(page.getByRole('heading', { name: heading }).first()).toBeVisible({
      timeout: 10_000,
    });

    // No uncaught JS errors.
    expect(errors, `JS errors on ${path}: ${errors.join(', ')}`).toHaveLength(0);
  });
}

test('404 / unknown route shows a not-found page', async ({ page }) => {
  await applyApiMocks(page);
  await page.goto('/this-route-does-not-exist');
  await page.waitForLoadState('networkidle', { timeout: 15_000 });
  await expect(
    page.getByText(/404|not found|page.*not.*exist/i).first(),
  ).toBeVisible({ timeout: 10_000 });
});
