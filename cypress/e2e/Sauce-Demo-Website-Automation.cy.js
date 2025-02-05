/// <reference types="cypress" />

describe('Complete Sauce Demo Website Automation', () => {
    beforeEach(() => {
        // Visit the Sauce Demo website and log in
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('have.text', 'Products');
    });

    it('Verify all product with details and perform checkout', () => {
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

    it('Verify sort functionality (A to Z)', () => {
        const expectedProducts = [
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Onesie',
            'Test.allTheThings() T-Shirt (Red)'
        ];
    
        // Sort products by A to Z
        cy.get('.product_sort_container').select('az');
    
        // Verify sorted product names
        cy.get('.inventory_item_name').each(($el, index) => {
            cy.log($el);

            cy.wrap($el).should('have.text', expectedProducts[index]);
        });
    });
    
    it('Verify sort functionality (Z to A)', () => {
        const expectedProducts =[
            'Test.allTheThings() T-Shirt (Red)',
            'Sauce Labs Onesie',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Bike Light',
            'Sauce Labs Backpack',
        ];

        // Sort products by Z to A
        cy.get('.product_sort_container').select('za');


        // Verify sorted product names});
        cy.get('.inventory_item_name').each(($el, index) =>{
            cy.wrap($el).should('have.text', expectedProducts[index]);
        })
    });

    it('Verify sort functionality (Low to High)', () => {
        // Sort products by Low to High
        cy.get('.product_sort_container').select('lohi');
    
        // Collect all prices into an array
        const prices = [];
        cy.get('.inventory_item_price').each(($el) => {
            const price = parseFloat($el.text().replace('$', ''));
            prices.push(price);
        }).then(() => {
            // Verify that prices are sorted in ascending order
            for (let i = 0; i < prices.length - 1; i++) {
                expect(prices[i]).to.be.at.most(prices[i + 1]);
            }
        });
    });

    it('Verify sort functionality (High to Low)', () => {
        
         // Sort products by Hight to Low
         cy.get('.product_sort_container').select('hilo');

            // Collect all prices into an array
            const prices = [];
            cy.get('.inventory_item_price').each(($el)=>{
                const price = parseFloat($el.text().replace('$', ''));
                prices.push(price);
            }).then(()=>{
                // Verify that prices are sorted in descending order
                for(let i =0; i< prices.length -1; i++){
                    expect(prices[i]).to.be.at.least(prices[i+1])
                }
            })
        })
   

    it('Verify footer links', () => {
        cy.get('.footer').should('be.visible');
        cy.get('.social li').should('have.length', 3);

        cy.get('.social_twitter a').should('have.attr', 'href', 'https://twitter.com/saucelabs');
        cy.get('.social_facebook a').should('have.attr', 'href', 'https://www.facebook.com/saucelabs');
        cy.get('.social_linkedin a').should('have.attr', 'href', 'https://www.linkedin.com/company/sauce-labs/');
        cy.get('.footer_copy').should('have.text', '© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
    });
 
});