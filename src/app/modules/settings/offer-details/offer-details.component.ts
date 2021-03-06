import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Offer } from 'src/app/core/model/offer.model';
import { OfferService } from 'src/app/core/service/offer.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

const confirmMsg = 'Do you want to delete this offer?';

@Component({
	selector: 'app-offer-details',
	templateUrl: './offer-details.component.html',
	styleUrls: [ './offer-details.component.scss' ],
	providers: [ ConfirmationService, MessageService ]
})
export class OfferDetailsComponent implements OnInit {
	offerId: string = '';
	offerType: string = 'percentage';
	offers: Offer[] = [];
	offer: Offer;
	tableHeaders: any[];
	msgs: Message[] = [];

	offerInputForm = this.fb.group({
		// name: [ '', Validators.required ],
		minItems: [ '', Validators.required ],
		freeItems: [ '', Validators.required ],
		description: new FormControl('')
	});

	constructor(private location: Location, private _offerService: OfferService, private fb: FormBuilder) {}

	offerDetailsTableHeaders = [ 'Name', 'Min. Items', 'Free Items', 'Calculated Discount', 'Actions' ];

	ngOnInit() {
		this.getOfferDetails();

		this.tableHeaders = [
			{ field: 'name', header: 'Offer Name' },
			{ field: 'minItems', header: 'Required Items' },
			{ field: 'freeItems', header: 'Free Items' }
		];
	}

	get name() {
		return this.offerInputForm.get('name');
	}

	get minItems() {
		return this.offerInputForm.get('minItems');
	}

	get freeItems() {
		return this.offerInputForm.get('freeItems');
	}

	closeClicked() {
		this.location.back();
	}

	getOfferDetails() {
		this._offerService.getOffers().subscribe((response) => {
			console.log('response:');
			if (response) {
				this.offers = response;
			}
		});
	}

	deleteOffer(offer: Offer) {
		if (confirm(confirmMsg)) {
			this._offerService.deleteOffer(offer);
		}
	}

	setOffer() {
		this._offerService.setOffer(this.getOfferObj());
	}

	getOfferObj(): Offer {
		var offername: string = this.offerInputForm.get('minItems').value + "+" + this.offerInputForm.get('freeItems').value;

		this.offer = new Offer(
			offername,
			this.offerInputForm.get('minItems').value,
			this.offerInputForm.get('freeItems').value
		);

		const offer = Object.assign({}, this.offer);
		return offer;
	}

	calculatedDiscount(minItems: number, freeItems: number): string {
		const discount = freeItems / (minItems + freeItems) * 100;
		return discount.toFixed(2) + '%';
	}
}
