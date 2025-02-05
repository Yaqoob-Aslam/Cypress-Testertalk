class LoginPage {
    visit() {
        cy.visit('https://www.saucedemo.com/');
    }

    fillUsername(username) {
        cy.get('#user-name').type(username);
    }

    fillPassword(password) {
        cy.get('#password').type(password);
    }

    submit() {
        cy.get('#login-button').click();
    }

    verifyLoginSuccess() {
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('have.text', 'Products');
    }
}

export default new LoginPage();