//cucumber hooks: BeforeAll, AfterAll, After, Before

import { BeforeAll, AfterAll, After, Before } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium } from "@playwright/test";
import { CustomWorld } from "./Worlds";

let browser:Browser;

BeforeAll(async()=>{
    //will execute before all tests: BrowserSetup
    //playwright 1.57---> directly open browser without channel
    browser = await chromium.launch({headless:false});
})

//An arrow function cannot have a 'this' parameter. 
Before(async function(this:CustomWorld){ //here this keyword refers to CustomWorld object
    //create context and page for same browser session
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
})

After(async function(this:CustomWorld)
{
    //screenshot
    let screenshot = await this.page.screenshot();
    this.attach(screenshot,"image/png");
    await this.page.waitForTimeout(2000);
    await this.page.close();
    await this.context.close();
})

AfterAll(async function()
{
    await browser.close();
})