 import {Page,expect} from '@playwright/test';

 export class CartPage {

    private readonly cartList
    private readonly butonChekout

constructor ( private page:Page) {

    this.cartList = page.locator('[data-test="cart-list"]')
    this.butonChekout = page.locator('[data-test="checkout"]')
}

async validateProduct (productName:string) {

    const product = this.cartList.filter({hasText: productName});
    await expect(product).toBeVisible()
}

async gotocheckout () {

    await this.butonChekout.click()
}

 }
 // Validar que hay 2 productos

  //await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);


  // 5. Proceder al checkout
  //await page.click('button[data-test="checkout"]');
  //await expect(page).toHaveURL(/.*checkout-step-one.html/)
