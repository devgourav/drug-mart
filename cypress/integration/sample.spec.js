/// <reference types="Cypress" />



context('DrugMart', () => {
  
  beforeEach(() => {
      cy.visit('https://drugmart-firestore.firebaseapp.com/')
       
    })

  it('logins new user', ()=>{
    cy.get('input[name=emailID').type('rishav0019@gmail.com')
    cy.get('input[name=password').type('rishav@123')

    cy.get('button[type=button').click()
      cy.contains('Clients').click()     
      cy.contains('New Client').click()
      cy.get('#clientName').type('Binod Kumar' )
     
   
      cy.get('#phoneNumber').type('8564795214')

       //cy.wait
       cy.get('#clientEmailId').type('binod15@gmail.com')
       cy.get('#clientWebsite').type('goom.com')
       //cy.wait
       cy.get('#clientGstin').type('GSTIN4254521')
     
       //cy.wait
       cy.get('#clientContactPerson').type('Arnindo')
       //cy.wait
       cy.get('#clientContactPhone').type(Math.floor(Math.random() * 90000000000) + 10000000000)
       cy.get('#clientContactEmail').type('arbindkumar@gmail.com')
       //cy.wait
       cy.get('#clientAddress').type('Mowa Raipur')
      
       cy.get('#clientAddressPinCode').type('495231')
       cy.contains('Save').click()
       cy.wait(3000)
       cy.contains('Logout').click()
      
  })
})