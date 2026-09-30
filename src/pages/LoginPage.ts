/*
Every page class maintains encapsulation principle
Encapsulation = private data + public function
*/
import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage
{
    //locator(data)
    private readonly username;
    private readonly password;
    private readonly loginbutton;
    private readonly errorheading;

    //constructor to initialize locator
    constructor(page:Page)
    {
        super(page);
        this.username=page.getByPlaceholder("Username");
        this.password=page.getByPlaceholder("Password");
        this.loginbutton=page.locator("input#login-button");
        this.errorheading=page.locator("//h3");
    }

    //methods(actions)

    async gotoLoginPage():Promise<void>
    {
        await this.page.goto("/"); //read url from baseUrl variable from playwright configuration
    }

    // async getAppTitle():Promise<string>
    // {
    //     return await this.page.title();
    // }

    // async getAppUrl():Promise<string>
    // {
    //     return this.page.url();
    // }

    async fillUserName(un:string):Promise<void>
    {
        await this.username.fill(un);
    }

    async fillPassword(psw:string):Promise<void>
    {
        await this.password.fill(psw);
    }

    async clickOnLogin():Promise<void>
    {
        await this.loginbutton.click();
    }

    async doLogin(un:string,psw:string)
    {
        await this.username.fill(un);
        await this.password.fill(psw);
        await this.loginbutton.click();
    }

    async getErrorMessage():Promise<string>
    {
        return await this.errorheading.innerText();
    }
}