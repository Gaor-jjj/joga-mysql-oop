Feature: User registration restrictions

  Background: 
    Given I am on the homepage

  Scenario: Username already exists
    When I click on the register link
    And I fill out the registration form with username "admin", email "test@test", and password "qwerty"
    Then I should see the message "Username already exists"
    And I should still be on the registration page

  Scenario: Password is too short
    When I click on the register link
    And I fill out the registration form with username "uniqueuser", email "test@test", and password "qwert"
    Then I should see the message "Password must be at least 6 characters long"
    And I should still be on the registration page
