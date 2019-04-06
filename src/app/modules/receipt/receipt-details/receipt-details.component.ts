import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Receipt } from 'src/app/core/model/receipt.model';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/service/user.service';
import { ClientService } from 'src/app/core/service/client.service';
import { ReceiptService } from 'src/app/core/service/receipt.service';
import { Client } from 'src/app/core/model/client.model';

const confirmMsg = 'Do you want to delete this receipt?';

@Component({
	selector: 'app-receipt-details',
	templateUrl: './receipt-details.component.html',
	styleUrls: [ './receipt-details.component.scss' ],
	providers: [ ConfirmationService, MessageService ]
})
export class ReceiptDetailsComponent implements OnInit {
	receipts: Receipt[] = [];
	tableHeaders: any[];
	msgs: Message[] = [];
	client: Client;

	constructor(
		private _receiptService: ReceiptService,
		private router: Router,
		private _clientService: ClientService,
		private confirmationService: ConfirmationService,
		private messageService: MessageService
	) {}

	// receiptDetailsTableHeaders = [
	// 	'Name',
	// 	'Manufacturer',
	// 	'HSN Code',
	// 	'Pack Type',
	// 	'Purchase Cost',
	// 	'Min. Sale Cost',
	// 	'Quantity',
	// 	'Actions'
	// ];

	ngOnInit() {
		this.getReceipts();

		this.tableHeaders = [
			{ field: 'clientName', header: 'Client Name' },
			{ field: 'contactPerson', header: 'Contact Person' },
			{ field: 'phoneNumber', header: 'Phone Number' },
			{ field: 'amountPaid', header: 'Amount Paid' },
			{ field: 'ReceiptDate', header: 'Receipt Date' },
			{ field: 'ReceiptType', header: 'Payment Type' }
		];
	}

	getReceipts() {
		this._receiptService.getReceipts().subscribe((response) => {
			this.receipts = response;
		});
	}

	deleteReceipt(receipt: Receipt) {
		this._clientService.getClientById(receipt.clientId).subscribe((response) => {
			response.amountBalance = response.amountBalance + +receipt.amountPaid;
			this.client = response;
			console.log('response.amountBalance', response.amountBalance);
		});
		if (receipt.invoiceReceiptType == true) {
			this.messageService.add({ severity: 'info', summary: '', detail: 'Receipt Cannot be Deleted' });
		} else if (receipt.manualReceiptType == true) {
			this.confirmationService.confirm({
				message: 'Do you want to delete this receipt?',
				header: 'Delete Confirmation',
				icon: 'pi pi-info-circle',
				reject: () => {
					this.msgs = [ { severity: 'info', summary: 'Rejected', detail: 'You have rejected' } ];
				},
				accept: () => {
					this.msgs = [ { severity: 'info', summary: 'Confirmed', detail: 'Receipt Deleted' } ];
					this._receiptService.deleteReceipt(receipt);
					this._clientService.updateClient(this.client);
					this.messageService.add({ severity: 'success', summary: '', detail: 'Receipt Deleted' });
				}
			});
		}
	}

	editReceipt(receiptId: string) {
		this.router.navigate([ 'Receipts/New Receipt', receiptId ]);
	}

	getReceiptType(receipt): string {
		if (receipt.invoiceReceiptType == true) {
			return 'Invoice Receipt';
		} else if (receipt.manualReceiptType == true) {
			return 'Manual Receipt';
		} else {
			return 'Invalid Receipt';
		}
	}
}
