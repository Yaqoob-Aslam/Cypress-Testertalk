describe('W3Schools Tryit Editor Iframe Test', () => {
    it('should interact with elements inside the iframe', () => {
      // Step 1: Visit the W3Schools Tryit Editor page
      cy.visit('https://www.w3schools.com/html/tryit.asp?filename=tryhtml_default');
  
      // Step 2: Locate the iframe and interact with its content
      cy.get('#iframeResult', { timeout: 10000 }).then($iframe => {
        // Step 3: Access the body of the iframe
        const $body = $iframe.contents().find('body');
  
        // Step 4: Assert the content of the <h1> element inside the iframe
        cy.wrap($body).find('h1').should('have.text', 'This is a Heading');
  
        // Step 5: Assert the content of the <p> element inside the iframe
        cy.wrap($body).find('p').should('have.text', 'This is a paragraph.');
      });
    });
  });