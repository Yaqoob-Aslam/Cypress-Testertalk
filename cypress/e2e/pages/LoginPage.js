class LoginPage{
    elements = {
        usernameInput: ()=> cy.get('#user-name'),
        passwordInput: ()=> cy.get('#password'),
        loginButton: ()=> cy.get('#login-button'),
        errorMessage: () => cy.get('[data-test="error"]')
    }
    visit() {
        cy.visit('https://www.saucedemo.com/');
    }
    typeUsername(username){
        this.elements.usernameInput().type(username);
    }
    typePassword(password){
        this.elements.passwordInput().type(password);
    }
    clickLoginButton(){
        this.elements.loginButton().click();
    }
    verifyErrorMessage(message){
        this.elements.errorMessage().should('have.text',message);
    }
    verifySuccessfulLogin(){
        cy.url().should('include','inventory.html');
        cy.get('.title').should('have.text', 'Products');
    }
}

export default LoginPage;
