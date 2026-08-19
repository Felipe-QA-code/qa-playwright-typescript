import { Page, expect } from '@playwright/test';

export class CheckoutOverviewPage {

    private readonly productList;
    private readonly totalLabel;
    private readonly finishButton;

    constructor(private page: Page) {

        this.productList = page.locator('[data-test="inventory-item"]');
        this.totalLabel = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');

    }

    async validateProduct(productName: string) {

        const product = this.productList.filter({
            hasText: productName
        });

        await expect(product).toBeVisible();

    }

    async validateTotal(expectedTotal: string) {

        await expect(this.totalLabel)
            .toContainText(expectedTotal);

    }

    async finish() {

        await this.finishButton.click();

    }

}