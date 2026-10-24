import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/Worlds";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { expect } from "@playwright/test"

let loginPage:LoginPage;
let inventoryPage:InventoryPage;

Given('User should be logged in as valid user', async function (this:CustomWorld) {
  loginPage = new LoginPage(this.page);
  inventoryPage = new InventoryPage(this.page); 
  await loginPage.goToLoginPage();
  await loginPage.enterUsername("standard_user");
  await loginPage.enterPassword("secret_sauce");
  await loginPage.clickOnLoginButton();
});

Then('User should see at least {int} product on the page', async function (this:CustomWorld, expProductCount:number) {
  let actProductCount = await inventoryPage.getProductCount();
  expect(actProductCount).toBeGreaterThanOrEqual(expProductCount);
});

When('User add {string} to the cart', async function (this:CustomWorld, productName:string) {
  await inventoryPage.addProductCart(productName);
});

Then('Cart badge should display {string} item', async function (this:CustomWorld, expBadgeCount:string) {
  let actBadgeCount = await inventoryPage.getBadgeCount(); 
  expect(actBadgeCount).toBe(expBadgeCount);
});

When('User sorted the product {string}', async function (this:CustomWorld, option:string) {
  await inventoryPage.selectOption(option);
});

Then('User should see the lowest price product first', async function (this:CustomWorld) {
  inventoryPage.getAllPrice();
});