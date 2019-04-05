/// <reference types="Cypress" />



describe('DrugMart', () => {
  const email = "rishav0019@gmail.com"
  const password = "rishav@123";
  beforeEach(() => {
      cy.visit('/')
      cy.get('input[name=emailID').type(email)
      cy.get('input[name=password').type(password)

      cy.get('button[type=button').click()
      cy.contains('Clients').click()  

      
    })

  it('Verify Client Details Table visible', ()=>{
      cy.contains('Client Details')
      cy.wait(2000)
      cy.contains('Logout').click()
    
  })
  it(' Validate View/Edit Button visible', ()=>{
    cy.get('.button-primary').eq(1).click()
    cy.wait(2000)
    cy.contains('Logout').click()
})
it('Validate Delete Button visible', ()=>{
  cy.get('.button-cancel').eq(10).click()//delete button
  cy.get('.ui-clickable').eq(2).click()//yes or no
  
//  cy.wait(5000)
  cy.contains('Logout').click()
})
it('New Client button should be visible', ()=>{
  cy.contains('New Client')
 // cy.wait(2000)
  cy.contains('Logout').click()
})

it('Export should be visible', ()=>{
  cy.contains('Export')
  cy.wait(2000)
  cy.contains('Logout').click()
})

it('New Client Button should work ', ()=>{
  cy.contains('New Client').click()
  cy.contains('Add New Client')
  cy.wait(2000)
  cy.contains('Logout').click()
})
it(' Validate edit button', ()=>{
  cy.get('.button-primary').eq(10).click()
  cy.contains('Add New Client')
  cy.wait(2000)
  cy.contains('Logout').click()
  
})
//Cancel  button on Edit page 
it(' Validate edit button', ()=>{
  cy.get('.button-primary').eq(10).click()
  cy.contains('Add New Client')

  cy.get('.button-cancel').click()
  cy.wait(2000)
  cy.contains('Logout').click()
  
})
//Validate Client Name should be required.
// it(' Validate Client Name should be required', ()=>{
 
//   cy.contains('New Client').click()
//   cy.contains('Add New Client')
//   cy.get('#clientName').type('Amita')
  
//   cy.contains('Logout').click()
  
// })
it(' Validate Client Name should be only alphabet', ()=>{
 
  cy.contains('New Client').click()
  cy.contains('Add New Client')
  cy.get('#clientName').type('1212').should('be.empty','1212');
  
  cy.contains('Logout').click()
  
})
it('Validate in Phone Number Field we only enter numeric number', ()=>{
 
  cy.contains('New Client').click()
  cy.contains('Add New Client')
  cy.get('#clientPhoneNumber').type('abc').should('be.empty');
  
  cy.contains('Logout').click()
  
})
it('Validate Phone Number Field, can enter only first 10  digit', ()=>{
 
  cy.contains('New Client').click()
  cy.contains('Add New Client')
  cy.get('#clientPhoneNumber').type('253547425811134234234').should('have.value','2535474258');
  cy.contains('Logout').click()
})  
it('Delete Button Shows a popup ', ()=>{
      
  cy.wait(2000)
  cy.get('.button-cancel').eq(1).click()//delete button
  cy.get('.ui-clickable').eq(2).click()//yes or no
  cy.contains('Logout').click() 
})
it('Pop-up confirmation Cancel Button is working ', ()=>{
      
  cy.wait(2000)
  cy.get('.button-cancel').eq(1).click()//delete button
  cy.get('.ui-clickable').eq(2).click()//yes or no
  cy.contains('Logout').click() 
})  
it('Pop-up confirmation Cancel Button is working ', ()=>{
      
  cy.wait(2000)
  cy.get('.button-cancel').eq(1).click()//delete button
  cy.contains('Do you want to delete this record?')
  cy.get('.ui-clickable').eq(2).click()//yes or no
  cy.contains('Logout').click() 
})
it('Delete Button  work properly', ()=>{
      
  cy.wait(2000)
  cy.get('.button-cancel').eq(1).click()//delete button
  cy.contains('Do you want to delete this record?')
  cy.get('.ui-clickable').eq(1).click()//yes or no
  cy.contains('Logout').click() 
})
})