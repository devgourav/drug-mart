import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/core/model/vendor.model';
import { VendorService } from 'src/app/core/service/vendor.service';
import { Subscription } from 'rxjs';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

const confirmMsg = 'Do you want to delete this vendor?';

@Component({
	selector: 'app-vendor-details',
	templateUrl: './vendor-details.component.html',
	styleUrls: [ './vendor-details.component.scss' ]
})
export class VendorDetailsComponent implements OnInit {
	vendors: Vendor[] = [];
	private subscriptions: Array<Subscription> = [];

	constructor(private _vendorService: VendorService, private router: Router) {}

	vendorDetailsTableHeaders = [
		'Vendor Name',
		'Contact Name',
		'Address',
		'Email',
		'Vendor Phone',
		'Contact Phone',
		'Actions'
	];

	exportVendorDetailsTableHeaders = [
		'Vendor Name',
		'Contact Name',
		'Address',
		'Email',
		'Vendor Phone',
		'Contact Phone'
	];

	ngOnInit() {
		this.getVendors();
	}

	getVendors() {
		this.subscriptions.push(
			this._vendorService.getVendors().subscribe((response) => {
				this.vendors = response;
			})
		);
	}

	deleteVendor(vendor: Vendor) {
		if (confirm(confirmMsg)) {
			this._vendorService.deleteVendor(vendor);
		}
	}

	editVendor(vendorId: string) {
		this.router.navigate([ 'Vendors/New Vendor', vendorId ]);
	}

	ngOnDestroy() {
		this.subscriptions.forEach((subscription: Subscription) => {
			subscription.unsubscribe();
		});
	}

	@ViewChild('screen') screen: ElementRef;
	saveAsPDF() {
		let pdf = new jsPDF('portrait', 'mm', 'a4');
		pdf.setProperties({
			title: 'Pdf Export',
			subject: 'This is the subject',
			author: 'Kanchan Medico',
			keywords: 'generated, javascript, web 2.0, ajax',
			creator: 'Drug Mart'
		});

		html2canvas(this.screen.nativeElement).then((canvas) => {
			var imgData = canvas.toDataURL('image/png');
			var imgWidth = 208;
			var pageHeight = 295;
			var imgHeight = canvas.height * imgWidth / canvas.width;

			pdf.addImage(imgData, 0, 0, imgWidth, imgHeight);
			pdf.save('test.pdf');
		});
	}
}
