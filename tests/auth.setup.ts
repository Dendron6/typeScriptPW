import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
const authFile2 = path.join(__dirname, '../playwright/.auth/userGit.json');

// setup('authenticate', async ({ page, context }) => {
//   // Log in
//   await page.goto(process.env.DICE_URL!+'/employers/login');
//   await page.locator("[data-testid='email-input'] input").fill(process.env.DICE_USERNAME!);
//   await page.locator("[data-testid='sign-in-button']").click();
//   await page.locator("[data-testid='password-input'] input").fill(process.env.DICE_PASSWORD!);
//   await page.locator("[data-testid='submit-password']").click();

//   // Verify login
//   await expect(page.getByRole('button', { name: 'Tech Careers' })).toBeVisible();
  
//   // Store authentication state
//   await context.storageState({ path: authFile });
  
// });

setup('authenticate for source demo', async ({ page, context }) => {
    // Log in
    await page.goto(process.env.SAUCE_DEMO_URL!);
    page.locator('[data-test="username"]').fill(process.env.SAUCE_DEMO_LOGIN!)
    await page.screenshot({ path: './screenshots/sauceUsername.png' });
    page.locator('#password').fill(process.env.SAUCE_DEMO_PASSWORD!)
    await page.screenshot({ path: './screenshots/saucePassword.png' });
    page.locator('#login-button').click()
  
    // Verify login
    await expect(page).toHaveURL(process.env.SAUCE_DEMO_URL!+'/inventory.html');
    
    // Store authentication state
    await context.storageState({ path: authFile });
    
  });


setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://github.com/login');
  await page.getByLabel('Username or email address').fill(process.env.GITHUB_USERNAME!);
  await page.getByLabel('Password').fill(process.env.GITHUB_PASSWORD!);
  await page.locator('[data-disable-with="Signing in…"]').click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://github.com/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
//   await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile2 });
});