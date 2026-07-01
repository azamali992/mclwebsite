import { test, expect } from '@playwright/test';
import { applyApiMocks } from './helpers.js';

// Gas catalog E2E tests. The Gases page uses static data from
// src/data/gasesData.js — no API calls are made to list the gases themselves,
// so these tests verify rendering and navigation without any POST mocking.
// `applyApiMocks` handles the generic layout calls (content, stats, etc.).

test.beforeEach(async ({ page }) => {
  await applyApiMocks(page);
  await page.goto('/gases');
  // React.lazy loads the Gases chunk after the HTML lands; networkidle
  // fires once the chunk request completes and React re-renders.
  await page.waitForLoadState('networkidle', { timeout: 15_000 });
});

test('Gases page renders the catalog heading', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: /gas/i }).first(),
  ).toBeVisible({ timeout: 5_000 });
});

test('Gases page shows gas product cards with real gas names', async ({ page }) => {
  // The static gas data always includes these gases. At least one must be
  // visible in the rendered catalog cards.
  const gasNames = ['Oxygen', 'Nitrogen', 'Argon', 'Carbon Dioxide'];
  let found = false;
  for (const name of gasNames) {
    // After networkidle the page is fully rendered — isVisible() without a
    // timeout is sufficient here (no need to retry-wait).
    if (await page.getByText(name, { exact: false }).first().isVisible()) {
      found = true;
      break;
    }
  }
  expect(found, 'Expected at least one gas name to be visible in the catalog').toBe(true);
});

test('clicking a gas card navigates to its detail page', async ({ page }) => {
  // Find the first card link whose href contains "/gases/".
  const gasLink = page.locator('a[href*="/gases/"]').first();
  await expect(gasLink).toBeVisible({ timeout: 5_000 });

  const href = await gasLink.getAttribute('href');
  await gasLink.click();

  await page.waitForURL(`**${href}`, { timeout: 10_000 });
  await page.waitForLoadState('networkidle', { timeout: 15_000 });

  // The detail page renders a heading for the specific gas.
  await expect(page.getByRole('heading').first()).toBeVisible({ timeout: 5_000 });
});

test('gas detail page renders the product heading', async ({ page }) => {
  // Navigate directly to a known gas via its full categoryPath/slug path.
  // The URL structure is /gases/:categoryPath/:slug (from App.jsx route definition).
  // Medical Oxygen is always in the dataset: /gases/medical-gases/oxygen.
  await page.goto('/gases/medical-gases/oxygen');
  await page.waitForLoadState('networkidle', { timeout: 15_000 });

  await expect(
    page.getByRole('heading', { name: /oxygen/i }).first(),
  ).toBeVisible({ timeout: 10_000 });
});
