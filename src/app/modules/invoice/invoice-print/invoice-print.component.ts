import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormBuilder } from '@angular/forms';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { CompanyDetailsService } from 'src/app/core/service/company-details.service';
import { Invoice } from 'src/app/core/model/invoice.model';
import { CompanyDetails } from 'src/app/core/model/companyDetails.model';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
	selector: 'app-invoice-print',
	templateUrl: './invoice-print.component.html',
	styleUrls: [ './invoice-print.component.scss' ]
})
export class InvoicePrintComponent implements OnInit {
	invoiceId: string = '';
	invoice: Invoice;
	companyDetails: CompanyDetails;

	tableHeaders: any[];

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private _invoiceService: InvoiceService,
		private _companyDetailsService: CompanyDetailsService,
		private fb: FormBuilder
	) {}

	companyDetailsForm = this.fb.group({
		name: new FormControl(''),
		phoneNumber: new FormControl(''),
		GSTNumber: new FormControl(''),
		address: new FormControl('')
	});

	invoiceDetailsForm = this.fb.group({
		invoiceNumber: new FormControl(''),
		invoicedDate: new FormControl('')
	});

	afterTableDetailsForm = this.fb.group({
		subAmount: new FormControl(''),
		taxAmount: new FormControl(''),
		discountAmount: new FormControl(''),
		totalAmount: new FormControl(''),
		amountPaid: new FormControl(''),
		orderNote: new FormControl('')
	});

	ngOnInit() {
		this.route.paramMap.subscribe((params) => {
			this.invoiceId = params.get('id');
			if (this.invoiceId) {
				this.getInvoice(params.get('id'));
			}
		});

		this.getCompanyDetails();

		this.tableHeaders = [
			{ field: '', header: 'Particular' },
			{ field: '', header: 'Manufacturer' },
			{ field: '', header: 'Quantity' },
			{ field: '', header: 'Rate' },
			{ field: '', header: 'Amount' },
			{ field: '', header: 'Discount' },
			{ field: '', header: 'Tax' },
			{ field: '', header: 'Total' },
			{ field: '', header: 'Offers' },
			{ field: '', header: 'M.R.P' }
		];
	}

	getCompanyDetails() {
		this._companyDetailsService.getCompanyDetails().subscribe((response) => {
			this.companyDetails = response[0];
			this.populateCompanyDetails();
		});
	}

	getInvoice(invoiceId: string) {
		this._invoiceService.getInvoiceById(invoiceId).subscribe((response) => {
			this.invoice = response;
			this.populateInvoiceDetails();
			this.populateAfterTableDetails();
		});
	}

	populateCompanyDetails() {
		this.companyDetailsForm.setValue({
			name: this.companyDetails.name,
			address: this.getFullAddress(this.companyDetails.billingAddress),
			phoneNumber: this.companyDetails.phoneNumber,
			GSTNumber: this.companyDetails.GSTNumber
		});
	}

	populateInvoiceDetails() {
		this.invoiceDetailsForm.setValue({
			invoiceNumber: this.invoice.invoiceNumber,
			invoicedDate: this.invoice.invoicedDate
		});
	}

	populateAfterTableDetails() {
		this.afterTableDetailsForm.setValue({
			subAmount: this.invoice.totalAmount,
			taxAmount: this.invoice.totalTax,
			discountAmount: this.invoice.totalDiscount,
			totalAmount: this.invoice.totalAmount,
			amountPaid: this.invoice.amountPaid,
			orderNote: this.invoice.orderNote
		});
	}

	getFullAddress(address) {
		const fullAddress = address['streetAddress'] + '-' + address['pincode'];
		return fullAddress;
	}

	getSubAmount(rate: number, qty: number): number {
		return rate * qty;
	}

	getTotalAmount(rate: number, qty: number, discountRate: number, taxRate: number) {
		return ((1 + (taxRate - discountRate) * 0.01) * this.getSubAmount(rate, qty)).toFixed(2);
	}

	getOfferDiscount(offer: number) {
		return offer.toFixed(2);
	}

	closeClicked() {
		this.location.back();
	}

	@ViewChild('screen') screen: ElementRef;
	printInvoice() {
		let pdf = new jsPDF('landscape', 'mm', 'a4');
		pdf.setProperties({
			title: 'Pdf Export',
			author: 'Kanchan Medico',
			keywords: 'generated,drug-mart,kanchan,receipt',
			creator: 'Drug Mart'
		});

		html2canvas(this.screen.nativeElement).then((canvas) => {
			var imgData = canvas.toDataURL('image/png');
			var imgWidth = 297;
			var imgHeight = canvas.height * imgWidth / canvas.width;

			pdf.addImage({
				imageData: imgData,
				x: 0,
				y: 0,
				w: imgWidth,
				h: imgHeight
			});
			let pdfName = 'receipt' + this.invoice.invoicedDate + '.pdf';
			pdf.save(pdfName);
		});
	}
}
