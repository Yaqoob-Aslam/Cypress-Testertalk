class LoginPage {
    // Define elements
    elements = {
      usernameInput: () => cy.get('#user-name'),
      passwordInput: () => cy.get('#password'),
      loginButton: () => cy.get('#login-button'),
      errorMessage: () => cy.get('[data-test="error"]')
    };
  
    // Define actions
    visit() {
      cy.visit('https://www.saucedemo.com/');
    }
  
    typeUsername(username) {
      if (username) {
        this.elements.usernameInput().type(username);
      }
    }
  
    typePassword(password) {
      if (password) {
        this.elements.passwordInput().type(password);
      }
    }
  
    clickLoginButton() {
      this.elements.loginButton().click();
    }
  
    verifyErrorMessage(message) {
      this.elements.errorMessage().should('have.text', message);
    }
  }
  
  export default LoginPage;