class CheckoutPage {
    fillFirstName(firstName) {
        cy.get('#first-name').type(firstName);
    }

    fillLastName(lastName) {
        cy.get('#last-name').type(lastName);
    }

    fillPostalCode(postalCode) {
        cy.get('#postal-code').type(postalCode);
    }

    continue() {
        cy.get('#continue').click();
    }

    verifyCheckoutOverview(productName) {
        cy.get('.cart_item').should('contain', productName);
        cy.get('.cart_quantity').should('have.text', '1');
        cy.get('.inventory_item_price').should('be.visible');
    }

    completeCheckout() {
        cy.get('#finish').click();
    }

    verifyCheckoutComplete() {
        cy.get('.complete-header').should('have.text', 'Thank you for your order!');
        cy.get('.complete-text').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        cy.get('.pony_express').should('be.visible');
    }

    goBackToInventory() {
        cy.get('#back-to-products').click();
    }
}

export default new CheckoutPage();