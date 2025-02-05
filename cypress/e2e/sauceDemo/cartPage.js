class CartPage {
    verifyProductInCart(productName) {
         // Wait for the cart to load
        cy.get('.cart_list', { timeout: 10000 }).should('be.visible'); // Adjust timeout as needed
        cy.get('.cart_item').should('contain', productName);
    }

    verifyCartQuantity() {
        cy.get('.cart_quantity').should('have.text', '1');
    }

    verifyProductPrice() {
        cy.get('.inventory_item_price').should('be.visible');
    }

    proceedToCheckout() {
        cy.get('#checkout').click();
    }

    verifyEmptyCart() {
        cy.get('.cart_item').should('not.exist');
        cy.get('.cart_quantity').should('not.exist');
        cy.get('.inventory_item_price').should('not.exist');
    }
}

export default new CartPage();