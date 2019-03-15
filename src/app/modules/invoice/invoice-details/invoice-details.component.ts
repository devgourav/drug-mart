import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/core/model/invoice.model';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { Amount } from 'src/app/core/model/amount.model';
import { InvoiceItem } from 'src/app/core/model/invoiceItem.model';
import { BillItem } from 'src/app/core/model/billItem.model';

const confirmMsg = 'Do you want to delete this Invoice?';

@Component({
	selector: 'app-invoice-details',
	templateUrl: './invoice-details.component.html',
	styleUrls: [ './invoice-details.component.scss' ]
})
export class InvoiceDetailsComponent implements OnInit {
	invoices: Invoice[] = [];

	taxRate: number;
	discountRate: number;
	invoiceAmount: Amount;
	response: any;
	anyAmount: number = 0;
	totalAmount: number = 0;

	constructor(private _invoiceService: InvoiceService, private router: Router) {
		this.invoiceAmount = new Amount();
	}

	invoiceDetailsTableHeaders = [
		'InvoiceDate',
		'Vendor',
		'Sub Amount',
		'Tax',
		'Discount',
		'Total Amount',
		'Order Notes',
		'Amount Pending',
		'Actions'
	];

	ngOnInit() {
		this.getInvoices();
	}

	getInvoices() {
		this._invoiceService.getInvoices().subscribe((response) => {
			this.invoices = response;
		});
	}

	deleteInvoice(invoice: Invoice) {
		if (confirm(confirmMsg)) {
			this._invoiceService.deleteInvoice(invoice);
		}
	}

	editInvoice(invoiceId: string) {
		this.router.navigate([ 'Invoices/New Invoice', invoiceId ]);
	}

	getSubAmount(invoiceItems: BillItem[]): string {
		this.anyAmount = 0;
		for (let invoiceItem of invoiceItems) {
			this.anyAmount += invoiceItem.rate * invoiceItem.quantity;
		}
		this.invoiceAmount.subAmount = this.anyAmount.toFixed(2);
		return this.invoiceAmount.subAmount;
	}

	getTaxAmount(invoiceItems: BillItem[]): string {
		this.anyAmount = 0;
		for (let invoiceItem of invoiceItems) {
			this.anyAmount +=
				(invoiceItem.tax['stateTax'] + invoiceItem.tax['countryTax']) *
				0.01 *
				invoiceItem.rate *
				invoiceItem.quantity;
		}
		this.invoiceAmount.taxAmount = this.anyAmount.toFixed(2);
		return this.invoiceAmount.taxAmount;
	}

	getDiscountAmount(invoiceItems: BillItem[]): string {
		this.anyAmount = 0;
		for (let invoiceItem of invoiceItems) {
			this.anyAmount +=
				(invoiceItem.discount + invoiceItem.offer) * 0.01 * invoiceItem.rate * invoiceItem.quantity;
		}
		this.invoiceAmount.discountAmount = this.anyAmount.toFixed(2);
		return this.invoiceAmount.discountAmount;
	}

	getTotalAmount(invoiceItems: BillItem[]): string {
		this.totalAmount = 0;
		this.totalAmount =
			+this.getSubAmount(invoiceItems) + +this.getTaxAmount(invoiceItems) - +this.getDiscountAmount(invoiceItems);
		return this.totalAmount.toFixed(2);
	}

	getPendingAmount(amountPaid: number): string {
		return (this.totalAmount - amountPaid).toFixed(2);
	}
}
