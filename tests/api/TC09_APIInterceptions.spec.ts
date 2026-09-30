import {test, expect} from "@playwright/test";

test("API-Interception-observe multiple requests",async({page})=>{

    await page.route("**/*",async(routepath)=>{//**/* match every url and every method
        console.log("API intercepted!");
        console.log("URL:"+routepath.request().url());
        console.log("RequestMethod:"+routepath.request().method());

        await routepath.continue(); //send request to real server
    })

    await page.goto("https://demo.playwright.dev/api-mocking/");
    await page.waitForTimeout(2000);
})

test("API-Interception-observe single request",async({page})=>{

    await page.route("**/api/v1/fruits",async(routepath)=>{
        console.log("API intercepted!");
        console.log("URL:"+routepath.request().url());
        console.log("RequestMethod:"+routepath.request().method());

        await routepath.continue(); //send request to real server
    })

    await page.goto("https://demo.playwright.dev/api-mocking/");
    await page.waitForTimeout(2000);
})

test("API interception - To block any API request",async({page})=>{
    await page.route("https://demo.playwright.dev/api-mocking/",async(routepath)=>{
        console.log("Request intercepted!");
        await routepath.abort();    //Aborts the route's request.
    })
})

test("API interception-mock the response",async({page})=>{

    //intercept request
    await page.route("https://jsonplaceholder.typicode.com/users/1",async(routepath)=>{

        //mock data
        let data = {
            id:101, 
            fname:"Sarang",
            location:"Pune"
        }

        //response from server
        routepath.fulfill({
            status:200,
            contentType:"application/json",
            body:JSON.stringify(data)   //js object to JSON conversion
        })
    })
    await page.goto("https://jsonplaceholder.typicode.com/users/1");
    await page.waitForTimeout(2000);
})

test("API Interception-Mocking the current response",async({page})=>{

    await page.route("https://tutorialsninja.com/demo/index.php?route=product/search&search=macbook",async(routepath)=>{
    
    //mock data
    let fakeProducts=[
        {pid:101, pname:"Macbook pro12", price:98000},
        {pid:102, pname:"Macbook pro13", price:95000},
        {pid:103, pname:"Macbook pro14", price:91000}
    ]

    //send mock data as server response
    routepath.fulfill({
        status:200,
        contentType:"application/json",
        body:JSON.stringify(fakeProducts)
    })
    });

    await page.goto("https://tutorialsninja.com/demo/index.php?route=product/search&search=macbook");
    await page.waitForTimeout(2000);

})