import { test, expect } from '@playwright/test';
import path from 'path';
// const authFileGit = path.join(__dirname, '../playwright/.auth/userGit.json');



test('test sauce deom', async ({ page }) => {
  // test.use({ storageState: authFileGit });
  await page.goto(process.env.SAUCE_DEMO_URL+'/inventory.html');
  await page.screenshot({ path: './screenshots/sauce.png' });
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('test cart', async ({ page }) => {
  // test.use({ storageState: authFileGit });
  await page.goto(process.env.SAUCE_DEMO_URL+'/inventory.html');
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page).toHaveURL(process.env.SAUCE_DEMO_URL!+'/cart.html');
  await page.screenshot({ path: './screenshots/cart.png' });
});

// test('go to profile', async ({ page }) => {
//   // test.use({ storageState: authFile });
//   await page.goto(process.env.DICE_URL+'/dashboard/profiles');
//   await expect(page.title()).toContain('Usabilla Feedback Button');
//   await page.screenshot({ path: './screenshots/profile1.png' });
// });


// test('test', async ({ page }) => {
//   // page is authenticated
//   await page.goto('https://github.com'+'/Dendron6');
//   await page.screenshot({ path: './screenshots/profile1.png' });
// });

// test('test2', async ({ page }) => {
//   // page is authenticated
//   await page.goto('https://github.com'+'/Dendron6');
//   await page.screenshot({ path: './screenshots/profile1.png' });
// });