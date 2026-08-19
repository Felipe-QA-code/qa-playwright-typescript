import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';
import { InventoryPage } from '../page/InventoryPage';
import { CartPage } from '../page/CartPage';
import { CheckoutPage } from '../page/CheckoutPage';
import { CheckoutOverviewPage } from '../page/CheckoutOverviewPage';
import { ConfirmationPage } from '../page/ConfirmationPage';


test ('compra de prod', async ({ page }) => {
  // 2. Iniciar sesión
await page.goto('https://www.saucedemo.com/')
  
const loginpage = new LoginPage (page)
await loginpage.login('standard_user' , 'secret_sauce' );

const inventorypage = new InventoryPage(page)
await inventorypage.isLoaded()
await inventorypage.addProduct('Sauce Labs Backpack')
await inventorypage.addProduct('Sauce Labs Bike Light')
await inventorypage.gotoCart()

const cartpage = new CartPage (page)
await cartpage.validateProduct ('Sauce Labs Backpack')
await cartpage.validateProduct ('Sauce Labs Bike Light')
await cartpage.gotocheckout()

const checkout = new CheckoutPage (page)
await checkout.Fillinformation ('felipe' , 'perez' ,'1234')
await checkout.gotocontinue()

const checkoverview = new CheckoutOverviewPage (page)
await checkoverview.validateProduct('Sauce Labs Backpack')
await checkoverview.validateProduct('Sauce Labs Bike Light')
await checkoverview.validateTotal('$43.18')
await checkoverview.finish()

const confirmationPage = new ConfirmationPage(page);

await confirmationPage.validateConfirmation();

await confirmationPage.backToProducts();
})
