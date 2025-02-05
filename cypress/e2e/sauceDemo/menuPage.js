class MenuPage {
    openMenu() {
        cy.get('.bm-burger-button').click();
    }

    verifyMenuLinks() {
        cy.get('#inventory_sidebar_link').should('have.text', 'All Items');
        cy.get('#about_sidebar_link').should('have.text', 'About');
        cy.get('#logout_sidebar_link').should('have.text', 'Logout');
        cy.get('#reset_sidebar_link').should('have.text', 'Reset App State');
    }

    closeMenu() {
        cy.get('#react-burger-cross-btn').click();
    }
}

export default new MenuPage();