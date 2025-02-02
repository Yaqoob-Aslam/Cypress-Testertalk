describe('Data-Driven Login Tests on Sauce Demo', () => {
    
   beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
     });
     
     const testData = require('../fixtures/loginData.json');

     testData.forEach((data) => {
        it('LoginUser Data', () => {
          // Enter username and password
          cy.get('#user-name').type(data.username);
          cy.get('#password').type(data.password);
    
          // Click the login button
          cy.get('#login-button').click();

          // Verify the expected result
        if (data.expectedResult === 'success') {
            // If login is successful, verify the inventory page is displayed
            cy.url().should('include', '/inventory.html');
            cy.get('.title').should('have.text', 'Products');
        } else {
            // If login fails, verify the error message
            cy.get('[data-test="error"]').should('have.text', data.expectedResult);
        }
        });
    });
});
