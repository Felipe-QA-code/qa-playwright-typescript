import {test , expect} from '@playwright/test';

test.beforeEach(async ({ page })=>{
    await page.goto('https://www.demoblaze.com/');
});

test ('demo', async ({ page }) => {
  const Home = page.getByRole('link', {name : 'Home'});
  const contact = page.getByRole('link', {name : 'Contact'});
  const cart = page.getByRole('link', {name : 'Cart'});
  await expect(cart).toBeVisible();
  await expect(Home).toBeVisible();
  await expect(contact).toBeVisible();
});

test ('compra 1', async ({ page }) => {
  await page.getByRole('link', { name : 'Samsung galaxy s6'}).click();
  await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=1');
  await expect(page.locator('h2')).toContainText('Samsung galaxy s6');
  await expect(page.locator('h3')).toContainText('360');
  page.once('dialog', async dialog => {
      // Validar texto del alert
      expect(dialog.message()).toBe('Product added');
      // Aceptar alert
      await dialog.accept();
    }); 
  await page.getByText('Add to cart').click();
  await page.getByRole('link', { name: /Cart/ }).click();
  await expect(page).toHaveURL('https://www.demoblaze.com/cart.html');
  await expect(page.locator('#tbodyid')).toBeVisible();
  await expect(page.locator('#tbodyid tr')).toHaveCount(1);
  await page.getByRole('button', {name : 'Place Order'}).click();
  await expect(page.locator('#orderModal')).toBeVisible();
  await page.locator('#name').fill('felipe');
  await page.locator('#country').fill('cochabamba');
  await page.locator('#city').fill('cercado');
  await page.locator('#card').fill('123456');
  await page.locator('#month').fill('july');
  await page.locator('#year').fill('2026');
  await page.getByRole('button',{ name: 'Purchase'}).click();
  await expect(page.locator('.sweet-alert')).toBeVisible();
  await page.getByRole('button',{ name: 'OK'}).click();
  await expect(page.locator('.sweet-alert')).not.toBeVisible();
});

test ('dos o mas productos', async ({ page }) => {
  await page.getByRole('link', {name : 'Nokia lumia 1520'}).click();
  await expect(page).toHaveURL('https://www.demoblaze.com/prod.html?idp_=2');
  await expect(page.locator('h2')).toHaveText('Nokia lumia 1520');
  await expect(page.locator('.price-container')).toBeVisible();
  page.on ('dialog', async dialog => {
    expect(dialog.message()).toBe('Product added');
    await dialog.accept();
  });

  await page.getByText('Add to cart').click();
  await page.getByRole('link', { name: /Cart/ }).click();
  await expect(page).toHaveURL('https://www.demoblaze.com/cart.html');
  await expect(page.locator('#tbodyid')).toBeVisible();
  await expect(page.locator('#tbodyid tr')).toHaveCount(1);
  await page.getByText('Home').click();

  await page.getByRole('link', { name : 'Nexus 6'}).click();
  await expect(page.locator('h2')).toContainText('Nexus 6');
  await expect(page.locator('h3')).toBeVisible();
  page.on ('dialog',async dialog =>{
    expect (dialog.message()).toBe('Product added');
    await dialog.accept();
  });

  await page.getByText('Add to cart').click();
  await page.getByRole('link', { name: /Cart/ }).click();
  await expect(page).toHaveURL('https://www.demoblaze.com/cart.html');
  await expect(page.locator('#tbodyid')).toBeVisible();
  await expect(page.locator('#tbodyid tr')).toHaveCount(2);
  await expect(page.locator('#totalp')).toBeVisible();
  await page.getByRole('button', { name : 'Place Order'}).click()
  await expect(page.locator('#orderModal')).toBeVisible();
  await page.locator('#name').fill('felipe');

  // cambiando codigo
  await page.locator('#country').fill('cochabamba');
  await page.locator('#city').fill('cercado');
  await page.locator('#card').fill('123456');
  await page.locator('#month').fill('july');
  await page.locator('#year').fill('2026');
  await page.getByRole('button', { name: 'Purchase'}).click();
  await expect(page.locator('.sweet-alert')).toBeVisible();
  await page.getByRole('button',{ name: 'OK'}).click();
  await expect(page.locator('.sweet-alert')).not.toBeVisible();
});
