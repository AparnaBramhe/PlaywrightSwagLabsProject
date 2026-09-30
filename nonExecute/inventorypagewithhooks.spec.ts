import { test, expect } from "@playwright/test";
import { InventoryPage } from "../src/pages/InventoryPage.js";
import { LoginPage } from "../src/pages/LoginPage.js";

let loginPage:LoginPage;
let inventoryPage:InventoryPage;

test.beforeEach(async({page})=>{
    //create an object of pages
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.doLogin("standard_user","secret_sauce");
    inventoryPage =new InventoryPage(page);
})

test("Test for total product count",async({})=>{
    let totalProducts = await inventoryPage.getProductCount();
    expect(totalProducts).toBe(6);
    console.log("Total Products count matched!:",totalProducts);
})

test("Test to get product detatils",async({})=>{
    let allProducts = await inventoryPage.getProductDetails();
    console.log(allProducts);
    expect(allProducts).toContain("Sauce Labs Bolt T-Shirt");
    console.log("Product found!");
})

test("Test to add product into cart",async({})=>{
    await inventoryPage.addProductIntoCart("Sauce Labs Bolt T-Shirt");
})  