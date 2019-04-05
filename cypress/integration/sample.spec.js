/// <reference types="Cypress" />



context('DrugMart', () => {
  const email = "rishav0019@gmail.com"
  const password = "rishav@123";
  beforeEach(() => {
      cy.visit('http://localhost:4200')
    })

  it('logins new user', ()=>{
      cy.get('input[name=emailID').type(email)
      cy.get('input[name=password').type(password)

      cy.get('button[type=button').click()
      cy.contains('Clients').click()     
      cy.contains('New Client').click()
      cy.get('#clientName').type(userID_Alpha1())
      function userID_Alpha1() {
      var text = "";
      var possible = "ABCDEFG HIJKLM NOPQRSTU VWXYZ"

      for (var i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text
}
   cy.wait(1000)
   cy.get('#clientPhoneNumber').type('5858258741')

   cy.wait(1000)
       cy.get('#clientEmailId').type('VisvasKumar@gmail.com')
       cy.get('#clientWebsite').type('VisvasKumar.com')
       cy.wait(1000)
       cy.get('#clientGstin').type(userID_Alpha())
       function userID_Alpha() {
       var text = "";
       var possible = "GETIN2535653524"
       for (var i = 0; i < 15; i++)
       text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text
     }
       cy.wait(1000)
       cy.get('#clientContactPerson').type('Visvas Kumar')
       cy.wait(1000)
       cy.get('#clientContactPhone').type(Math.floor(Math.random() * 90000000000) + 10000000000)
       cy.get('#clientContactEmail').type('VisvasKumar123@gmail.com')
       cy.wait(1000)
       cy.get('#clientAddress').type(userID_Alpha())
       function userID_Alpha() {
       var text = "";
       var possible = "Gytrinagar Raipur Sankar nagar"
       for (var i = 0; i < 10; i++)
       text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text
     }
       cy.get('#clientAddressPinCode').type('492001')
       cy.contains('Save').click()
       cy.wait(3000)
       cy.contains('Logout').click()
  
  })
})