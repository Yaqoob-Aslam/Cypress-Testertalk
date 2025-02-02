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
       
        //loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });
});