import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Payment } from 'src/app/core/model/payment.model';
import { PaymentService } from 'src/app/core/service/payment.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { VendorService } from 'src/app/core/service/vendor.service';
import { Vendor } from 'src/app/core/model/vendor.model';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { Invoice } from 'src/app/core/model/invoice.model';
import { Bill } from 'src/app/core/model/bill.model';

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
	vendors: Vendor[];
	vendor: Vendor;
	bills: Bill[];
	amountBalance: number = 0;
	paymentSystems: string[] = [ 'Cash', 'Credit', 'Cheque', 'Bank Transfer' ];

	isManualPayment: boolean = true;

	paymentInputForm = this.fb.group({
		vendorId: [ '', Validators.required ],
		amountPaid: [ '', Validators.required ],
		amountPending: [ '' ],
		paymentDate: [ '', Validators.required ],
		paymentMethod: [ '', Validators.required ],
		paymentRefNo: [ '', Validators.required ]
	});

	constructor(
		private location: Location,
		private _vendorService: VendorService,
		private _paymentService: PaymentService,
		private fb: FormBuilder
	) {}

	ngOnInit() {
		this.populateVendorDropDown();

		const date = new Date();
		let currentDate = date.toISOString().substring(0, 10);
		console.log(currentDate);
		this.paymentInputForm.patchValue({
			paymentDate: currentDate
		});

		this.tableHeaders = [
			{ field: 'vendorName', header: 'Vendor Name' },
			{ field: 'contactPerson', header: 'Contact Person' },
			{ field: 'phoneNumber', header: 'Phone Number' },
			{ field: 'amountPaid', header: 'Amount Paid' },
			{ field: 'PaymentDate', header: 'Payment Date' },
			{ field: 'PaymentType', header: 'Payment Type' }
		];
	}

	get vendorId() {
		return this.paymentInputForm.get('vendorId').value;
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

	getPaymentObj(): Payment {
		this.payment = new Payment(
			this.paymentInputForm.get('vendorId').value,
			this.paymentInputForm.get('amountPaid').value,
			this.paymentInputForm.get('paymentDate').value,
			!this.isManualPayment,
			this.isManualPayment
		);
		this.payment.paymentMethod = this.paymentInputForm.get('paymentMethod').value;
		this.payment.paymentRefNo = this.paymentInputForm.get('paymentRefNo').value;
		this.payment.manualPaymentType = true;

		for (let vendor of this.vendors) {
			if (this.vendorId == vendor.id) {
				this.payment.vendorName = vendor.name;
				this.payment.vendorContactName = vendor.contactPersonName;
				this.payment.vendorPhoneNumber = vendor.contactPersonPhoneNumber;
				break;
			}
		}
		const payment = Object.assign({}, this.payment);
		return payment;
	}

	populateVendorDropDown() {
		this._vendorService.getVendors().subscribe((response) => {
			this.vendors = response;
		});
	}

	fetchVendor(event: any) {
		let vendorId = event.target.value;
		this.amountBalance = 0;

		for (let vendor of this.vendors) {
			if (vendorId == vendor.id) {
				this.vendor = vendor;
				console.log(vendor);
				this.paymentInputForm.patchValue({
					amountPending: vendor.amountBalance.toFixed(2)
				});
			}
		}

		this._paymentService.getPayments().subscribe((response) => {
			for (let payment of response) {
				if (this.vendor.id == payment.vendorId) {
					this.payments.push(payment);
				}
			}
		});
	}

	savePayment() {
		this._paymentService.setPayment(this.getPaymentObj());
		this.vendor.amountBalance = this.vendor.amountBalance - this.payment.amountPaid;
		this._vendorService.updateVendor(this.vendor);
		this.closeClicked();
	}

	getPaymentType(payment): string {
		if (payment.billPaymentType == true) {
			return 'Bill Payment';
		} else if (payment.manualPaymentType == true) {
			return 'Manual Payment';
		} else {
			return 'Invalid Payment';
		}
	}
}
