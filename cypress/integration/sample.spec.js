/// <reference types="Cypress" />



context('DrugMart', () => {
    const email = "rishav0019@gmail.com";
    const password = "rishav@123";
    beforeEach(() => {
        cy.visit('http://localhost:4200')
      })

    it('logins new user', ()=>{
       // cy.contains('Sign In').click()

        cy.get('input[name=emailID').type(email)
        cy.get('input[name=password').type(password)
        cy.wait(2000)
        cy.get('button[type=button').click()

        
        cy.wait(3000)
        cy.contains('Clients').click()
       // cy.wait(3000)
        //cy.get('button[type=New Client').click()
        cy.wait(3000)
        cy.contains('New Client').click()
        cy.wait(3000)
        cy.contains('Logout').click()
    })

})