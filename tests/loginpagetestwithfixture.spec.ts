import { test, expect } from "../src/fixtures/pagefixtures.js"
import { readExcelFileSheetWise } from "../src/utilities/ExcelFileReading.js";
import { readExcelFileDDT } from "../src/utilities/ExcelDDT.js";

test("Test to validate login page url",async({loginPage})=>{
    let pageUrl = await loginPage.getPageUrl();
    expect(pageUrl).toBe("https://www.saucedemo.com/");
    console.log("Current page url matched!",pageUrl);
})

test("Test to validate login page title",async({loginPage})=>{
    let pageTitle = await loginPage.getPageTitle();
    expect(pageTitle).toBe("Swag Labs");
    console.log("Current page title matched!",pageTitle);
})

test("Test for login functionality with valid credentials",async({loginPage,page})=>{
    // let data = readExcelFileSheetWise("LoginPage",0);
    // await loginPage.doLogin(data.username, data.password);
    //await loginPage.doLogin("standard_user","secret_sauce");
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
    await expect(page).toHaveURL(/inventory/);
    console.log("User logged in successfully and navigated to Inventory page!");
})

test("Test for login functionality with invalid(both blank) credentials",async({loginPage})=>{
    await loginPage.doLogin("","");
    let errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe("Epic sadface: Username is required");
    console.log("Error message for blank username and password validated");
})

let dataset = readExcelFileDDT("DataDrivenTest");
for(let data of dataset)
{
    test(`Test for invalid login ${data.id}`,async({loginPage})=>{
        await loginPage.doLogin(data.username,data.password);
        expect(await loginPage.getErrorMessage()).toBeTruthy();
        console.log("Error message:",await loginPage.getErrorMessage());
    })
}