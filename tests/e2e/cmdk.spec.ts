import { test, expect } from '@playwright/test';

test.describe('Command palette (⌘K)', () => {
  test('opens with Meta+K and autofocuses input', async ({ page, browserName }) => {
    await page.goto('/');
    const modifier = browserName === 'webkit' ? 'Meta' : process.platform === 'darwin' ? 'Meta' : 'Control';
    await page.keyboard.press(`${modifier}+k`);

    const input = page.getByRole('dialog').getByPlaceholder(/search pages|command/i).first();
    await expect(input).toBeVisible();
    await expect(input).toBeFocused();
  });

  test('closes with Escape and returns focus', async ({ page }) => {
    await page.goto('/');
    // Open via the header button to ensure trigger is a known focusable element
    const trigger = page.getByRole('button', { name: /open command palette/i });
    await trigger.click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();

    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused?.toLowerCase()).toBe('button');
  });

  test('arrow keys navigate items', async ({ page }) => {
    await page.goto('/');
    const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
    await page.keyboard.press(`${modifier}+k`);

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    const selected = page.locator('[aria-selected="true"]');
    await expect(selected).toBeVisible();
  });

  test('typing filters results', async ({ page }) => {
    await page.goto('/');
    const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
    await page.keyboard.press(`${modifier}+k`);

    await page.keyboard.type('pricing');
    await page.waitForTimeout(100);

    const visibleItems = await page.locator('[role="option"]').allTextContents();
    expect(visibleItems.some((t) => /pricing/i.test(t))).toBe(true);
  });
});
