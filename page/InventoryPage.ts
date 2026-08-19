import {Page, expect} from '@playwright/test';

export class InventoryPage{

    private readonly inventoryList
    private readonly ShoppingCartList

constructor (private page:Page) {

this.inventoryList = page.locator('.inventory_list')
this.ShoppingCartList = page.locator('.shopping_cart_link')

}

async isLoaded (){

await expect(this.inventoryList).toBeVisible

}

async addProduct (productName:string){

    const product = this.page.locator('.inventory_item').filter({hasText: productName})
    await product.getByRole('button', {name: 'Add to cart'}).click()

}

async goToCart(){

    await this.ShoppingCartList.click()

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