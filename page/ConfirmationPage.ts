import { Page, expect } from '@playwright/test';

export class ConfirmationPage {

    private readonly confirmationMessage;
    private readonly backToProductsButton;

    constructor(private page: Page) {

        this.confirmationMessage = page.locator('.complete-header');
        this.backToProductsButton = page.locator('[data-test="back-to-products"]');

    }

    async validateConfirmation() {

        console.log(await this.confirmationMessage.textContent()); 
        await expect(this.confirmationMessage)
            .toHaveText('Thank you for your order!');

    }

    async backToProducts() {

        await this.backToProductsButton.click();

    }

}
  // 8. Validar mensaje de confirmación
 // const confirmation = page.locator('.complete-header');
 // await expect(confirmation).toHaveText('Thank you for your order!');

  // 9. Validar que el carrito está vacío después de la compra
  //await page.click('button[data-test="back-to-products"]');
  //const cartBadge = page.locator('.shopping_cart_badge');
  //await expect(cartBadge).toHaveCount(0);
//});