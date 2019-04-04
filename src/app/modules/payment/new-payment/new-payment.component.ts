import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Payment } from 'src/app/core/model/payment.model';
import { PaymentService } from 'src/app/core/service/payment.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { ClientService } from 'src/app/core/service/client.service';
import { Client } from 'src/app/core/model/client.model';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { Invoice } from 'src/app/core/model/invoice.model';

const confirmMsg = 'Do you want to delete this payment?';

@Component({
	selector: 'app-new-payment',
	templateUrl: './new-payment.component.html',
	styleUrls: [ './new-payment.component.scss' ],
	providers: [ ConfirmationService, MessageService ]
})
export class NewPaymentComponent implements OnInit {
	paymentId: string = '';
	payments: Payment[] = [];
	tableHeaders: any[];
	msgs: Message[] = [];
	payment: Payment;
	clients: Client[];
	client: Client;
	invoices: Invoice[];
	amountBalance: number = 0;
	paymentSystems: string[] = [ 'Cash', 'Credit', 'Cheque', 'Bank Transfer' ];

	paymentInputForm = this.fb.group({
		clientId: [ '', Validators.required ],
		amountPaid: [ '', Validators.required ],
		amountPending: [ '' ],
		paymentDate: [ '', Validators.required ],
		paymentMethod: [ '', Validators.required ],
		paymentRefNo: [ '', Validators.required ]
	});

	constructor(
		private location: Location,
		private _clientService: ClientService,
		private _paymentService: PaymentService,
		private _invoiceService: InvoiceService,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		this.populateClientDropDown();

		const date = new Date();
		let currentDate = date.toISOString().substring(0, 10);
		console.log(currentDate);
		this.paymentInputForm.patchValue({
			paymentDate: currentDate
		});
	}

	get clientId() {
		return this.paymentInputForm.get('clientId').value;
	}

	get amountPaid() {
		return this.paymentInputForm.get('amountPaid').value;
	}

	get paymentDate() {
		return this.paymentInputForm.get('paymentDate').value;
	}

	get paymentMethod() {
		return this.paymentInputForm.get('paymentMethod').value;
	}

	get paymentRefNo() {
		return this.paymentInputForm.get('paymentRefNo').value;
	}

	closeClicked() {
		this.location.back();
	}

	deletePayment(payment: Payment) {
		if (confirm(confirmMsg)) {
			this._paymentService.deletePayment(payment);
		}
	}

	getPaymentObj(): Payment {
		this.payment = new Payment(
			this.paymentInputForm.get('clientId').value,
			this.paymentInputForm.get('amountPaid').value,
			this.paymentInputForm.get('paymentDate').value
		);
		this.payment.paymentMethod = this.paymentInputForm.get('paymentMethod').value;
		this.payment.paymentRefNo = this.paymentInputForm.get('paymentRefNo').value;
		this.payment.amountPending = this.paymentInputForm.get('amountPending').value - this.payment.amountPaid;

		for (let client of this.clients) {
			if (this.clientId == client.id) {
				this.payment.clientName = client.name;
				this.payment.clientContactName = client.contactPersonName;
				this.payment.clientPhoneNumber = client.contactPersonPhoneNumber;
				break;
			}
		}
		const payment = Object.assign({}, this.payment);
		return payment;
	}

	populateClientDropDown() {
		this._clientService.getClients().subscribe((response) => {
			this.clients = response;
		});
	}

	fetchClientBalance(event: any) {
		let clientId = event.target.value;
		this.amountBalance = 0;

		this._paymentService.getPayments().subscribe((response) => {
			for (let payment of response) {
				if (clientId == payment.clientId) {
					this.paymentInputForm.get('amountPending').setValue(payment.amountPending.toFixed(2));
				}
			}
		});
	}

	savePayment() {
		this._paymentService.setPayment(this.getPaymentObj());
		this.closeClicked();
	}
}
