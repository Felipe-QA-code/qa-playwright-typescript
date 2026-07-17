import {Page} from '@playwright/test';

export class LoginPage{

    private readonly usernameInput;
    private readonly passwordInput;
    private readonly butonLogin;

constructor ( private page:Page ) {

this.usernameInput = page.locator('[data-test="username"]')
this.passwordInput = page.locator('[data-test="password"]')
this.butonLogin = page.locator('[data-test="login-button"]')

}

async login (username:string , password:string){

    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.butonLogin.click()

}


}

  //await page.locator('[data-test="username"]').fill('standard_user');
  //await page.locator('[data-test="password"]').fill('secret_sauce');
  //await page.locator('[data-test="login-button"]').click();
