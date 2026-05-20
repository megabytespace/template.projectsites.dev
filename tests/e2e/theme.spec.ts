import { test, expect } from '@playwright/test';

test.describe('Theme toggle', () => {
  test('cycles dark → light → auto via header button', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByRole('button', { name: /theme/i });
    await expect(toggle).toBeVisible();

    const themeAttr = () => page.evaluate(() => document.documentElement.dataset.theme);

    const before = await themeAttr();
    expect(['dark', 'light', 'auto']).toContain(before);

    await toggle.click();
    const after1 = await themeAttr();
    expect(after1).not.toBe(before);

    await toggle.click();
    const after2 = await themeAttr();
    expect(after2).not.toBe(after1);

    await toggle.click();
    const after3 = await themeAttr();
    // Cycle should return to original
    expect(after3).toBe(before);
  });

  test('persists theme choice in localStorage', async ({ page }) => {
    await page.goto('/');

    const toggle = page.getByRole('button', { name: /theme/i });
    await toggle.click();

    const stored = await page.evaluate(() => localStorage.getItem('projectsites:theme'));
    expect(['dark', 'light', 'auto']).toContain(stored);

    // Reload preserves
    await page.reload();
    const themeAfterReload = await page.evaluate(() => document.documentElement.dataset.theme);
    expect(themeAfterReload).toBe(stored);
  });
});
