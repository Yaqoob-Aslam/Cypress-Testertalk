class ProductDetailsPage {
    verifyProductName(name) {
        cy.get('.inventory_details_name').should('have.text', name);
    }

    verifyProductDescription() {
        cy.get('.inventory_details_desc').should('be.visible');
    }

    verifyProductPrice() {
        cy.get('.inventory_details_price').should('be.visible');
    }

    addToCart() {
        cy.get('.btn_inventory').should('be.visible').and('have.text', 'Add to cart');
    }

    goBackToInventory() {
        cy.get('#back-to-products').click();
    }
}

export default new ProductDetailsPage();