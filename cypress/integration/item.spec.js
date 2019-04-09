/// <reference types="Cypress" />



   describe('DrugMart', () => {
        const email = "rishav0019@gmail.com"
        const password = "rishav@123";
        beforeEach(() => {
          cy.visit('/')
          cy.get('input[name=emailID').type('rishav0019@gmail.com')
          cy.get('input[name=password').type('rishav@123')
          cy.get('button[type=button').click()
          cy.contains('Items').click()
      
            
          })
  
          it('Verify Items Details Table visible', ()=>{
            cy.contains('Name')
            cy.contains('Manufacturer')
            cy.contains(' Purchase Cost ')
            
             cy.contains('Logout').click()
          
        })
        it(' Validate View/Edit Button visible in items table', ()=>{
            cy.get('.button-primary').contains('View/Edit')
            cy.get('.button-primary').eq(1).click()
            cy.get('.button-cancel').click()
            cy.wait(5000)
           cy.contains('Logout').click() // btn button-cancel
        })
        it('Validate Delete Button visible in items table', ()=>{
            cy.get('.button-cancel').contains('Delete')
            cy.get('.button-cancel').eq(1).click()//delete button
            cy.get('.ui-clickable').eq(2).click()//yes or no
            cy.contains('Logout').click()
          })
          it(' Validate delete button', ()=>{
            cy.get('.button-cancel').eq(1).click()//delete button
            cy.get('.ui-clickable').eq(2).click()//yes or no
            cy.contains('Item Details')
            cy.contains('Logout').click()
            
          })
          it('New Items button should be visible', ()=>{
            cy.contains('New Item')
            cy.contains('Logout').click()
          })
          it('Export should be visible on items details page', ()=>{
            cy.contains('Export')
            cy.contains('Logout').click()
          })
          it('New Items Button should work ', ()=>{
            cy.contains('New Item').click()
            cy.contains('Item Details')
            cy.contains('Logout').click()
          })
          it(' Validate edit button', ()=>{
            cy.get('.button-primary').eq(1).click()
            cy.contains('Item Details')
            cy.get('.button-cancel').click()
            cy.contains('Logout').click()
          })
          it('Validate Item Name should be required', ()=>{
            
            cy.contains('New Item').click()
            cy.contains('Item Details')
            cy.get('#itemName').click()
            cy.get('#itemDescription').click()
            cy.contains('Item name Should not be empty')
            cy.contains('Logout').click()
           })
           it('Validate Item Manufacturer should be required', ()=>{
            
            cy.contains('New Item').click()
            cy.contains('Item Details')
            cy.get('#itemMfg').click()
            cy.get('#itemUnit').click()
            cy.contains('Manufacturer name Should not be empty')
            cy.contains('Logout').click()
           })
           //Quantity
           it('Validate Quantity should be required', ()=>{
            
            cy.contains('New Item').click()
            cy.contains('Quantity')
            cy.get('#itemQuantity').click()
            cy.get('#itemHSNCode').click()
            cy.contains('Quantity should not be empty')
            cy.contains('Logout').click()
           })
           it('Validate HSN Code should be required', ()=>{
            
            cy.contains('New Item').click()
            cy.contains('Quantity')
            cy.get('#itemQuantity').click()
            cy.get('#itemHSNCode').click()
            cy.contains('Quantity should not be empty')
            cy.contains('Logout').click()
           })
           it('Validate Batch Number should be required', ()=>{
            cy.contains('New Item').click()
            cy.contains('Batch Number')
            cy.get('#batchNumber').click()
            cy.get('#itemHSNCode').click()
            cy.contains('BatchNumber should not be empty')
            cy.contains('Logout').click()
           })
           //Sale Info
           it('Validate Sale Info section should be visible ', ()=>{
            cy.contains('New Item').click()
            cy.contains('Sale Info')
            cy.contains('Logout').click()
           })
           it('Validate Min. Unit Price should be required', ()=>{
            cy.contains('New Item').click()
            cy.contains('Sale Info')
            cy.contains('Min. Unit Price')
            cy.get('#itemSalePrice').click()
            cy.get('#itemMRP').click()
            cy.contains('Sale Cost should not be empty')
            cy.contains('Logout').click()
           })
           it('Validate Min. Unit Price should be required', ()=>{
            cy.contains('New Item').click()
            cy.contains('Sale Info')
            cy.contains('MRP')
            cy.get('#itemMRP').click()
            cy.get('#saleDiscount').click()
            cy.contains('Item MRP should not be empty')
            cy.contains('Logout').click()
           })
           //Offers


  })