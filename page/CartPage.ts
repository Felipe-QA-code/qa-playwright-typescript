import { expect, Page } from '@playwright/test';

export class CartPage{
    private readonly inventoryCount
    private readonly checkoutButton

    constructor ( private page:Page ) {
        this.inventoryCount = page.locator('[data-test="inventory-item"]')
        this.checkoutButton = page.locator('button[data-test="checkout"]')
    }

    async validateProductCount(count: number) {
        await expect(this.inventoryCount).toHaveCount(count);
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}
