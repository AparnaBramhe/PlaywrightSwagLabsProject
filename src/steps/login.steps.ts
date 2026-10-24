import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/LoginPage";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/Worlds";

let loginPage:LoginPage;
Given('User is on login page', async function (this:CustomWorld) {
    loginPage = new LoginPage(this.page);
    await loginPage.goToLoginPage();
});

When('User enter username {string}', async function (this:CustomWorld,username) {
    await loginPage.enterUsername(username);
});

When('User enter password {string}', async function (this:CustomWorld,password) {
    await loginPage.enterPassword(password);
});

When('User click on Login button', async function (this:CustomWorld) {
    await loginPage.clickOnLoginButton();
});

Then('User should be navigate to inventory page', async function (this:CustomWorld) {
    expect(await loginPage.getPageUrl()).toContain('inventory');
    console.log("Login completed and user navigate to inventory page!");
});

Then('User should see error message {string}', async function (this:CustomWorld,expErrorMessage) {
  let actErrorMessage = await loginPage.getErrorMessage();
  expect(actErrorMessage).toContain(expErrorMessage)
});

Then('User should see {string}', async function (this:CustomWorld,result) {

  if(result === 'inventory page')
  {
    expect(await loginPage.getPageUrl()).toContain('inventory');
    console.log("Login completed.. User navigate to inventory page");
  }
  else
  {
    let actualErrorMessage = await loginPage.getErrorMessage();
    expect(actualErrorMessage).toContain(result);
    console.log("Login fail..",result);
  }
});