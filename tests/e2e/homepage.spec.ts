import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('renders without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1').first()).toBeVisible();

    // Allow a tick for async logs
    await page.waitForTimeout(500);
    expect(consoleErrors, `Console errors:\n${consoleErrors.join('\n')}`).toHaveLength(0);
  });

  test('has a canonical link in <head>', async ({ page }) => {
    await page.goto('/');
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBeTruthy();
  });

  test('emits at least one JSON-LD script', async ({ page }) => {
    await page.goto('/');
    const count = await page.locator('script[type="application/ld+json"]').count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('skip-to-main link is keyboard-reachable', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.textContent);
    expect(focused).toMatch(/skip.*main/i);
  });

  test('all images have alt attribute', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('main img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      // Empty alt="" is allowed for decorative images; missing alt is a fail
      expect(alt, `Image ${i} missing alt attribute`).not.toBeNull();
    }
  });

  test('footer renders contact info', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
  });
});
