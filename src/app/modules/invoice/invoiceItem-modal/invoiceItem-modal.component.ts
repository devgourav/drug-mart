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
import { Subscription } from 'rxjs';

@Component({
	selector: 'item-modal',
	templateUrl: './invoiceItem-modal.component.html',
	styleUrls: [ './invoiceItem-modal.component.scss' ]
})
export class InvoiceItemModalComponent implements OnInit {
	@Input() invoiceItem: InvoiceItem;
	@Output() addItemEvent: EventEmitter<InvoiceItem> = new EventEmitter();
	@Output() editItemEvent: EventEmitter<InvoiceItem> = new EventEmitter();

	items: Item[] = [];
	item: Item;
	taxes: Tax[];
	itemId: string = '';
	offers: Offer[] = [];
	stateTaxes: Tax[] = [];
	countryTaxes: Tax[] = [];

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
		discount: [ '', [ Validators.max(100) ] ],
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

	itemSubscription: Subscription;

	constructor(
		private modalService: NgbModal,
		public activeModal: NgbActiveModal,
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
			console.log('InvoiceItem:', this.invoiceItem);
			this.populateInvoiceItem();
		}
	}

	/**
	 * 
	 */
	addInvoiceItem() {
		this.addItemEvent.emit(this.getInvoiceItemObj());
	}

	editInvoiceItem() {
		this.editItemEvent.emit(this.getInvoiceItemObj());
	}

	/**
	 * @name getInvoiceItemObj
	 * @returns InvoiceItem
	 */
	getInvoiceItemObj(): InvoiceItem {
		let taxRate = 0;

		let taxMap: Map<string, string> = new Map();
		let stateTaxId = this.invoiceItemForm.get('stateTax').value;
		let countryTaxId = this.invoiceItemForm.get('countryTax').value;

		this.taxes.forEach((tax) => {
			if (stateTaxId == tax.id || countryTaxId == tax.id) {
				taxRate += tax.rate;
			}
		});

		taxMap.set('stateTax', stateTaxId);
		taxMap.set('countryTax', countryTaxId);

		this.invoiceItem = new InvoiceItem(
			this.invoiceItemForm.get('itemId').value,
			this.invoiceItemForm.get('itemName').value,
			this.invoiceItemForm.get('itemHSN').value,
			this.invoiceItemForm.get('manufacturer').value,
			this.invoiceItemForm.get('batchNumber').value,
			this.invoiceItemForm.get('expiryDate').value,
			this.invoiceItemForm.get('quantity').value,
			this.invoiceItemForm.get('rate').value,
			this.invoiceItemForm.get('itemMRP').value,
			this.convertMapToObject(taxMap)
		);

		this.invoiceItem.discount = +this.invoiceItemForm.get('discount').value;
		this.invoiceItem.offer = +this.invoiceItemForm.get('offer').value;
		this.invoiceItem.packType = this.invoiceItemForm.get('packType').value;
		this.invoiceItem.taxrate = taxRate;

		// const invoiceItem = Object.assign({}, this.invoiceItem);
		const invoiceItem = { ...this.invoiceItem };
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
		this.itemSubscription = this._itemService.getItems().subscribe((response) => {
			this.items = response;
		});
	}

	/**
	 * 
	 * @param event 
	 */
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
			offer: this.item.saleOffers,
			stateTax: this.item.stateTaxId,
			countryTax: this.item.countryTaxId
		});
	}

	fetchTaxDetails() {
		this._taxService.getTaxes().subscribe((response) => {
			this.taxes = response;
			for (let tax of response) {
				if (tax.isStateTax) {
					this.stateTaxes.push(tax);
				} else{
					this.countryTaxes.push(tax);
				}
			}
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

	ngOnDestroy(): void {
		this.itemSubscription.unsubscribe();
	}
}
