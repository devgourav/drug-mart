import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Receipt } from 'src/app/core/model/receipt.model';
import { ReceiptService } from 'src/app/core/service/receipt.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ClientService } from 'src/app/core/service/client.service';
import { Client } from 'src/app/core/model/client.model';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { Invoice } from 'src/app/core/model/invoice.model';

@Component({
	selector: 'app-new-receipt',
	templateUrl: './new-receipt.component.html',
	styleUrls: [ './new-receipt.component.scss' ],
	providers: [ ConfirmationService, MessageService ]
})
export class NewReceiptComponent implements OnInit {
	receiptId: string = '';
	receipts: Receipt[] = [];
	tableHeaders: any[];
	msgs: Message[] = [];
	receipt: Receipt;
	clients: Client[];
	client: Client;
	invoices: Invoice[];
	amountBalance: number = 0;
	receiptSystems: string[] = [ 'Cash', 'Credit', 'Cheque', 'Bank Transfer' ];

	isManualReceipt: boolean = true;

	receiptInputForm = this.fb.group({
		clientId: [ '', Validators.required ],
		amountPaid: [ '', Validators.required ],
		amountPending: [ '' ],
		receiptDate: [ '', Validators.required ],
		receiptMethod: [ '', Validators.required ],
		paymentRefNo: [ '', Validators.required ],
		receiptNote: [ '', Validators.required ],
		paymentMethod: [ '', Validators.required ]
	});

	constructor(
		private location: Location,
		private _clientService: ClientService,
		private _receiptService: ReceiptService,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		this.populateClientDropDown();
		this.generateReceiptRefNumber();

		const date = new Date();
		let currentDate = date.toISOString().substring(0, 10);
		this.receiptInputForm.patchValue({
			receiptDate: currentDate
		});

		this.tableHeaders = [
			{ field: 'clientName', header: 'Client Name' },
			{ field: 'contactPerson', header: 'Contact Person' },
			{ field: 'phoneNumber', header: 'Phone Number' },
			{ field: 'amountPaid', header: 'Amount Paid' },
			{ field: 'receiptDate', header: 'Receipt Date' },
			{ field: 'paymentType', header: 'Payment Type' }
		];
	}

	get clientId() {
		return this.receiptInputForm.get('clientId').value;
	}

	get amountPaid() {
		return this.receiptInputForm.get('amountPaid').value;
	}

	get receiptDate() {
		return this.receiptInputForm.get('receiptDate').value;
	}

	get receiptMethod() {
		return this.receiptInputForm.get('paymentMethod').value;
	}

	get paymentRefNo() {
		return this.receiptInputForm.get('paymentRefNo').value;
	}

	get receiptNote() {
		return this.receiptInputForm.get('receiptNote').value;
	}

	closeClicked() {
		this.location.back();
	}

	getReceiptObj(): Receipt {
		this.receipt = new Receipt(
			this.receiptInputForm.get('clientId').value,
			this.receiptInputForm.get('amountPaid').value,
			this.receiptInputForm.get('receiptDate').value,
			!this.isManualReceipt,
			this.isManualReceipt
		);
		this.receipt.paymentMethod = this.receiptInputForm.get('paymentMethod').value;
		this.receipt.paymentRefNo = this.receiptInputForm.get('paymentRefNo').value;
		this.receipt.manualReceiptType = true;
		this.receipt.receiptNote = this.receiptInputForm.get('receiptNote').value;

		for (let client of this.clients) {
			if (this.clientId == client.id) {
				this.receipt.clientName = client.name;
				this.receipt.clientContactName = client.contactPersonName;
				this.receipt.clientPhoneNumber = client.contactPersonPhoneNumber;
				break;
			}
		}
		const receipt = Object.assign({}, this.receipt);
		return receipt;
	}

	populateClientDropDown() {
		this.clients = [];
		this._clientService.getClients().subscribe((response) => {
			this.clients = response;
		});
	}

	fetchClient(event: any) {
		let clientId = event.target.value;
		this.amountBalance = 0;

		for (let client of this.clients) {
			if (clientId == client.id) {
				this.client = client;
				console.log(client);
				this.receiptInputForm.patchValue({
					amountPending: client.amountBalance.toFixed(2)
				});
			}
		}

		this._receiptService.getReceipts().subscribe((response) => {
			this.receipts = [];
			for (let receipt of response) {
				if (this.client.id == receipt.clientId) {
					this.receipts.push(receipt);
				}
			}
		});
	}

	saveReceipt() {
		this._receiptService.setReceipt(this.getReceiptObj());
		this.client.amountBalance = this.client.amountBalance - this.receipt.amountPaid;
		this._clientService.updateClient(this.client);
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

	generateReceiptRefNumber() {
		this._receiptService.getReceipts().subscribe((response) => {
			let date = new Date();

			let counter = 0;
			let receiptRefNumber =
				date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString() + counter;

			for (let payment of response) {
				if (payment.paymentRefNo == receiptRefNumber) {
					counter++;
					receiptRefNumber =
						date.getFullYear().toString() +
						date.getMonth().toString() +
						date.getDate().toString() +
						date.getHours().toString() +
						counter;
				}
			}
			this.receiptInputForm.patchValue({
				paymentRefNo: receiptRefNumber
			});
		});
	}
}
