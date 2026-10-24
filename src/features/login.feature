
Feature: Test for SwagLab application Login Module

Scenario: Test login with valid credentials
    Given User is on login page
    When User enter username "standard_user"
    And User enter password "secret_sauce"
    And User click on Login button
    Then User should be navigate to inventory page

Scenario: Test login with invalid credentials
    Given User is on login page
    When User enter username "invalid_user"
    And User enter password "invalid_sauce"
    And User click on Login button
    Then User should see error message "Epic sadface: Username and password do not match any user in this service"

#Data driven testing approach
Scenario Outline: Login Test with Data driven approach
    Given User is on login page
    When User enter username "<username>"
    And User enter password "<password>"
    And User click on Login button
    Then User should see "<result>"

    #TestData
    Examples:
    |username       |password    |result|
    |standard_user  |secret_sauce|inventory page|
    |locked_out_user|secret_sauce|Epic sadface: Sorry, this user has been locked out.|
    |invalid_user   |secret_sauce|Epic sadface: Username and password do not match any user in this service|
    |standard_user  |            |Epic sadface: Password required|

    # To check cucumber listener for failure, removed 'is' from last test