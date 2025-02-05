import LoginPage from './loginPage';
import InventoryPage from './inventoryPage';
import ProductDetailsPage from './productDetailsPage';
import CartPage from './cartPage';
import CheckoutPage from './checkoutPage';
import MenuPage from './menuPage';
import SortPage from './sortPage';
import FooterPage from './footerPage';

describe('Complete Sauce Demo Website Automation', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.fillUsername('standard_user');
        LoginPage.fillPassword('secret_sauce');
        LoginPage.submit();
        LoginPage.verifyLoginSuccess();
    });

    it('Verify all product with details and perform checkout', () => {
        InventoryPage.getProductCount().then(($products) => {
            const productCount = $products.length;
            for (let i = 0; i < productCount; i++) {
                InventoryPage.getProductName(i).then(($productName) => {
                    const productName = $productName.text();
    
                    // Add product to cart
                    InventoryPage.addToCart(i);
                    InventoryPage.verifyCartBadge('1');
    
                    // Navigate to cart
                    InventoryPage.goToCart();
    
                    // Verify product in cart
                    CartPage.verifyProductInCart(productName);
                    CartPage.verifyCartQuantity();
                    CartPage.verifyProductPrice();
    
                    // Proceed to checkout
                    CartPage.proceedToCheckout();
    
                    // Fill out checkout information
                    CheckoutPage.fillFirstName('John');
                    CheckoutPage.fillLastName('Doe');
                    CheckoutPage.fillPostalCode('12345');
                    CheckoutPage.continue();
    
                    // Verify checkout overview
                    CheckoutPage.verifyCheckoutOverview(productName);
    
                    // Complete checkout
                    CheckoutPage.completeCheckout();
                    CheckoutPage.verifyCheckoutComplete();
                    CheckoutPage.goBackToInventory();
                });
            }
        });
    });

    it('Verify empty cart', () => {
        InventoryPage.goToCart();
        CartPage.verifyEmptyCart();
    });

    it('Verify menu links', () => {
        MenuPage.openMenu();
        MenuPage.verifyMenuLinks();
        MenuPage.closeMenu();
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
        SortPage.sortBy('az');
        SortPage.verifySortedProducts(expectedProducts);
    });

    it('Verify sort functionality (Z to A)', () => {
        const expectedProducts = [
            'Test.allTheThings() T-Shirt (Red)',
            'Sauce Labs Onesie',
            'Sauce Labs Fleece Jacket',
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Bike Light',
            'Sauce Labs Backpack'
        ];
        SortPage.sortBy('za');
        SortPage.verifySortedProducts(expectedProducts);
    });

    it('Verify sort functionality (Low to High)', () => {
        SortPage.sortBy('lohi');
        SortPage.verifySortedPrices('asc');
    });

    it('Verify sort functionality (High to Low)', () => {
        SortPage.sortBy('hilo');
        SortPage.verifySortedPrices('desc');
    });

    it('Verify footer links', () => {
        FooterPage.verifyFooter();
    });
});