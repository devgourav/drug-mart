import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/core/model/invoice.model';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ReceiptService } from 'src/app/core/service/receipt.service';
import { ClientService } from 'src/app/core/service/client.service';
import { Receipt } from 'src/app/core/model/receipt.model';
import { Client } from 'src/app/core/model/client.model';

@Component({
	selector: 'app-invoice-details',
	templateUrl: './invoice-details.component.html',
	styleUrls: [ './invoice-details.component.scss' ],
	providers: [ ConfirmationService, MessageService ]
})
export class InvoiceDetailsComponent implements OnInit {
	invoices: Invoice[] = [];
	tableHeaders: any[];
	msgs: Message[] = [];
	receipt: Receipt;
	client: Client;
	response: any;

	constructor(
		private _invoiceService: InvoiceService,
		private router: Router,
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private _receiptService: ReceiptService,
		private _clientService: ClientService
	) {}

	ngOnInit() {
		this.getInvoices();

		this.tableHeaders = [
			{ field: 'invoiceNumber', header: 'Invoice Id' },
			{ field: 'invoicedDate', header: 'Invoice Date' },
			{ field: 'clientName', header: 'Client' },
			{ field: '', header: 'Sub Amount' },
			// { field: '', header: 'Tax' },
			{ field: 'totalAmount', header: 'Total Amount' },
			{ field: 'amountPaid', header: 'Amount Paid' }
			// { field: '', header: 'Amount Pending' }
		];
	}

	/**
	 * @name getInvoices
	 */
	getInvoices() {
		this._invoiceService.getInvoices().subscribe((response) => {
			this.invoices = response;
		});
	}

	deleteInvoice(invoice: Invoice) {
		this._receiptService.getReceiptById(invoice.receiptId).subscribe((receiptResponse) => {
			this.receipt = receiptResponse;
			this._clientService.getClientById(this.receipt.clientId).subscribe((clientResponse) => {
				clientResponse.amountBalance += this.receipt.amountPaid - invoice.totalAmount;
				this.client = clientResponse;

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
						console.log('this.receipt', this.receipt);
						this._receiptService.deleteReceipt(this.receipt);
						this._clientService.updateClient(this.client);
						this.messageService.add({ severity: 'success', summary: '', detail: 'Invoice Deleted' });
					}
				});
			});
		});
	}

	/**
	 * 
	 * @param invoiceId 
	 */
	editInvoice(invoiceId: string) {
		this.router.navigate([ 'Invoice/New Invoice', invoiceId ]);
	}

	getSubAmount(invoice: Invoice) {
		return (invoice.totalAmount + invoice.totalDiscount - invoice.totalTax).toFixed(2);
	}

	/**
	 * 
	 * @param invoiceId 
	 */
	printInvoice(invoiceId: string) {
		this.router.navigate([ 'Invoice/Print Invoice', invoiceId ]);
	}
}
