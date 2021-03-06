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
import { ClientService } from 'src/app/core/service/client.service';
import { Client } from 'src/app/core/model/client.model';
import { InvoiceItem } from 'src/app/core/model/invoiceItem.model';

@Component({
	selector: 'app-invoice-print',
	templateUrl: './invoice-print.component.html',
	styleUrls: [ './invoice-print.component.scss' ]
})
export class InvoicePrintComponent implements OnInit {
	invoiceId: string = '';
	invoice: Invoice;
	companyDetails: CompanyDetails;
	client: Client;
	invoiceItems: InvoiceItem[] = [];

	tableHeaders: any[];

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private _invoiceService: InvoiceService,
		private _companyDetailsService: CompanyDetailsService,
		private _clientService: ClientService,
		private fb: FormBuilder
	) {}

	invoiceDetailsForm = this.fb.group({
		name: new FormControl(''),
		phoneNumber: new FormControl(''),
		GSTNumber: new FormControl(''),
		address: new FormControl(''),
		invoiceNumber: new FormControl(''),
		invoicedDate: new FormControl(''),
		clientName: new FormControl(''),
		clientPhoneNumber: new FormControl(''),
		clientGSTNumber: new FormControl(''),
		clientAddress: new FormControl('')
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

	getInvoice(invoiceId: string) {
		this._invoiceService.getInvoiceById(invoiceId).subscribe((response) => {
			this.invoice = response;
			this._clientService.getClientById(this.invoice.clientId).subscribe((response) => {
				this.client = response;
				console.log('client->getInvoice', this.client);
				this.populateInvoiceDetails();
				this.populateAfterTableDetails();
			});
		});
	}

	populateInvoiceDetails() {
		this._companyDetailsService.getCompanyDetails().subscribe((response) => {
			this.companyDetails = response[0];
			console.log('companyDetails', this.companyDetails);
			console.log('client', this.client);
			console.log('invoice', this.invoice);
			this.invoiceDetailsForm.setValue({
				name: this.companyDetails.name,
				address: this.getFullAddress(this.companyDetails.billingAddress),
				phoneNumber: this.companyDetails.phoneNumber,
				GSTNumber: this.companyDetails.GSTNumber,
				invoiceNumber: this.invoice.invoiceNumber,
				invoicedDate: this.invoice.invoicedDate,
				clientName: this.client.name,
				clientPhoneNumber: this.client.phoneNumber,
				clientGSTNumber: this.client.GSTIN,
				clientAddress: this.client.address['streetAddress']
			});
			this.invoiceItems = this.invoice.invoiceItems;
		});
	}

	populateAfterTableDetails() {
		this.afterTableDetailsForm.setValue({
			subAmount: (this.invoice.totalAmount - this.invoice.totalTax + this.invoice.totalDiscount).toFixed(2),
			taxAmount: this.invoice.totalTax.toFixed(2),
			discountAmount: this.invoice.totalDiscount.toFixed(2),
			totalAmount: this.invoice.totalAmount.toFixed(2),
			amountPaid: this.invoice.amountPaid.toFixed(2),
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

			pdf.autoPrint();
			window.open(pdf.output('bloburl'), '_blank');
		});
	}
}
