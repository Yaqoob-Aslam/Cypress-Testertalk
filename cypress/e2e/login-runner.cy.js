import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

describe('Login Tests on Sauce Demo', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();

    beforeEach(() => {
        loginPage.visit();
    });

    it('should login with valid credentials', () => {
        loginPage.typeUsername('standard_user');
        loginPage.typePassword('secret_sauce');
        loginPage.clickLoginButton();

        dashboardPage.verifyTitle();
        dashboardPage.clickMenuButton();
        dashboardPage.clickLogout();
    });
});

describe('Data-Driven Login Tests on Sauce Demo', () => {
    const loginPage = new LoginPage();
    const dashboardPage = new DashboardPage();
    const testData = require('../fixtures/testData.json'); // Load test data

    beforeEach(() => {
        loginPage.visit(); // Visit the login page before each test
    });

    testData.forEach(data => {
        it(`should handle login for user "${data.username}" with password "${data.password}"`, () => {
            // Perform login
            loginPage.typeUsername(data.username);
            loginPage.typePassword(data.password);
            loginPage.clickLoginButton();

            // Verify the expected result
            if (data.valid) {
                // If login is successful, verify the dashboard page
                dashboardPage.verifyTitle();
                dashboardPage.clickMenuButton();
                dashboardPage.clickLogout();
            } else {
                // If login fails, verify the error message
                loginPage.verifyErrorMessage(data.errorMessage);
            }
        });
    });
});
