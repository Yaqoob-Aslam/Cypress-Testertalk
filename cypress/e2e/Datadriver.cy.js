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

        });
    });
});
