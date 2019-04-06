import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core/service/payment.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Payment } from 'src/app/core/model/payment.model';
import { CompanyDetailsService } from 'src/app/core/service/company-details.service';
import { CompanyDetails } from 'src/app/core/model/companyDetails.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-payment-print',
	templateUrl: './payment-print.component.html',
	styleUrls: [ './payment-print.component.scss' ]
})
export class PaymentPrintComponent implements OnInit {
	paymentId: string = '';
	payment: Payment;
	companyDetails: CompanyDetails;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private _paymentService: PaymentService,
		private _companyDetailsService: CompanyDetailsService,
		private fb: FormBuilder
	) {}

	companyDetailsForm = this.fb.group({
		name: new FormControl(''),
		phoneNumber: new FormControl(''),
		GSTNumber: new FormControl(''),
		address: new FormControl('')
	});

	paymentDetailsForm = this.fb.group({
		vendorName: new FormControl(''),
		amountPaid: new FormControl(''),
		paymentDate: new FormControl(''),
		paymentMethod: new FormControl(''),
		paymentRefNumber: new FormControl('')
	});

	ngOnInit() {
		this.route.paramMap.subscribe((params) => {
			this.paymentId = params.get('id');
			if (this.paymentId) {
				this.getPayment(params.get('id'));
			}
		});

		this.getCompanyDetails();
	}

	getPayment(paymentId: string) {
		this._paymentService.getPaymentById(paymentId).subscribe((response) => {
			this.payment = response;
			this.populatePaymentDetails();
		});
	}

	getCompanyDetails() {
		this._companyDetailsService.getCompanyDetails().subscribe((response) => {
			this.companyDetails = response[0];
			this.populateCompanyDetails();
		});
	}

	getFullAddress(address) {
		const fullAddress =
			address['streetAddress'] + ' ,' + address['city'] + ' ,' + address['state'] + ' ,' + address['pincode'];

		return fullAddress;
	}

	populateCompanyDetails() {
		this.companyDetailsForm.setValue({
			name: this.companyDetails.name,
			address: this.getFullAddress(this.companyDetails.billingAddress),
			phoneNumber: this.companyDetails.phoneNumber,
			GSTNumber: this.companyDetails.GSTNumber
		});
	}

	populatePaymentDetails() {
		this.paymentDetailsForm.setValue({
			vendorName: this.payment.vendorName,
			amountPaid: this.payment.amountPaid,
			paymentDate: this.payment.paymentDate,
			paymentMethod: this.payment.paymentMethod,
			paymentRefNumber: this.payment.paymentRefNo
		});
	}
}
