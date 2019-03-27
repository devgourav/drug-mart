import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/core/model/invoice.model';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { Amount } from 'src/app/core/model/amount.model';
import { InvoiceItem } from 'src/app/core/model/invoiceItem.model';
import { BillItem } from 'src/app/core/model/billItem.model';
import { Subscription } from 'rxjs';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

const confirmMsg = 'Do you want to delete this Invoice?';

@Component({
	selector: 'app-invoice-details',
	templateUrl: './invoice-details.component.html',
	styleUrls: [ './invoice-details.component.scss' ],
	providers: [ ConfirmationService, MessageService ]
})
export class InvoiceDetailsComponent implements OnInit {
	invoices: Invoice[] = [];
	private subscriptions: Array<Subscription> = [];
	tableHeaders: any[];
	msgs: Message[] = [];

	taxRate: number;
	discountRate: number;
	invoiceAmount: Amount;
	response: any;
	anyAmount: number = 0;
	totalAmount: number = 0;

	constructor(
		private _invoiceService: InvoiceService,
		private router: Router,
		private confirmationService: ConfirmationService,
		private messageService: MessageService
	) {
		this.invoiceAmount = new Amount();
	}

	// invoiceDetailsTableHeaders = [
	// 	'InvoiceDate',
	// 	'Vendor',
	// 	'Sub Amount',
	// 	'Tax',
	// 	'Discount',
	// 	'Total Amount',
	// 	'Order Notes',
	// 	'Amount Pending',
	// 	'Actions'
	// ];

	ngOnInit() {
		this.getInvoices();

		this.tableHeaders = [
			{ field: 'invoicedDate', header: 'InvoiceDate' },
			{ field: 'clientName', header: 'Client' },
			{ field: '', header: 'Sub Amount' },
			{ field: '', header: 'Tax' },
			{ field: '', header: 'Discount' },
			{ field: '', header: 'Total Amount' },
			{ field: 'orderNote', header: 'Order Notes' },
			{ field: '', header: 'Amount Pending' }
		];
	}

	getInvoices() {
		this._invoiceService.getInvoices().subscribe((response) => {
			this.invoices = response;
		});
	}

	deleteInvoice(invoice: Invoice) {
		this.confirmationService.confirm({
			message: 'Do you want to delete this item?',
			header: 'Delete Confirmation',
			icon: 'pi pi-info-circle',
			reject: () => {
				this.msgs = [ { severity: 'info', summary: 'Rejected', detail: 'You have rejected' } ];
			},
			accept: () => {
				this.msgs = [ { severity: 'info', summary: 'Confirmed', detail: 'Invoice Deleted' } ];
				this._invoiceService.deleteInvoice(invoice);
				this.messageService.add({ severity: 'success', summary: 'Invoice Deleted', detail: 'Invoice Deleted' });
			}
		});
	}

	editInvoice(invoiceId: string) {
		this.router.navigate([ 'Invoice/New Invoice', invoiceId ]);
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

	getTotalAmount(id: string): string {
		this.totalAmount = 0;
		for (let invoice of this.invoices) {
			if (id == invoice.id) {
				this.totalAmount += invoice.totalAmount;
			}
		}

		return this.totalAmount.toFixed(2).toString();
	}

	getPendingAmount(amountPaid: number): string {
		return (this.totalAmount - amountPaid).toFixed(2);
	}
}
