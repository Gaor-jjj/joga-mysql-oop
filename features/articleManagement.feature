Feature: Article management

  Background: Admin is logged in
    Given I am logged in as an admin

  Scenario: Admin creates a new article
    When I navigate to the article creation page
    And I enter article details
    And I submit the article form
    Then I should see the created article page

  Scenario: Admin deletes an article
    Given an article exists
    When I delete the article
    Then I should not see the deleted article on the homepage
