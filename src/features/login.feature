
Feature: Test for SwagLab application Login Module

Scenario: Test login with valid credentials

    Given User is on login page
    When User enter username "standard_user"
    And User enter password "secret_sauce"
    And User click on Login button
    Then User should be navigate to inventory page