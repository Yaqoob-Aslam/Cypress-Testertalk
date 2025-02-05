class SortPage {
    sortBy(option) {
        cy.get('.product_sort_container').select(option);
    }

    verifySortedProducts(expectedProducts) {
        cy.get('.inventory_item_name').each(($el, index) => {
            cy.wrap($el).should('have.text', expectedProducts[index]);
        });
    }

    verifySortedPrices(order) {
        const prices = [];
        cy.get('.inventory_item_price').each(($el) => {
            const price = parseFloat($el.text().replace('$', ''));
            prices.push(price);
        }).then(() => {
            for (let i = 0; i < prices.length - 1; i++) {
                if (order === 'asc') {
                    expect(prices[i]).to.be.at.most(prices[i + 1]);
                } else if (order === 'desc') {
                    expect(prices[i]).to.be.at.least(prices[i + 1]);
                }
            }
        });
    }
}

export default new SortPage();