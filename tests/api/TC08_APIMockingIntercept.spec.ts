/* API Interception:
Interception means Playwright catches a network request 
before it reaches the server and allows you to inspect, modify, or block it.

API Mocking:
Mocking means you don't call the real backend. 
Instead, Playwright provides a fake response.

This is extremely useful when:
    - Backend is unavailable
    - API is slow
    - Test data is difficult to create
    - You want to test error scenarios
    - You want predictable test results

route.continue():   Request goes to real API
route.fulfill()	:   Playwright returns fake response
route.abort()	:   Request is blocked
route.fallback():   Passes handling to another route handler
Modify request	:   Change headers, URL, method, POST data etc.
Modify response	:   Change the real API response before browser receives it
*/
import {test,expect} from "@playwright/test";

test("Test for API mocking and intercept",async({page})=>{

    //intercept current api
    await page.route("**/api/v1/fruits",async(routepath)=>{
        //create mock/fake data
        const fakeData=[
            {id:1,name:'Apple'},
            {id:2,name:'Mango'}
        ]

        //set this data as current server response
        routepath.fulfill({
            status:200,
            contentType:"application/json",
            body:JSON.stringify(fakeData)   //converting js data into JSON format
        })
    });
    

    //real request
    await page.goto("https://demo.playwright.dev/api-mocking/");
    await page.waitForTimeout(2000);
})

