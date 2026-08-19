import {Page} from '@playwright/test'

export class CheckoutPage {

    private readonly FisrtName
    private readonly LastName
    private readonly PostalCode
    private readonly ButonContinue

constructor (private page:Page) {
 
    this.FisrtName = page.locator('[data-test="firstName"]')
    this.LastName =  page.locator('[data-test="lastName"]')
    this.PostalCode =page.locator('[data-test="postalCode"]')
    this.ButonContinue = page.locator('[data-test="continue"]')
}

async Fillinformation (firstname:string , lastname:string , postalcode:string){

    await this.FisrtName.fill (firstname)
    await this.LastName.fill (lastname)
    await this.PostalCode.fill(postalcode)

}

async gotocontinue () {

    await this.ButonContinue.click()
}

}

  // 6. Llenar datos de envío
  //await page.locator('[data-test="firstName"]').fill ('felipe');
  //await page.locator('[data-test="lastName"]').fill('perez');
  //await page.fill('input[data-test="postalCode"]', '12345');
  //await page.click('input[data-test="continue"]');