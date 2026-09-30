//Encapsulation : Private data & Public methods

import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage
{
    //locators
    private readonly productName;
    private readonly removeButton;
    private readonly continuShoppingBtn;
    private readonly checkoutBtn;
    private readonly cartOption;

    //constructor
    constructor(page:Page)
    {
        super(page);
        this.productName = page.locator("div.inventory_item_name");
        this.removeButton = page.getByRole("button",{name:"Remove"});
        this.continuShoppingBtn = page.locator("button#continue-shopping");
        this.checkoutBtn = page.getByRole("button",{name:"Checkout"});
        this.cartOption = page.locator("a.shopping_cart_link");
    }

    //methods
    async gotoCartPage():Promise<void>
    {
        await this.cartOption.click();
    }

    async getCartProductDetails():Promise<string[]>
    {
        return await this.productName.allInnerTexts();
    }

    async removeProduct():Promise<void>
    {
        await this.removeButton.click();
    }

    async doContinueShopping():Promise<void>
    {
        return await this.continuShoppingBtn.click();
    }

    async gotoCheckoutPage():Promise<void>
    {
        return await this.checkoutBtn.click();
    }
}