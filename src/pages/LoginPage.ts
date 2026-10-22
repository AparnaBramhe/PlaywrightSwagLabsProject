import { Page } from "@playwright/test"

export class LoginPage
{
    constructor(private page:Page){}

    //locators object
    private locators={
        username:"#user-name",
        password:"password",
        loginButton: "#login-button"
    }

    //methods
    async goToLoginPage()
    {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async enterUsername(un:string)
    {
        await this.page.locator(this.locators.username).fill(un);
    }

    async enterPassword(ps:string)
    {
        await this.page.locator(this.locators.password).fill(ps);
    }

    async clickOnLoginButton()
    {
        await this.page.locator(this.locators.loginButton).click();    
    }
}