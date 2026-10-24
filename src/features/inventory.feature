Feature: Test for inventory page

Background:
    Given User should be logged in as valid user

@smoke
Scenario: Verify products are displayed on th page
    Then User should see at least 1 product on the page

@regression
Scenario: Add product to cart
    When User add "Sauce Labs Bolt T-Shirt" to the cart
    Then Cart badge should display "1" item

@functional
Scenario: Sort the products by price low to high
    When User sorted the product "Price (low to high)"
    Then User should see the lowest price product first
