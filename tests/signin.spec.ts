import { test, expect } from '@playwright/test';

test('should navigate to the check sign in page', async ({ page }) => {
  await page.goto('http://localhost:3000/signin');
  await expect(page.locator('h3')).toContainText('Sign in');
});
