import { test, expect } from '@playwright/test';


  test('compra de prod', async ({ page }) => {
  // 2. Iniciar sesión
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  

  
  // Validar que entramos al inventario
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.locator('.inventory_list')).toBeVisible();
  


  // 3. Agregar dos productos al carrito
  await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('button[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('button[data-test="remove-sauce-labs-bike-light"]');


  // 4. Ir al carrito
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart.html/);


  // Validar que hay 2 productos
  await expect(page.locator('.cart_item')).toHaveCount(1);


  // 5. Proceder al checkout
  await page.click('button[data-test="checkout"]');
  await expect(page).toHaveURL(/.*checkout-step-one.html/)



  // 6. Llenar datos de envío
  await page.fill('input[data-test="firstName"]', 'Juan');
  await page.fill('input[data-test="lastName"]', 'Pérez');
  await page.fill('input[data-test="postalCode"]', '12345');
  await page.click('input[data-test="continue"]');

  // 7. Finalizar compra
  await page.click('button[data-test="finish"]');

  // 8. Validar mensaje de confirmación
  const confirmation = page.locator('.complete-header');
  await expect(confirmation).toHaveText('Thank you for your order!');

  // 9. Validar que el carrito está vacío después de la compra
  await page.click('button[data-test="back-to-products"]');
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveCount(0);
});