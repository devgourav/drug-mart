import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { PriceList } from 'src/app/core/model/priceList.model';
import { PriceListService } from 'src/app/core/service/price-list.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

const confirmMsg = 'Do you want to delete this priceLists?';

@Component({
  selector: 'app-item-pricelist',
  templateUrl: './item-pricelist.component.html',
  styleUrls: ['./item-pricelist.component.scss'],
  providers: [ ConfirmationService, MessageService ]
})
export class ItemPricelistComponent implements OnInit {
  priceListId: string = '';
	priceLists: PriceList[] = [];
	tableHeaders: any[];
	msgs: Message[] = [];
	priceList: PriceList;

	priceListInputForm = this.fb.group({
		name: [ '', Validators.required ],
		rate: [ '', [ Validators.required, Validators.max(100) ] ]
	});

	constructor(
		private location: Location,
		private _priceListService: PriceListService,
		private fb: FormBuilder,
		private messageService: MessageService,
		private confirmationService: ConfirmationService
	) {}

	ngOnInit() {
		this.getPriceListDetails();

		this.tableHeaders = [
			{ field: 'name', header: ' PriceList Name' },
			{ field: 'rate', header: 'Rate' },
			// { field: 'priceListType', header: 'PriceList Type' }
		];
	}

	get name() {
		return this.priceListInputForm.get('name');
	}

	get rate() {
		return this.priceListInputForm.get('rate');
	}

	get isStatePriceList() {
		return this.priceListInputForm.get('isStatePriceList').value;
	}

	get isCountryPriceList() {
		return this.priceListInputForm.get('isCountryPriceList').value;
	}

	getPriceListDetails() {
		this._priceListService.getPriceLists().subscribe((response) => {
			this.priceLists = response;
		});
	}


	/**
	 * 
	 * @param priceList 
	 */
	deletePriceList(priceList: PriceList) {
		this.confirmationService.confirm({
			message: 'Do you want to delete this item?',
			header: 'Delete Confirmation',
			icon: 'pi pi-info-circle',
			reject: () => {
				this.msgs = [ { severity: 'info', summary: 'Rejected', detail: 'You have rejected' } ];
			},
			accept: () => {
				this.msgs = [ { severity: 'info', summary: 'Confirmed', detail: 'PriceList Deleted' } ];
				this._priceListService.deletePriceList(priceList);
				this.messageService.add({ severity: 'success', summary: '', detail: 'PriceList Deleted' });
			}
		});
	}

	/**
	 * 
	 */
	setPriceList() {
		this._priceListService.setPriceList(this.getPriceListObj());
		this.getPriceListDetails();
	}

	/**
	 * @name getPriceListObj
	 * @returns PriceList
	 */
	getPriceListObj(): PriceList {
		var priceListMap: Map<string, boolean> = new Map();

		this.priceList = new PriceList(this.priceListInputForm.get('name').value, this.priceListInputForm.get('rate').value);

		const priceList = Object.assign({}, this.priceList);

		console.log(priceList);
		return priceList;
	}

	// /**
	//  * 
	//  * @param isChecked 
	//  */
	// statePriceListChecked(isChecked: boolean) {
	// 	if (isChecked) {
	// 		this.priceListInputForm.get('isCountryPriceList').setValue(false);
	// 	}
	// }

	// /**
	//  * 
	//  * @param isChecked 
	//  */
	// countryPriceListChanged(isChecked: boolean) {
	// 	if (isChecked) {
	// 		this.priceListInputForm.get('isStatePriceList').setValue(false);
	// 	}
	// }

	closeClicked() {
		this.location.back();
	}
}
