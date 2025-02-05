class FooterPage {
    verifyFooter() {
        cy.get('.footer').should('be.visible');
        cy.get('.social li').should('have.length', 3);
        cy.get('.social_twitter a').should('have.attr', 'href', 'https://twitter.com/saucelabs');
        cy.get('.social_facebook a').should('have.attr', 'href', 'https://www.facebook.com/saucelabs');
        cy.get('.social_linkedin a').should('have.attr', 'href', 'https://www.linkedin.com/company/sauce-labs/');
        cy.get('.footer_copy').should('have.text', '© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
    }
}

export default new FooterPage();