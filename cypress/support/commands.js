
// Custom command to handle iframe
Cypress.Commands.add('iframe', { prevSubject: 'element' }, ($iframe) => {
    // Wait for the iframe to load and return its body
    return cy.wrap($iframe, { timeout: 15000 }) // Increase timeout to 15 seconds
      .should(($iframe) => {
        // Ensure the iframe has loaded and has a body
        expect($iframe.contents().find('body')).to.exist;
      })
      .then(($iframe) => {
        return $iframe.contents().find('body');
      });
  });