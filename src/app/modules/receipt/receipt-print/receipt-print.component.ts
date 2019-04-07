import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CompanyDetailsService } from 'src/app/core/service/company-details.service';
import { CompanyDetails } from 'src/app/core/model/companyDetails.model';
import { FormControl, FormBuilder } from '@angular/forms';
import { Receipt } from 'src/app/core/model/receipt.model';
import { ReceiptService } from 'src/app/core/service/receipt.service';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
	selector: 'app-receipt-print',
	templateUrl: './receipt-print.component.html',
	styleUrls: [ './receipt-print.component.scss' ]
})
export class ReceiptPrintComponent implements OnInit {
	receiptId: string = '';
	receipt: Receipt;
	companyDetails: CompanyDetails;

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private _receiptService: ReceiptService,
		private _companyDetailsService: CompanyDetailsService,
		private fb: FormBuilder
	) {}

	companyDetailsForm = this.fb.group({
		name: new FormControl(''),
		phoneNumber: new FormControl(''),
		GSTNumber: new FormControl(''),
		address: new FormControl('')
	});

	receiptDetailsForm = this.fb.group({
		clientName: new FormControl(''),
		amountPaid: new FormControl(''),
		receiptDate: new FormControl(''),
		paymentMethod: new FormControl(''),
		paymentRefNumber: new FormControl('')
	});

	ngOnInit() {
		this.route.paramMap.subscribe((params) => {
			this.receiptId = params.get('id');
			if (this.receiptId) {
				this.getReceipt(params.get('id'));
			}
		});

		this.getCompanyDetails();
	}

	getReceipt(paymentId: string) {
		this._receiptService.getReceiptById(paymentId).subscribe((response) => {
			this.receipt = response;
			if (this.receipt.paymentRefNo == '' || this.receipt.paymentRefNo == null) {
				this.receipt.paymentRefNo = 'null';
			}
			this.populateReceiptDetails();
		});
	}

	getCompanyDetails() {
		this._companyDetailsService.getCompanyDetails().subscribe((response) => {
			this.companyDetails = response[0];
			this.populateCompanyDetails();
		});
	}

	getFullAddress(address) {
		const fullAddress = address['streetAddress'] + '-' + address['pincode'];

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

	populateReceiptDetails() {
		this.receiptDetailsForm.setValue({
			paymentRefNumber: this.receipt.paymentRefNo,
			clientName: this.receipt.clientName,
			amountPaid: this.receipt.amountPaid,
			receiptDate: this.receipt.receiptDate,
			paymentMethod: this.receipt.paymentMethod
		});
	}

	closeClicked() {
		this.location.back();
	}

	@ViewChild('screen') screen: ElementRef;
	printPayment() {
		let pdf = new jsPDF('portrait', 'mm', 'a5');
		pdf.setProperties({
			title: 'Pdf Export',
			author: 'Kanchan Medico',
			keywords: 'generated,drug-mart,kanchan,receipt',
			creator: 'Drug Mart'
		});

		html2canvas(this.screen.nativeElement).then((canvas) => {
			var imgData = canvas.toDataURL('image/png');
			var imgWidth = 148;
			var imgHeight = canvas.height * imgWidth / canvas.width;

			pdf.addImage({
				imageData: imgData,
				x: 0,
				y: 0,
				w: imgWidth,
				h: imgHeight
			});
			let pdfName = 'receipt' + this.receipt.receiptDate + '.pdf';
			pdf.save(pdfName);
		});
	}
}
