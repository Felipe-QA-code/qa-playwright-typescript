import { test, expect }  from '@playwright/test';

test('login sin password', async ({ page }) => {
 await page.goto('https://www.saucedemo.com/');
 await page.getByRole('textbox', { name : 'Username'}).fill('standard_user');
 await page.getByRole('button', { name : 'Login'}).click();
 await expect(page.getByText('Password is required')).toBeVisible();
});

test('login sin username', async ({ page }) => {
 await page.goto('https://www.saucedemo.com/');
 await page.getByRole('textbox', {name : 'Password'}).fill('secret_sauce');
 await page.getByText('Login').click();
 await expect(page.getByText('Username is required')).toBeVisible();
})