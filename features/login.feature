Feature: User login and logout

  Scenario: User can log in and log out with valid credentials
    Given I am on the homepage
    When I click on the login link
    And I enter valid login credentials
    And I submit the login form
    Then I should see the welcome message
    And I log out
