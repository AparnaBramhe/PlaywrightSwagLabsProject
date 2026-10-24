import { Page } from "@playwright/test"

export class InventoryPage
{
    constructor(private page:Page){};

    private locators={
        inventoryItems: ".inventory_item_name",
        cartBadge: ".shopping_cart_badge",
        sortDropdown: ".product_sort_container",
        itemPrice: ".inventory_item_price",
        addToCartButton: (productName:string)=>`//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button`
    }

    async getProductCount():Promise<number>
    {
        return await this.page.locator(this.locators.inventoryItems).count();
    }

    async addProductCart(productName:string):Promise<void>
    {
        return this.page.locator(this.locators.addToCartButton(productName)).click();
    }

    async getBadgeCount():Promise<string>
    {
        return this.page.locator(this.locators.cartBadge).innerText();
    }

    async selectOption(option:string)
    {
        await this.page.locator(this.locators.sortDropdown).selectOption({label:option});
    }

    async getAllPrice()
    {
        let allPrice:string[] = await this.page.locator(this.locators.itemPrice).allInnerTexts();
        console.log(allPrice);
    }
}
