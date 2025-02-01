describe('W3Schools Tryit Editor Hooks Example', () => {
  // Runs once before all tests
  before(() => {
    cy.log('Before All Tests: Visiting the W3Schools Tryit Editor page');
    cy.visit('https://www.w3schools.com/html/tryit.asp?filename=tryhtml_default');
    
    // Debug: Log the entire body to check if the iframe exists
    cy.get('body').then(($body) => {
      cy.log($body.html());
    });
    
    // Wait for the iframe to be present in the DOM
    cy.get('#iframeResult', { timeout: 15000 }).should('exist');
  });

  // Runs before each test
  beforeEach(() => {
    cy.log('Before Each Test: Reloading the page');
    //cy.reload(); // Reload the page to ensure a clean state for each test
  });

  // Runs after each test
  afterEach(() => {
    cy.log('After Each Test: Test completed');
  });

  // Runs once after all tests
  after(() => {
    cy.log('After All Tests: All tests completed');
  });

  // Test 1: Verify the <h1> element
  it('should verify the <h1> element', () => {
    cy.get('#iframeResult', { timeout: 15000 }) // Increased timeout
      .iframe() // Custom command to access the iframe
      .then($body => {
        cy.wrap($body)
          .find('h1')
          .should('have.text', 'This is a Heading');
      });
  });

  // Test 2: Verify the <p> element
  it('should verify the <p> element', () => {
    cy.get('#iframeResult', { timeout: 15000 }) // Increased timeout
      .iframe() // Custom command to access the iframe
      .then($body => {
        // Wait for the <p> element to exist
        cy.wrap($body)
          .find('p', { timeout: 10000 }) // Wait up to 10 seconds for the <p> element
          .should('have.text', 'This is a paragraph.');
      });
  });
});
