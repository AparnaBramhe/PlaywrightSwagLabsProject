import { setWorldConstructor, World } from "@cucumber/cucumber";
import { BrowserContext, Page } from "@playwright/test";

//this CustomWorld we are supplying to stepdef 
//supply fixtures
export class CustomWorld extends World
{
    context!:BrowserContext;
    page!:Page;
}

setWorldConstructor(CustomWorld);

/*
Q: What is the purpose of setWorldConstructor(CustomWorld) 
in Cucumber with Playwright?

Answer: It registers a custom World class with Cucumber 
so each scenario gets its own World instance containing the properties 
and objects needed by its step definitions, 
such as the Playwright page and context.

*/