import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Vendor } from 'src/app/core/model/vendor.model';
import { VendorService } from 'src/app/core/service/vendor.service';
import { Subscription } from 'rxjs';

// TODO: Add A save/Update prompt

@Component({
	selector: 'app-new-vendor',
	templateUrl: './new-vendor.component.html',
	styleUrls: [ './new-vendor.component.scss' ]
})
export class NewVendorComponent implements OnInit {
	vendor: Vendor;
	vendorId: string = '';
	addressMap: Map<string, string>;
	private subscriptions: Array<Subscription> = [];

	// vendorInputForm = this.fb.group({
	// 	name: [ '', Validators.required ],
	// 	phoneNumber: [ '', [Validators.maxLength(10),Validators.required] ],
	// 	emailId: [ '', Validators.email ],
	// 	website: new FormControl(''),
	// 	GSTIN: new FormControl(''),
	// 	amountBalance: new FormControl(''),
	// 	contactPersonName: [ '', Validators.required ],
	// 	contactPersonPhoneNumber: [ ''],
	// 	contactPersonEmailId: [ '', Validators.email ],
	// 	address: [ '', [ Validators.required, Validators.maxLength(200) ] ],
	// 	pincode: [ ''],
	// 	notes: [ '', Validators.maxLength(200) ]
	// });


	vendorInputForm = this.fb.group({
		name: [ '', Validators.required ],
		website: new FormControl(''),
		GSTIN: new FormControl(''),
		amountBalance: new FormControl(''),
		contactPersonName: [ '', Validators.required ],
		contactPersonPhoneNumber: [ ''],
		contactPersonEmailId: [ '', Validators.email ],
		address: [ '', [ Validators.required, Validators.maxLength(200) ] ],
		pincode: [ ''],
		notes: [ '', Validators.maxLength(200) ],
		drugLicense20B: new FormControl(''),
		drugLicense21B: new FormControl('')
	});

	constructor(
		private location: Location,
		private _vendorService: VendorService,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) {}
	ngOnInit() {
		this.subscriptions.push(
			this.route.paramMap.subscribe((params) => {
				this.vendorId = params.get('id');
				if (this.vendorId) {
					this.getVendor(params.get('id'));
				}
			})
		);
	}

	get name() {
		return this.vendorInputForm.get('name');
	}

	// get phoneNumber() {
	// 	return this.vendorInputForm.get('phoneNumber');
	// }

	// get emailId() {
	// 	return this.vendorInputForm.get('emailId');
	// }

	get contactPersonName() {
		return this.vendorInputForm.get('contactPersonName');
	}

	get contactPersonPhoneNumber() {
		return this.vendorInputForm.get('contactPersonPhoneNumber');
	}

	get contactPersonEmailId() {
		return this.vendorInputForm.get('contactPersonEmailId');
	}

	get address() {
		return this.vendorInputForm.get('address');
	}

	get pincode() {
		return this.vendorInputForm.get('pincode');
	}

	get notes() {
		return this.vendorInputForm.get('notes');
	}

	getVendor(vendorId: string) {
		this.subscriptions.push(
			this._vendorService.getVendorById(vendorId).subscribe((response) => {
				this.addressMap = new Map();
				this.addressMap.set('streetAddress', response.address['streetAddress']);
				this.addressMap.set('pincode', response.address['pincode']);

				this.vendor = new Vendor(
					response.name,
					// response.phoneNumber,
					// response.emailId,
					response.website,
					response.GSTIN,
					response.contactPersonName,
					response.contactPersonPhoneNumber,
					response.contactPersonEmailId,
					this.addressMap,
					response.notes,
					response.drugLicense20B,
					response.drugLicense21B
				);
				this.vendor.amountBalance = +response.amountBalance.toFixed(2);
				this.populateVendorData();
			})
		);
	}

	closeClicked() {
		this.location.back();
		this.vendorInputForm.reset();
	}

	setVendor() {
		this._vendorService.setVendor(this.getVendorObj());
		this.closeClicked();
	}

	updateVendor() {
		this._vendorService.updateVendor(this.getVendorObj());
		this.closeClicked();
	}

	populateVendorData() {
		this.vendorInputForm.setValue({
			name: this.vendor.name,
			// phoneNumber: this.vendor.phoneNumber,
			// emailId: this.vendor.emailId,
			website: this.vendor.website,
			GSTIN: this.vendor.GSTIN,
			amountBalance: this.vendor.amountBalance,
			contactPersonName: this.vendor.contactPersonName,
			contactPersonPhoneNumber: this.vendor.contactPersonPhoneNumber,
			contactPersonEmailId: this.vendor.contactPersonEmailId,
			address: this.vendor.address.get('streetAddress'),
			pincode: this.vendor.address.get('pincode'),
			notes: this.vendor.notes,
			drugLicense20B:this.vendor.drugLicense20B,
			drugLicense21B:this.vendor.drugLicense21B
		});
	}

	getVendorObj(): Vendor {
		this.addressMap = new Map();
		this.addressMap.set('streetAddress', this.vendorInputForm.get('address').value);
		this.addressMap.set('pincode', this.vendorInputForm.get('pincode').value);

		const addressMap = this.convertMapToObject(this.addressMap);

		this.vendor = new Vendor(
			this.vendorInputForm.get('name').value,
			// this.vendorInputForm.get('phoneNumber').value,
			// this.vendorInputForm.get('emailId').value,
			this.vendorInputForm.get('website').value,
			this.vendorInputForm.get('GSTIN').value,
			this.vendorInputForm.get('contactPersonName').value,
			this.vendorInputForm.get('contactPersonPhoneNumber').value,
			this.vendorInputForm.get('contactPersonEmailId').value,
			addressMap,
			this.vendorInputForm.get('notes').value,
			this.vendorInputForm.get('drugLicense20B').value,
			this.vendorInputForm.get('drugLicense21B').value
		);
		this.vendor.id = this.vendorId;
		this.vendor.amountBalance = 0;
		const vendor = Object.assign({}, this.vendor);
		return vendor;
	}

	convertMapToObject(map: Map<any, any>): Map<any, any> {
		let objectMap = Object.create(null);
		for (let [ k, v ] of map) {
			objectMap[k] = v;
		}
		return objectMap;
	}

	ngOnDestroy() {
		this.subscriptions.forEach((subscription: Subscription) => {
			subscription.unsubscribe();
		});
	}
}
