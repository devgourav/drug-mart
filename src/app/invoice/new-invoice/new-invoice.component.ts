import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
    }

  	invoiceTableHeaders = ['Item and Description', 'Category', 'Unit', 'Quantity', 'Price', 'Discount', 'Tax', 'Total', 'Actions'];
	invoiceTableColumns = ['itemName', 'invoiceCategory', 'itemUnit', 'itemQuantity', 'itemPrice', 'itemDiscount', 'itemTax', 'itemTotal'];

	invoiceInputForm = this.formBuilder.group({
		invoiceClientName: [''],
		invoiceDate: [''],
		invoiceDueDate: [''],
		invoiceNumber: [''],
		purchaseOrderNo: [''],
		invoiceItemInputForm: this.formBuilder.group({
			invoiceItemName: [''],
			invoiceItemCategory: [''],
			invoiceItemUom: [''],
			invoiceItemQuantity: [''],
			invoicePrice: [''],
			invoiceDiscount: [''],
			invoiceItemTax: ['']
		}),
	});

}
