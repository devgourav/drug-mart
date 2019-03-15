import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Item } from 'src/app/core/model/item.model';
import { ItemService } from 'src/app/core/service/item.service';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BillItem } from 'src/app/core/model/billItem.model';
import { TaxService } from 'src/app/core/service/tax.service';
import { Tax } from 'src/app/core/model/tax.model';
import { Offer } from 'src/app/core/model/offer.model';
import { OfferService } from 'src/app/core/service/offer.service';

@Component({
	selector: 'item-modal',
	templateUrl: './billItem-modal.component.html',
	styleUrls: [ './billItem-modal.component.scss' ]
})
export class BillItemModalComponent implements OnInit {
	@Input() billItem: BillItem;
	@Output() addItemEvent: EventEmitter<BillItem> = new EventEmitter();
	@Output() editItemEvent: EventEmitter<BillItem> = new EventEmitter();

	items: Item[] = [];
	item: Item;
	taxes: Tax[];
	itemId: string = '';
	taxMap: Map<string, number>;
	offers: Offer[] = [];

	billItemForm = this.fb.group({
		itemName: new FormControl(''),
		itemId: [ '', Validators.required ],
		packType: new FormControl(''),
		itemHSN: [ '', Validators.required ],
		manufacturer: [ '', Validators.required ],
		batchNumber: [ '', Validators.required ],
		expiryDate: [ '', Validators.required ],
		quantity: [ '', Validators.required ],
		rate: [ '', Validators.required ],
		itemMRP: [ '', Validators.required ],
		stateTax: new FormControl(''),
		countryTax: new FormControl(''),
		discount: [ '', [ Validators.required, Validators.max(100) ] ],
		offer: new FormControl('')
	});

	get itemHSN() {
		return this.billItemForm.get('itemHSN');
	}

	get manufacturer() {
		return this.billItemForm.get('manufacturer');
	}

	get batchNumber() {
		return this.billItemForm.get('batchNumber');
	}

	get expiryDate() {
		return this.billItemForm.get('expiryDate');
	}

	get quantity() {
		return this.billItemForm.get('quantity');
	}

	get rate() {
		return this.billItemForm.get('rate');
	}

	get itemMRP() {
		return this.billItemForm.get('itemMRP');
	}

	get discount() {
		return this.billItemForm.get('discount');
	}

	constructor(
		private modalService: NgbModal,
		private activeModal: NgbActiveModal,
		private _itemService: ItemService,
		private _taxService: TaxService,
		private fb: FormBuilder,
		private _offerService: OfferService
	) {}

	ngOnInit() {
		this.fetchTaxDetails();
		this.populateItemDropdown();
		this.fetchOffers();
		if (this.billItem) {
			console.warn('BillItem:' + this.billItem);
			this.populateBillItem();
		}
	}

	addBillItem() {
		this.addItemEvent.emit(this.getBillItemObj());
	}

	editBillItem() {
		this.editItemEvent.emit(this.getBillItemObj());
	}

	getBillItemObj(): BillItem {
		this.taxMap = new Map();
		this.taxMap.set('stateTax', +this.billItemForm.get('stateTax').value);
		this.taxMap.set('countryTax', +this.billItemForm.get('countryTax').value);

		const taxMap = this.convertMapToObject(this.taxMap);

		this.billItem = new BillItem(
			this.billItemForm.get('itemId').value,
			this.billItemForm.get('itemName').value,
			this.billItemForm.get('itemHSN').value,
			this.billItemForm.get('manufacturer').value,
			this.billItemForm.get('batchNumber').value,
			this.billItemForm.get('expiryDate').value,
			this.billItemForm.get('quantity').value,
			this.billItemForm.get('rate').value,
			this.billItemForm.get('itemMRP').value,
			taxMap
		);

		this.billItem.discount = +this.billItemForm.get('discount').value;
		this.billItem.offer = +this.billItemForm.get('offer').value;
		this.billItem.packType = this.billItemForm.get('packType').value;

		const billItem = Object.assign({}, this.billItem);
		return billItem;
	}

	populateBillItem() {
		this.billItemForm.setValue({
			itemName: this.billItem.itemName,
			itemId: this.billItem.itemId,
			packType: this.billItem.packType,
			itemHSN: this.billItem.itemHSN,
			manufacturer: this.billItem.manufacturer,
			batchNumber: this.billItem.batchNumber,
			expiryDate: this.billItem.expiryDate,
			quantity: this.billItem.quantity,
			rate: this.billItem.rate,
			itemMRP: this.billItem.itemMRP,
			stateTax: this.billItem.tax['stateTax'],
			countryTax: this.billItem.tax['countryTax'],
			discount: this.billItem.discount,
			offer: this.billItem.offer
		});
	}

	populateItemDropdown() {
		this._itemService.getItems().subscribe((response) => {
			this.items = response;
		});
	}

	populateOnItemSelectEvent(event: any) {
		this.itemId = event.target.value;
		for (let item of this.items) {
			if (item.id == this.itemId) {
				this.item = item;
			}
		}
		this.billItemForm.patchValue({
			itemName: this.item.name,
			itemId: this.item.id,
			packType: this.item.packType,
			itemHSN: this.item.HSNCode,
			manufacturer: this.item.manufacturer,
			itemMRP: this.item.itemMRP,
			batchNumber: this.item.batchNumber,
			expiryDate: this.item.expiryDate,
			rate: this.item.saleCost,
			discount: this.item.saleDiscount,
			offer: this.item.saleOffers
		});
	}

	fetchTaxDetails() {
		this._taxService.getTaxes().subscribe((response) => {
			this.taxes = response;
		});
	}

	convertMapToObject(map: Map<any, any>): Map<any, any> {
		let objectMap = Object.create(null);
		for (let [ k, v ] of map) {
			objectMap[k] = v;
		}
		return objectMap;
	}

	fetchOffers() {
		this._offerService.getOffers().subscribe((response) => {
			this.offers = response;
		});
	}

	calculatedDiscount(minItems: number, freeItems: number): number {
		return freeItems / (minItems + freeItems) * 100;
	}
}
