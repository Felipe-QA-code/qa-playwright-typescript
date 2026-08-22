import { Page,expect } from '@playwright/test'

export class CheckoutPage {

    private readonly checkoutInfo
    private readonly firstName
    private readonly lastName
    private readonly postalCode
    private readonly butonContinue

   constructor (private page:Page) {

    this.checkoutInfo = page.locator('.checkout_info')
    this.firstName = page.locator('[data-test="firstName"]')
    this.lastName = page.locator('[data-test="lastName"]')
    this.postalCode = page.locator('[data-test="postalCode"]')
    this.butonContinue = page.locator ('[data-test="continue"]')
   } 

async Fillinformation (firstname : string , lastname:string , postalcode:string){

    await expect (this.checkoutInfo).toBeVisible()
    await this.firstName.fill(firstname)
    await this.lastName.fill(lastname)
    await this.postalCode.fill(postalcode)
}

async gotocontinue (){

   await this.butonContinue.click()
}

}

  // 6. Llenar datos de envío
  //await page.locator('[data-test="firstName"]').fill ('felipe');
  //await page.locator('[data-test="lastName"]').fill('perez');
  //await page.fill('input[data-test="postalCode"]', '12345');
  //await page.click('input[data-test="continue"]');