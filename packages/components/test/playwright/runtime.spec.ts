import { test, expect } from '@playwright/test';

test('runtime validation page reports PASS', async ({ page }) => {
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('requestfailed', req => console.log('REQUEST FAILED:', req.url()));
  page.on('response', resp => {
    if (resp.status() >= 400) console.log('BAD RESPONSE:', resp.status(), resp.url());
  });

  // Navigate to the runtime page served by the repo-root static server.
  await page.goto('http://127.0.0.1:8083/packages/components/test/runtime/index.html');

  // Wait up to 15s for the status to include either PASS or FAIL
  const locator = page.locator('#status');
  await locator.waitFor({ state: 'attached', timeout: 15000 });
  await page.waitForFunction(() => {
    const s = document.getElementById('status')?.textContent || '';
    return s.includes('PASS') || s.includes('FAIL');
  }, null, { timeout: 15000 });

  const status = await locator.textContent({ timeout: 1000 });
  console.log('STATUS TEXT:', status);
  expect(status).toContain('PASS');
});
