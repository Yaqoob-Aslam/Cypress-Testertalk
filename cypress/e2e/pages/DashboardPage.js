class DashboardPage{
    elements = {
        title: () => cy.get('.title'),
        menuButton: ()=> cy.get('#react-burger-menu-btn'),
        logoutButton: ()=> cy.get('#logout_sidebar_link'),
    }
    verifyTitle(){
        this.elements.title().should('have.text', 'Products');
    }
    clickMenuButton(){
        this.elements.menuButton().click();
    }
    clickLogout(){
        this.elements.logoutButton().click();
    }

}

export default DashboardPage;