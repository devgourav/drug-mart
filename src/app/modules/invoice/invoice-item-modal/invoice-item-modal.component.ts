import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Item } from 'src/app/core/model/item.model';
import { ItemService } from 'src/app/core/service/item.service';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceItem } from 'src/app/core/model/invoiceItem.model';
import { TaxService } from 'src/app/core/service/tax.service';
import { Tax } from 'src/app/core/model/tax.model';
import { Offer } from 'src/app/core/model/offer.model';
import { OfferService } from 'src/app/core/service/offer.service';
import { BillItem } from 'src/app/core/model/billItem.model';

@Component({
	selector: 'item-modal',
	templateUrl: './invoice-item-modal.component.html',
	styleUrls: [ './invoice-item-modal.component.scss' ]
})
export class InvoiceItemModalComponent implements OnInit {
	@Input() invoiceItem: BillItem;
	@Output() addItemEvent: EventEmitter<BillItem> = new EventEmitter();
	@Output() editItemEvent: EventEmitter<BillItem> = new EventEmitter();

	items: Item[] = [];
	item: Item;
	taxes: Tax[];
	itemId: string = '';
	taxMap: Map<string, number>;
	offers: Offer[] = [];

	invoiceItemForm = this.fb.group({
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
		return this.invoiceItemForm.get('itemHSN');
	}

	get manufacturer() {
		return this.invoiceItemForm.get('manufacturer');
	}

	get batchNumber() {
		return this.invoiceItemForm.get('batchNumber');
	}

	get expiryDate() {
		return this.invoiceItemForm.get('expiryDate');
	}

	get quantity() {
		return this.invoiceItemForm.get('quantity');
	}

	get rate() {
		return this.invoiceItemForm.get('rate');
	}

	get itemMRP() {
		return this.invoiceItemForm.get('itemMRP');
	}

	get discount() {
		return this.invoiceItemForm.get('discount');
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
		if (this.invoiceItem) {
			console.warn('InvoiceItem:' + this.invoiceItem);
			this.populateInvoiceItem();
		}
	}

	addInvoiceItem() {
		this.addItemEvent.emit(this.getInvoiceItemObj());
	}

	editInvoiceItem() {
		this.editItemEvent.emit(this.getInvoiceItemObj());
	}

	getInvoiceItemObj(): BillItem {
		this.taxMap = new Map();
		this.taxMap.set('stateTax', +this.invoiceItemForm.get('stateTax').value);
		this.taxMap.set('countryTax', +this.invoiceItemForm.get('countryTax').value);

		const taxMap = this.convertMapToObject(this.taxMap);

		this.invoiceItem = new BillItem(
			this.invoiceItemForm.get('itemId').value,
			this.invoiceItemForm.get('itemName').value,
			this.invoiceItemForm.get('itemHSN').value,
			this.invoiceItemForm.get('manufacturer').value,
			this.invoiceItemForm.get('batchNumber').value,
			this.invoiceItemForm.get('expiryDate').value,
			this.invoiceItemForm.get('quantity').value,
			this.invoiceItemForm.get('rate').value,
			this.invoiceItemForm.get('itemMRP').value,
			taxMap
		);

		this.invoiceItem.discount = +this.invoiceItemForm.get('discount').value;
		this.invoiceItem.offer = +this.invoiceItemForm.get('offer').value;
		this.invoiceItem.packType = this.invoiceItemForm.get('packType').value;

		const invoiceItem = Object.assign({}, this.invoiceItem);
		return invoiceItem;
	}

	populateInvoiceItem() {
		this.invoiceItemForm.setValue({
			itemName: this.invoiceItem.itemName,
			itemId: this.invoiceItem.itemId,
			packType: this.invoiceItem.packType,
			itemHSN: this.invoiceItem.itemHSN,
			manufacturer: this.invoiceItem.manufacturer,
			batchNumber: this.invoiceItem.batchNumber,
			expiryDate: this.invoiceItem.expiryDate,
			quantity: this.invoiceItem.quantity,
			rate: this.invoiceItem.rate,
			itemMRP: this.invoiceItem.itemMRP,
			stateTax: this.invoiceItem.tax['stateTax'],
			countryTax: this.invoiceItem.tax['countryTax'],
			discount: this.invoiceItem.discount,
			offer: this.invoiceItem.offer
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
		this.invoiceItemForm.patchValue({
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
