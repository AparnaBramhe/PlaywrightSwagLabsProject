import { test, expect } from "../src/fixtures/pagefixtures.js";
import { readExcelFileSheetWise } from "../src/utilities/ExcelFileReading.js";

test.beforeEach(async({loginPage, inventoryPage})=>{
    // let data = readExcelFileSheetWise("LoginPage",0);
    // await loginPage.doLogin(data.username, data.password);
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
    await loginPage.waitUtil();
    let ivpagedata=readExcelFileSheetWise("InventoryPage",0);
    await inventoryPage.addProductIntoCart(ivpagedata.product1);
})

test("Test for cart page launch",async({cartPage})=>{
    await cartPage.gotoCartPage();
    expect(await cartPage.getPageUrl()).toContain("cart");
    console.log("User navigated to cart page!");
})

test("Test to get cart details",async({cartPage})=>{
    await cartPage.gotoCartPage();
    let details:string[] = await cartPage.getCartProductDetails();
    console.log(details);
    expect(details[0]).toBe("Sauce Labs Fleece Jacket");
    console.log("Product validation is done!");
})

test("Test to remove product",async({cartPage})=>{
    await cartPage.gotoCartPage();
    await cartPage.removeProduct();
    expect(cartPage.getCartProductDetails.length).toBe(0);
    console.log("Product removed from the cart!");
})

test("Test to continue shopping and add new product into cart", async({cartPage,inventoryPage})=>{
    await cartPage.gotoCartPage();
    await cartPage.doContinueShopping();
    //inventory
    let ivpagedata=readExcelFileSheetWise("InventoryPage",0);
    await inventoryPage.addProductIntoCart(ivpagedata.product2);
    await cartPage.gotoCartPage();
    let data = await cartPage.getCartProductDetails(); 
    console.log("Total products added:",data.length);
    expect(data[1]).toBe("Sauce Labs Backpack");
})

test("Test to validate checkout page launch",async({cartPage})=>{
    await cartPage.gotoCartPage();
    await cartPage.gotoCheckoutPage();
    expect(await cartPage.getPageUrl()).toBe("https://www.saucedemo.com/checkout-step-one.html");
    console.log("User navigated to checkout page!");
})