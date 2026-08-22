import {Page,expect} from '@playwright/test'

export class InventoryPage {

    private readonly inventoryList
    private readonly shopingCart

constructor (private page:Page){

    this.inventoryList = page.locator('[data-test="inventory-list"]')
    this.shopingCart = page.locator('[data-test="shopping-cart-link"]')
}

async isLoaded (){
    await expect(this.inventoryList).toBeVisible()
}
async addProduct (productName : string) {

    const product = this.page.locator('[data-test="inventory-item"]').filter({hasText : productName})
    await product.getByRole('button', {name : 'Add to cart'}).click()
}

async gotocartpage () {

    await this.shopingCart.click()
}

}
// Validar que entramos al inventario
//await expect(page).toHaveURL(/inventory.html/);
//await expect(.toBeVisible();

// 3. Agregar dos productos al carrito
//await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
//await page.click('button[data-test="add-to-cart-sauce-labs-bike-light"]');
//await page.click('button[data-test="remove-sauce-labs-bike-light"]');

// 4. Ir al carrito
//await page.click('.shopping_cart_link');
//await expect(page).toHaveURL(/cart.html/);