import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CompanyDetails } from 'src/app/core/model/companyDetails.model';
import { CompanyDetailsService } from 'src/app/core/service/company-details.service';

@Component({
	selector: 'app-company-details',
	templateUrl: './company-details.component.html',
	styleUrls: [ './company-details.component.scss' ]
})
export class CompanyDetailsComponent implements OnInit {
	companyDetails: CompanyDetails;
	showBillingAddress: boolean = true;
	addressMap: Map<string, string>;
	companyDetailsId: string = '';
	states: string[] = [];

	constructor(
		private location: Location,
		private _companyDetailsService: CompanyDetailsService,
		private fb: FormBuilder
	) {}
	ngOnInit() {
		this.getCompanyDetails();
		if (this.states.length == 0) {
			this.loadStateData();
		}
	}

	onBillingAddressClick() {
		this.showBillingAddress = true;
	}
	onShippingAddressClick() {
		this.showBillingAddress = false;
	}

	closeClicked() {
		this.location.back();
		this.companyDetailsInputForm.reset();
	}

	companyDetailsInputForm = this.fb.group({
		name: new FormControl(''),
		phoneNumber: new FormControl(''),
		altPhoneNumber: new FormControl(''),
		emailId: [ '', Validators.email ],
		website: new FormControl(''),
		GSTNumber: new FormControl(''),
		serviceTaxNo: new FormControl(''),
		billingAddress: new FormGroup({
			streetAddress: new FormControl(''),
			country: new FormControl(''),
			state: new FormControl(''),
			city: new FormControl(''),
			pincode: new FormControl('')
		}),
		shippingAddress: new FormGroup({
			streetAddress: new FormControl(''),
			country: new FormControl(''),
			state: new FormControl(''),
			city: new FormControl(''),
			pincode: new FormControl('')
		})
	});

	get emailId() {
		return this.companyDetailsInputForm.get('emailId');
	}

	getCompanyDetails() {
		this._companyDetailsService.getCompanyDetails().subscribe((response) => {
			console.log('response:');
			if (response) {
				const cDetails = response[0];
				this.companyDetails = new CompanyDetails(
					cDetails.name,
					cDetails.phoneNumber,
					cDetails.altPhoneNumber,
					cDetails.emailId,
					cDetails.website,
					cDetails.GSTNumber,
					cDetails.serviceTaxNo,
					cDetails.billingAddress,
					cDetails.shippingAddress
				);
				this.companyDetailsId = cDetails.id;
				this.companyDetails.id = cDetails.id;
				this.populateCompanyDetailsData();
			}
		});
	}

	populateCompanyDetailsData() {
		this.companyDetailsInputForm.setValue({
			name: this.companyDetails.name,
			phoneNumber: this.companyDetails.phoneNumber,
			altPhoneNumber: this.companyDetails.altPhoneNumber,
			emailId: this.companyDetails.emailId,
			website: this.companyDetails.website,
			GSTNumber: this.companyDetails.GSTNumber,
			serviceTaxNo: this.companyDetails.serviceTaxNo,
			billingAddress: {
				streetAddress: this.companyDetails.billingAddress['streetAddress'],
				country: this.companyDetails.billingAddress['country'],
				state: this.companyDetails.billingAddress['state'],
				city: this.companyDetails.billingAddress['city'],
				pincode: this.companyDetails.billingAddress['pincode']
			},
			shippingAddress: {
				streetAddress: this.companyDetails.shippingAddress['streetAddress'],
				country: this.companyDetails.shippingAddress['country'],
				state: this.companyDetails.shippingAddress['state'],
				city: this.companyDetails.shippingAddress['city'],
				pincode: this.companyDetails.shippingAddress['pincode']
			}
		});
	}

	saveCompanyDetails() {
		if (!this.companyDetails) {
			this._companyDetailsService.setCompanyDetails(this.getCompanyObj());
			this.getCompanyDetails();
		} else {
			this._companyDetailsService.updateCompanyDetails(this.getCompanyObj());
			this.getCompanyDetails();
		}
	}

	getCompanyObj(): CompanyDetails {
		this.addressMap = new Map();
		this.addressMap.set(
			'streetAddress',
			this.companyDetailsInputForm.get('billingAddress').get('streetAddress').value
		);
		this.addressMap.set('country', this.companyDetailsInputForm.get('billingAddress').get('country').value);
		this.addressMap.set('state', this.companyDetailsInputForm.get('billingAddress').get('state').value);
		this.addressMap.set('city', this.companyDetailsInputForm.get('billingAddress').get('city').value);
		this.addressMap.set('pincode', this.companyDetailsInputForm.get('billingAddress').get('pincode').value);

		const billingAddress = this.convertMapToObject(this.addressMap);

		this.addressMap = new Map();
		this.addressMap.set(
			'streetAddress',
			this.companyDetailsInputForm.get('shippingAddress').get('streetAddress').value
		);
		this.addressMap.set('country', this.companyDetailsInputForm.get('shippingAddress').get('country').value);
		this.addressMap.set('state', this.companyDetailsInputForm.get('shippingAddress').get('state').value);
		this.addressMap.set('city', this.companyDetailsInputForm.get('shippingAddress').get('city').value);
		this.addressMap.set('pincode', this.companyDetailsInputForm.get('shippingAddress').get('pincode').value);

		const shippingAddress = this.convertMapToObject(this.addressMap);

		this.companyDetails = new CompanyDetails(
			this.companyDetailsInputForm.get('name').value,
			this.companyDetailsInputForm.get('phoneNumber').value,
			this.companyDetailsInputForm.get('altPhoneNumber').value,
			this.companyDetailsInputForm.get('emailId').value,
			this.companyDetailsInputForm.get('website').value,
			this.companyDetailsInputForm.get('GSTNumber').value,
			this.companyDetailsInputForm.get('serviceTaxNo').value,
			billingAddress,
			shippingAddress
		);
		this.companyDetails.id = this.companyDetailsId;
		const companyDetails = Object.assign({}, this.companyDetails);
		return companyDetails;
	}

	convertMapToObject(map: Map<any, any>): Map<any, any> {
		let objectMap = Object.create(null);
		for (let [ k, v ] of map) {
			objectMap[k] = v;
		}
		return objectMap;
	}

	/**
	 * @name loadStateData
	 * @description push all Indian states to the state Array;
	 */
	loadStateData() {
		this.states = [
			...this.states,
			'Andhra Pradesh (AP)',
			'Arunachal Pradesh (AR)',
			'Assam (AS)',
			'Bihar (BR)',
			'Chhattisgarh (CG)',
			'Goa (GA)',
			'Gujarat (GJ)',
			'Haryana (HR)',
			'Himachal Pradesh (HP)',
			'Jammu and Kashmir (JK)',
			'Jharkhand (JH)',
			'Karnataka (KA)',
			'Kerala (KL)',
			'Madhya Pradesh (MP)',
			'Maharashtra (MH)',
			'Manipur (MN)',
			'Meghalaya (ML)',
			'Mizoram (MZ)',
			'Nagaland (NL)',
			'Odisha(OR)',
			'Punjab (PB)',
			'Rajasthan (RJ)',
			'Sikkim (SK)',
			'Tamil Nadu (TN)',
			'Telangana (TS)',
			'Tripura (TR)',
			'Uttar Pradesh (UP)',
			'Uttarakhand (UK)',
			'West Bengal (WB)',
			'Andaman and Nicobar Islands(AN)',
			'Chandigarh (CH)',
			'Dadra and Nagar Haveli (DN)',
			'Daman and Diu (DD)',
			'National Capital Territory of Delhi (DL)',
			'Lakshadweep (LD)',
			'Pondicherry (PY)'
		];
	}
}
