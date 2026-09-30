import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage.js";

//AAA: arrange(pre-condition)-->act(design test)-->assert(validation)

test("Test to validate url",async({page})=>{
    let loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    let actUrl = loginPage.getAppUrl();
    expect(actUrl).toBe("https://www.saucedemo.com/");
    console.log("Current url is :"+actUrl);
})

test("Test to validate title",async({page})=>{
    let loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    let actTitle = await loginPage.getAppTitle();
    expect(actTitle).toBe("Swag Labs"); 
    console.log("Current Title is :"+actTitle);   
})

test("Test for Login feature",async({page})=>{
    let loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.fillUserName("standard_user");
    await loginPage.fillPassword("secret_sauce");
    await loginPage.clickOnLogin();
    expect(page).toHaveURL(/inventory/);
    console.log("User login successfully and navigated to inventory page");  
})
