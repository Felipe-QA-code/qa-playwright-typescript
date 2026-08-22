import { Page,expect } from '@playwright/test'

export class InventoryPage {

    private readonly inventoryList
    private readonly shoopingCart

    constructor (private page:Page){

        this.inventoryList = page.locator('[data-test="inventory-item"]')
        this.shoopingCart  = page.locator('[data-test="shopping-cart-link"]')
    }

    async isLoaded () {
        await expect(this.inventoryList.first()).toBeVisible();
    }

    async addProduct (productName:string) {
        const product = this.inventoryList.filter({hasText:productName})
        await product.getByRole('button', {name : 'Add to cart'}).click()
    }

    async gotoCart () {
        await this.shoopingCart.click()
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