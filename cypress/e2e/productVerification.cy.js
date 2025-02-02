/// <reference types="cypress" />

describe('Product Verification Tests on Sauce Demo', () => {
    it('Verify the product details', () => {
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('have.text', 'Products');
        cy.get('.inventory_item_name').should('have.length', 6);
        cy.get('.inventory_item_name').eq(0).should('have.text', 'Sauce Labs Backpack');
        cy.get('.inventory_item_desc').eq(0).should('have.text', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
        cy.get('.inventory_item_price').eq(0).should('have.text', '$29.99');
        cy.get('#add-to-cart-sauce-labs-backpack').eq(0).should('be.visible', 'have.text', 'Add to cart');
        cy.get('.inventory_item_img').eq(0).should('be.visible');
        cy.get('.inventory_item_name').eq(0).click();
        cy.url().should('include', '/inventory-item.html');

         // Verify the Details of the product on details page
        cy.get('.inventory_details_name').eq(0).should('have.text', 'Sauce Labs Backpack');
        cy.get('.inventory_details_desc').eq(0).should('have.text', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
        cy.get('.inventory_details_price').eq(0).should('have.text', '$29.99');
        cy.get('button').should('be.visible', 'have.text', 'Add to cart');
        cy.url().should('include', 'inventory-item.html?id=4');
        cy.get('#back-to-products').click();

        // Add the product to the cart
        cy.get('#add-to-cart-sauce-labs-backpack').eq(0).should('be.visible', 'have.text', 'Add to cart').click();
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');
        cy.get('.shopping_cart_badge').should('have.text', '1');

        // Verify the product in the cart
        cy.get('.cart_quantity').should('have.text', '1');
        cy.get('.cart_desc_label').should('have.text', 'Description');
        cy.get('.inventory_item_price').should('have.text', '$29.99');
        cy.get('#remove-sauce-labs-backpack').should('have.text', 'Remove');
        cy.get('#checkout').should('be.visible', 'have.text', 'Checkout').click();
        cy.url().should('include', '/checkout-step-one.html');

        // Verify the product in the checkout page
        cy.get('#first-name').should('be.visible').type('John')
        cy.get('#last-name').should('be.visible').type('Doe')
        cy.get('#postal-code').should('be.visible').type('12345')
        cy.get('#continue').should('be.visible').click();

        // Verify the product in the checkout overview page
        cy.url().should('include', '/checkout-step-two.html');
        cy.get('.cart_quantity').should('have.text', '1');
        cy.get('.cart_desc_label').should('have.text', 'Description');
        cy.get('.inventory_item_price').should('have.text', '$29.99');
        cy.get('#finish').should('be.visible').click();

        // Verify the product in the checkout complete page
        cy.url().should('include', '/checkout-complete.html');
        cy.get('.complete-header').should('have.text', 'Thank you for your order!');
        cy.get('.complete-text').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        
        // Verify the pony image in the checkout complete page 
        cy.get('.pony_express').should('be.visible');
        cy.get('#back-to-products').click();
        cy.url().should('include', '/inventory.html');


    })
});