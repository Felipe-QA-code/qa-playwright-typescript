import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';
import { InventoryPage } from '../page/InventoryPage';


  test('compra de prod', async ({ page }) => {
  // 2. Iniciar sesión
  await page.goto('https://www.saucedemo.com/');
  
const loginpage = new LoginPage (page)
await loginpage.login('standard_user', 'secret_sauce')

const inventorypage = new InventoryPage(page)
await inventorypage.isLoaded()
await inventorypage.addProduct('Sauce Labs Backpack')
await inventorypage.addProduct('Sauce Labs Bike Light')
await inventorypage.goToCart()
  





  // Validar que hay 2 productos

  //await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);


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
