import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormBuilder } from '@angular/forms';
import { BillService } from 'src/app/core/service/bill.service';
import { CompanyDetailsService } from 'src/app/core/service/company-details.service';
import { Bill } from 'src/app/core/model/bill.model';
import { CompanyDetails } from 'src/app/core/model/companyDetails.model';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { VendorService } from 'src/app/core/service/vendor.service';
import { Vendor } from 'src/app/core/model/vendor.model';
import { BillItem } from 'src/app/core/model/billItem.model';

@Component({
	selector: 'app-bill-print',
	templateUrl: './bill-print.component.html',
	styleUrls: [ './bill-print.component.scss' ]
})
export class BillPrintComponent implements OnInit {
	billId: string = '';
	bill: Bill;
	companyDetails: CompanyDetails;
	vendor: Vendor;
	billItems: BillItem[] = [];

	tableHeaders: any[];

	constructor(
		private route: ActivatedRoute,
		private location: Location,
		private _billService: BillService,
		private _companyDetailsService: CompanyDetailsService,
		private _vendorService: VendorService,
		private fb: FormBuilder
	) {}

	billDetailsForm = this.fb.group({
		name: new FormControl(''),
		phoneNumber: new FormControl(''),
		GSTNumber: new FormControl(''),
		address: new FormControl(''),
		billNumber: new FormControl(''),
		billedDate: new FormControl(''),
		vendorName: new FormControl(''),
		vendorPhoneNumber: new FormControl(''),
		vendorGSTNumber: new FormControl(''),
		vendorAddress: new FormControl('')
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
			this.billId = params.get('id');
			if (this.billId) {
				this.getBill(params.get('id'));
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

	getBill(billId: string) {
		this._billService.getBillById(billId).subscribe((response) => {
			this.bill = response;
			this._vendorService.getVendorById(this.bill.vendorId).subscribe((response) => {
				this.vendor = response;
				console.log('vendor->getBill', this.vendor);
				this.populateBillDetails();
				this.populateAfterTableDetails();
			});
		});
	}

	populateBillDetails() {
		this._companyDetailsService.getCompanyDetails().subscribe((response) => {
			this.companyDetails = response[0];
			console.log('companyDetails', this.companyDetails);
			console.log('vendor', this.vendor);
			console.log('bill', this.bill);
			this.billDetailsForm.setValue({
				name: this.companyDetails.name,
				address: this.getFullAddress(this.companyDetails.billingAddress),
				phoneNumber: this.companyDetails.phoneNumber,
				GSTNumber: this.companyDetails.GSTNumber,
				billNumber: this.bill.billNumber,
				billedDate: this.bill.billedDate,
				vendorName: this.vendor.name,
				vendorPhoneNumber: this.vendor.phoneNumber,
				vendorGSTNumber: this.vendor.GSTIN,
				vendorAddress: this.vendor.address['streetAddress']
			});
			this.billItems = this.bill.billItems;
		});
	}

	populateAfterTableDetails() {
		this.afterTableDetailsForm.setValue({
			subAmount: (this.bill.totalAmount - this.bill.totalTax + this.bill.totalDiscount).toFixed(2),
			taxAmount: this.bill.totalTax.toFixed(2),
			discountAmount: this.bill.totalDiscount.toFixed(2),
			totalAmount: this.bill.totalAmount.toFixed(2),
			amountPaid: this.bill.amountPaid.toFixed(2),
			orderNote: this.bill.orderNote
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
	printBill() {
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
