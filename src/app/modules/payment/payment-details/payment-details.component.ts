import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/core/model/payment.model';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/service/user.service';
import { ClientService } from 'src/app/core/service/client.service';
import { PaymentService } from 'src/app/core/service/payment.service';

const confirmMsg = 'Do you want to delete this payment?';

@Component({
	selector: 'app-payment-details',
	templateUrl: './payment-details.component.html',
	styleUrls: [ './payment-details.component.scss' ],
	providers: [ ConfirmationService, MessageService ]
})
export class PaymentDetailsComponent implements OnInit {
	payments: Payment[] = [];
	tableHeaders: any[];
	msgs: Message[] = [];

	constructor(
		private _paymentService: PaymentService,
		private router: Router,
		private confirmationService: ConfirmationService,
		private messageService: MessageService
	) {}

	// paymentDetailsTableHeaders = [
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
		this.getPayments();

		this.tableHeaders = [
			{ field: 'clientName', header: 'Client Name' },
			{ field: 'contactPerson', header: 'Contact Person' },
			{ field: 'phoneNumber', header: 'Phone Number' },
			{ field: 'amountPaid', header: 'Amount Paid' },
			{ field: 'PaymentDate', header: 'Payment Date' }
		];
	}

	getPayments() {
		this._paymentService.getPayments().subscribe((response) => {
			this.payments = response;
		});
	}

	deletePayment(payment: Payment) {
		this.confirmationService.confirm({
			message: 'Do you want to delete this payment?',
			header: 'Delete Confirmation',
			icon: 'pi pi-info-circle',
			reject: () => {
				this.msgs = [ { severity: 'info', summary: 'Rejected', detail: 'You have rejected' } ];
			},
			accept: () => {
				this.msgs = [ { severity: 'info', summary: 'Confirmed', detail: 'Payment Deleted' } ];
				this._paymentService.deletePayment(payment);
				this.messageService.add({ severity: 'success', summary: '', detail: 'Payment Deleted' });
			}
		});
	}

	editPayment(paymentId: string) {
		this.router.navigate([ 'Payments/New Payment', paymentId ]);
	}
}
