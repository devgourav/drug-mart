import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Item } from 'src/app/core/model/item.model';
import { ItemService } from 'src/app/core/service/item.service';
import { OfferService } from 'src/app/core/service/offer.service';
import { Offer } from 'src/app/core/model/offer.model';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

// TODO: Add A save/Update prompt

@Component({
	selector: 'app-new-item',
	templateUrl: './new-item.component.html',
	styleUrls: [ './new-item.component.scss' ]
})
export class NewItemComponent implements OnInit {
	item: Item;
	itemId: string = '';
	itemMap: Map<string, string> = new Map();
	submitted = false;
	offers: Offer[] = [];

	itemInputForm = this.fb.group({
		name: [ '', Validators.required ],
		description: new FormControl(''),
		manufacturer: [ '', Validators.required ],
		packType: new FormControl(''),
		quantity: [ '', Validators.required ],
		HSNCode: [ '', Validators.required ],
		batchNumber: [ '', Validators.required ],
		expiryDate: [ '', Validators.required ],
		purchaseCost: [ '', Validators.required ],
		itemMRP: [ '', Validators.required ],
		saleCost: [ '', Validators.required ],
		saleDiscount: [ '', Validators.max(100) ],
		saleOffers: new FormControl('')
	});

	constructor(
		private location: Location,
		private _itemService: ItemService,
		private route: ActivatedRoute,
		private fb: FormBuilder,
		private _offerService: OfferService
	) {}

	ngOnInit() {
		this.fetchOffers();
		this.route.paramMap.subscribe((params) => {
			this.itemId = params.get('id');
			if (this.itemId) {
				this.getItem(params.get('id'));
			}
		});

		console.log('ngOnInit', this.name);
	}

	get name() {
		return this.itemInputForm.get('name');
	}

	get manufacturer() {
		return this.itemInputForm.get('manufacturer');
	}

	get quantity() {
		return this.itemInputForm.get('quantity');
	}

	get HSNCode() {
		return this.itemInputForm.get('HSNCode');
	}

	get batchNumber() {
		return this.itemInputForm.get('batchNumber');
	}

	get expiryDate() {
		return this.itemInputForm.get('expiryDate');
	}

	get purchaseCost() {
		return this.itemInputForm.get('purchaseCost');
	}

	get itemMRP() {
		return this.itemInputForm.get('itemMRP');
	}
	get saleCost() {
		return this.itemInputForm.get('saleCost');
	}
	get saleDiscount() {
		return this.itemInputForm.get('saleDiscount');
	}

	getItem(itemId: string) {
		this._itemService.getItemById(itemId).subscribe((response) => {
			this.item = new Item(
				response.name,
				response.quantity,
				response.description,
				response.HSNCode,
				response.batchNumber,
				response.expiryDate,
				response.packType,
				response.manufacturer,
				response.purchaseCost,
				response.itemMRP,
				response.saleCost,
				response.saleDiscount,
				response.saleOffers
			);
			console.log(new Date());
			console.log(response.expiryDate);
			this.populateItemData();
		});
	}

	populateItemData() {
		this.itemInputForm.setValue({
			name: this.item.name,
			description: this.item.description,
			manufacturer: this.item.manufacturer,
			packType: this.item.packType,
			quantity: this.item.quantity,
			HSNCode: this.item.HSNCode,
			batchNumber: this.item.batchNumber,
			expiryDate: this.item.expiryDate,
			purchaseCost: this.item.purchaseCost,
			saleCost: this.item.saleCost,
			itemMRP: this.item.itemMRP,
			saleDiscount: this.item.saleDiscount,
			saleOffers: this.item.saleOffers
		});
	}

	closeClicked() {
		this.location.back();
		this.itemInputForm.reset();
	}

	setItem() {
		console.log(this.getItemObj());
		this._itemService.setItem(this.getItemObj());
		this.closeClicked();
	}

	updateItem() {
		this._itemService.updateItem(this.getItemObj());
		this.closeClicked();
	}

	getItemObj(): Item {
		this.item = new Item(
			this.itemInputForm.get('name').value,
			this.itemInputForm.get('quantity').value,
			this.itemInputForm.get('description').value,
			this.itemInputForm.get('HSNCode').value,
			this.itemInputForm.get('batchNumber').value,
			this.itemInputForm.get('expiryDate').value,
			this.itemInputForm.get('packType').value,
			this.itemInputForm.get('manufacturer').value,
			this.itemInputForm.get('purchaseCost').value,
			this.itemInputForm.get('itemMRP').value,
			this.itemInputForm.get('saleCost').value,
			this.itemInputForm.get('saleDiscount').value,
			this.itemInputForm.get('saleOffers').value
		);
		this.item.id = this.itemId;
		if (this.itemId) {
			this.item.modificationDate = new Date();
		} else {
			this.item.creationDate = new Date();
			this.item.modificationDate = new Date();
		}

		const item = Object.assign({}, this.item);
		return item;
	}

	fetchOffers() {
		this._offerService.getOffers().subscribe((response) => {
			this.offers = response;
		});
	}

	calculatedDiscount(minItems: number, freeItems: number): number {
		return freeItems / (minItems + freeItems) * 100;
	}

	@ViewChild('screen') screen: ElementRef;
	printItem() {
		let pdf = new jsPDF('portrait', 'mm', 'a4');
		pdf.setProperties({
			title: 'Pdf Export',
			subject: 'This is the subject',
			author: 'Kanchan Medico',
			keywords: 'generated, javascript, web 2.0, ajax',
			creator: 'Drug Mart'
		});

		html2canvas(this.screen.nativeElement).then((canvas: any) => {
			var imgData = canvas.toDataURL('image/png');
			var imgWidth = 208;
			var pageHeight = 295;
			var imgHeight = canvas.height * imgWidth / canvas.width;

			pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
			pdf.output('dataurlnewwindow');
		});
	}
}
