class InventoryPage {
    getProductCount() {
        return cy.get('.inventory_item');
    }

    getProductName(index) {
        return cy.get('.inventory_item_name').eq(index);
    }

    getProductDescription(index) {
        return cy.get('.inventory_item_desc').eq(index);
    }

    getProductPrice(index) {
        return cy.get('.inventory_item_price').eq(index);
    }

    getProductImage(index) {
        return cy.get('.inventory_item_img').eq(index);
    }

    addToCart(index) {
        cy.get('.btn_inventory').eq(index).click();
    }

    goToCart() {
        cy.get('.shopping_cart_link').click();
    }

    verifyCartBadge(count) {
        cy.get('.shopping_cart_badge').should('have.text', count);
    }
}

export default new InventoryPage();