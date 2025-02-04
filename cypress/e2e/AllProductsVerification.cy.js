/// <reference types="cypress" />

describe('All Products Verification Tests on Sauce Demo', () => {
    beforeEach(() => {
        // Visit the Sauce Demo website and log in
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('have.text', 'Products');
    });

    it.skip('Verify all product details and perform checkout', () => {
        // Get the number of products
        cy.get('.inventory_item').then(($products) => {
            const productCount = $products.length;

            // Loop through each product
            for (let i = 0; i < productCount; i++) {
                // Verify product details on the inventory page
                cy.get('.inventory_item_name').eq(i).then(($productName) => {
                    const productName = $productName.text();
                    cy.get('.inventory_item_name').eq(i).should('be.visible').and('have.text', productName);
                    cy.get('.inventory_item_desc').eq(i).should('be.visible');
                    cy.get('.inventory_item_price').eq(i).should('be.visible');
                    cy.get('.inventory_item_img').eq(i).should('be.visible');
                    cy.get('.btn_inventory').eq(i).should('be.visible').and('have.text', 'Add to cart');

                    // Click on the product to view details
                    cy.get('.inventory_item_name').eq(i).click();
                    cy.url().should('include', '/inventory-item.html');

                    // Verify product details on the details page
                    cy.get('.inventory_details_name').should('have.text', productName);
                    cy.get('.inventory_details_desc').should('be.visible');
                    cy.get('.inventory_details_price').should('be.visible');
                    cy.get('.btn_inventory').should('be.visible').and('have.text', 'Add to cart');

                    // Go back to the inventory page
                    cy.get('#back-to-products').click();
                    cy.url().should('include', '/inventory.html');

                    // Add the product to the cart
                    cy.get('.btn_inventory').eq(i).click();
                    cy.get('.shopping_cart_badge').should('have.text', '1');

                    // Navigate to the cart
                    cy.get('.shopping_cart_link').click();
                    cy.url().should('include', '/cart.html');

                    // Verify the product in the cart
                    cy.get('.cart_item').should('contain', productName);
                    cy.get('.cart_quantity').should('have.text', '1');
                    cy.get('.inventory_item_price').should('be.visible');

                    //"Remove" button in the cart
                   // cy.get('#remove-sauce-labs-backpack').should('have.text', 'Remove');


                    // Proceed to checkout
                    cy.get('#checkout').click();
                    cy.url().should('include', '/checkout-step-one.html');

                    // Fill out checkout information
                    cy.get('#first-name').type('John');
                    cy.get('#last-name').type('Doe');
                    cy.get('#postal-code').type('12345');
                    cy.get('#continue').click();
                    cy.url().should('include', '/checkout-step-two.html');

                    // Verify the product in the checkout overview
                    cy.get('.cart_item').should('contain', productName);
                    cy.get('.cart_quantity').should('have.text', '1');
                    cy.get('.inventory_item_price').should('be.visible');

                    // Complete the checkout
                    cy.get('#finish').click();
                    cy.url().should('include', '/checkout-complete.html');

                    // Verify the checkout complete page
                    cy.get('.complete-header').should('have.text', 'Thank you for your order!');
                    cy.get('.complete-text').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
                    cy.get('.pony_express').should('be.visible');

                    // Go back to the inventory page
                    cy.get('#back-to-products').click();
                    cy.url().should('include', '/inventory.html');
                });
            }
        });
    });
    
    it('Verify empty cart', () => {     
        // Navigate to the cart
        cy.get('.shopping_cart_link').click();
        cy.url().should('include', '/cart.html');

        // Verify the product in the cart
        cy.get('.cart_item').should('not.exist');
        cy.get('.cart_quantity').should('not.exist');
        cy.get('.inventory_item_price').should('not.exist');
    });

    it('Verify menu links', () => {
        cy.get('.bm-burger-button').click();
        cy.get('#inventory_sidebar_link').should('have.text', 'All Items');
        cy.get('#about_sidebar_link').should('have.text', 'About');
        cy.get('#logout_sidebar_link').should('have.text', 'Logout');
        cy.get('#reset_sidebar_link').should('have.text', 'Reset App State');
        cy.get('#react-burger-cross-btn').click();
    });

    it('Verify footer links', () => {
        cy.get('.footer').should('be.visible');
        cy.get('.social li').should('have.length', 3);

        cy.get('.social_twitter a').should('have.attr', 'href', 'https://twitter.com/saucelabs');
        cy.get('.social_facebook a').should('have.attr', 'href', 'https://www.facebook.com/saucelabs');
        cy.get('.social_linkedin a').should('have.attr', 'href', 'https://www.linkedin.com/company/sauce-labs/');
        cy.get('.footer_copy').should('have.text', '© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
    });
});
