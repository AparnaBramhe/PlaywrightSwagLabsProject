import { test, expect } from "../src/fixtures/pagefixtures.js";
import { readExcelFileSheetWise } from "../src/utilities/ExcelFileReading.js"; 

test.beforeEach(async({loginPage})=>{
    // let data = readExcelFileSheetWise("LoginPage",0);
    //     await loginPage.doLogin(data.username, data.password);
    //await loginPage.doLogin("standard_user","secret_sauce");
    await loginPage.doLogin(process.env.APPUSERNAME!, process.env.APPPASSWORD!);
})

test("Test for product count match",async({inventoryPage})=>{
    let totalProducts = await inventoryPage.getProductCount();
    expect(totalProducts).toBe(6);
    console.log("Total products matched..."+totalProducts);
})

test("To validate product details",async({inventoryPage})=>{
    let allProducts = await inventoryPage.getProductDetails();
    console.log(allProducts);
    expect(allProducts).toContain("Sauce Labs Bolt T-Shirt");
    console.log("Product found!");    
})

test("Test to add product into cart",async({inventoryPage})=>{
    let ivpagedata=readExcelFileSheetWise("InventoryPage",0);
    await inventoryPage.addProductIntoCart(ivpagedata.product1);
    //await inventoryPage.addProductIntoCart("Sauce Labs Bolt T-Shirt");
}) 

test("Test for Total footers count validation",async({inventoryPage})=>{
    let totalFooters = await inventoryPage.getAllFootersCount();
    expect(totalFooters).toBe(3);
    console.log("Total footers count matched:",totalFooters);
})

test("Test to get footer details",async({inventoryPage})=>{
    await inventoryPage.getAllFootersList();
})