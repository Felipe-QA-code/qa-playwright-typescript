import { Page } from '@playwright/test'

export class LoginPage {

    private readonly username
    private readonly password
    private readonly loginButon

    constructor ( private page:Page) {

        this.username =   page.locator('[data-test="username"]')
        this.password =   page.locator('[data-test="password"]')
        this.loginButon = page.locator('[data-test="login-button"]')
    }

    async login (username:string , password:string){

        await this.username.fill(username)
        await this.password.fill(password)
        await this.loginButon.click()
    }
}
  //await page.locator('[data-test="username"]').fill('standard_user');
  //await page.locator('[data-test="password"]').fill('secret_sauce');
  //await page.locator('[data-test="login-button"]').click();
