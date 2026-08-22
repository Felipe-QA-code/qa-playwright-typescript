import { Page, expect } from '@playwright/test'

export class CheckoutOverviewPage {

    private readonly cartList
    private readonly totaLabel
    private readonly butonFisnish

constructor (private page:Page) {

    this.cartList = page.locator('[data-test="inventory-item"]')
    this.totaLabel = page.locator ('[data-test="total-label"]')
    this.butonFisnish = page.locator ('[data-test="total-label"]')
}

async validateProduct (productName : string) {

    await expect (this.cartList.first()).toBeVisible()
    const product = this.cartList.filter({hasText : productName})
    await expect (product).toBeVisible()
    await expect(this.totaLabel).toBeVisible()
    
}

async validateTotal (total:string) {

await expect(this.totaLabel).toContainText(total)

}
async finish (){
    await this.butonFisnish.click()
}

}