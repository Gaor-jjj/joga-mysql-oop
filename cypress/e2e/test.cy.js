describe('Logging homepage article titles, admin login, article creation, article deletion and logging out', () => {

  it('Should visit the homepage and click the login link', () => {
    // Step 1: Visit the homepage
    cy.visit('http://localhost:3025/');

    // Step 2: Log the titles of each article
    cy.get('article h2').each(($el) => {
      cy.log($el.text());
    });

    // Step 3: Click the login link
    cy.get('a[href="/user/login"]').click();

    // Step 4: Check URL contains /user/login
    cy.url().should('include', '/user/login');
  });

  it('Should fill the login form and submit', () => {
    // Step 5: Fill in the username
    cy.get('#username').type('admin'); 

    // Step 6: Fill in the password
    cy.get('#password').type('qwerty');

    // Step 7: Submit the form
    cy.get('button[type="submit"]').click();
  });

  it('Should create a new article', () => {
    // Step 8: Click the "Create New Article" link
    cy.get('a[href="/article/create"]').click();

    // Step 9: Fill in the article form
    cy.get('#name').type('Test Title'); 
    cy.get('#slug').type('test-slug'); 
    cy.get('#image').type('test-image.jpg');
    cy.get('#body').type('Random text'); 

    // Step 10: Select the author from the dropdown
    cy.get('#author_id').select('2');

    // Step 11: Submit the article form
    cy.get('button[type="submit"]').click();
  });

  it('Should delete the article and log out', () => {
    // Step 12: Delete the article by clicking the button with class 'danger'
    cy.get('.danger').click();

    // Step 13: Click the logout link
    cy.get('a[href="/user/logout"]').click();
  });

});
