import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/core/model/client.model';
import { ClientService } from 'src/app/core/service/client.service';
import { Subscription } from 'rxjs';
import { Payment } from 'src/app/core/model/payment.model';

// TODO: Add A save/Update prompt

@Component({
	selector: 'app-new-client',
	templateUrl: './new-client.component.html',
	styleUrls: [ './new-client.component.scss' ]
})
export class NewClientComponent implements OnInit {
	client: Client;
	clientId: string;
	addressMap: Map<string, string>;
	private subscriptions: Array<Subscription> = [];

	// clientInputForm = this.fb.group({
	// 	name: [ '', Validators.required ],
	// 	phoneNumber: [ '', Validators.required ],
	// 	emailId: [ '', Validators.email ],
	// 	website: new FormControl(''),
	// 	GSTIN: new FormControl(''),
	// 	amountBalance: new FormControl(''),
	// 	contactPersonName: [ '', Validators.required ],
	// 	contactPersonPhoneNumber: [ '' ],
	// 	contactPersonEmailId: [ '', Validators.email ],
	// 	address: [ '', [ Validators.required, Validators.maxLength(200) ] ],
	// 	pincode: [''],
	// 	notes: [ '', Validators.maxLength(200) ]
	// });

	clientInputForm = this.fb.group({
		name: [ '', Validators.required ],
		website: new FormControl(''),
		GSTIN: new FormControl(''),
		amountBalance: new FormControl(''),
		contactPersonName: [ '', Validators.required ],
		contactPersonPhoneNumber: [ '' ],
		contactPersonEmailId: [ '', Validators.email ],
		address: [ '', [ Validators.required, Validators.maxLength(200) ] ],
		pincode: new FormControl(''),
		notes: [ '', Validators.maxLength(200) ],
		drugLicense20B: new FormControl(''),
		drugLicense21B: new FormControl('')
	});

	constructor(
		private location: Location,
		private _clientService: ClientService,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) {
		this.clientId = '';
	}
	ngOnInit() {
		this.subscriptions.push(
			this.route.paramMap.subscribe((params) => {
				this.clientId = params.get('id');
				if (this.clientId) {
					this.getClient(params.get('id'));
				}
			})
		);
	}

	get name() {
		return this.clientInputForm.get('name');
	}

	// get phoneNumber() {
	// 	return this.clientInputForm.get('phoneNumber');
	// }

	// get emailId() {
	// 	return this.clientInputForm.get('emailId');
	// }

	get contactPersonName() {
		return this.clientInputForm.get('contactPersonName');
	}

	get contactPersonPhoneNumber() {
		return this.clientInputForm.get('contactPersonPhoneNumber');
	}

	get contactPersonEmailId() {
		return this.clientInputForm.get('contactPersonEmailId');
	}

	get address() {
		return this.clientInputForm.get('address');
	}

	get pincode() {
		return this.clientInputForm.get('pincode');
	}

	get notes() {
		return this.clientInputForm.get('notes');
	}

	closeClicked() {
		this.location.back();
		this.clientInputForm.reset();
	}

	getClient(clientId: string) {
		this.subscriptions.push(
			this._clientService.getClientById(clientId).subscribe((response) => {
				this.addressMap = new Map();
				this.addressMap.set('streetAddress', response.address['streetAddress']);
				this.addressMap.set('pincode', response.address['pincode']);

				this.client = new Client(
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
				this.client.amountBalance = +response.amountBalance.toFixed(2);
				this.populateClientData();
			})
		);
	}

	getClientObj(): Client {
		this.addressMap = new Map();
		this.addressMap.set('streetAddress', this.clientInputForm.get('address').value);
		this.addressMap.set('pincode', this.clientInputForm.get('pincode').value);

		const addressMap = this.convertMapToObject(this.addressMap);

		this.client = new Client(
			this.clientInputForm.get('name').value,
			// this.clientInputForm.get('phoneNumber').value,
			// this.clientInputForm.get('emailId').value,
			this.clientInputForm.get('website').value,
			this.clientInputForm.get('GSTIN').value,
			this.clientInputForm.get('contactPersonName').value,
			this.clientInputForm.get('contactPersonPhoneNumber').value,
			this.clientInputForm.get('contactPersonEmailId').value,
			addressMap,
			this.clientInputForm.get('notes').value,
			this.clientInputForm.get('drugLicense20B').value,
			this.clientInputForm.get('drugLicense21B').value
		);
		this.client.id = this.clientId;
		this.client.amountBalance = 0;
		const client = Object.assign({}, this.client);
		console.log(client);
		return client;
	}

	setClient() {
		this._clientService.setClient(this.getClientObj());
		this.closeClicked();
	}

	updateClient() {
		this._clientService.updateClient(this.getClientObj());
		this.closeClicked();
	}

	convertMapToObject(map: Map<any, any>): Map<any, any> {
		let objectMap = Object.create(null);
		for (let [ k, v ] of map) {
			objectMap[k] = v;
		}
		return objectMap;
	}

	populateClientData() {
		console.log(this.client);
		this.clientInputForm.setValue({
			name: this.client.name,
			// phoneNumber: this.client.phoneNumber,
			// emailId: this.client.emailId,
			website: this.client.website,
			GSTIN: this.client.GSTIN,
			amountBalance: this.client.amountBalance,
			contactPersonName: this.client.contactPersonName,
			contactPersonPhoneNumber: this.client.contactPersonPhoneNumber,
			contactPersonEmailId: this.client.contactPersonEmailId,
			address: this.client.address.get('streetAddress'),
			pincode: this.client.address.get('pincode'),
			notes: this.client.notes,
			drugLicense20B:this.client.drugLicense20B,
			drugLicense21B:this.client.drugLicense21B
		});
	}

	ngOnDestroy() {
		this.subscriptions.forEach((subscription: Subscription) => {
			subscription.unsubscribe();
		});
	}
}
