import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/core/model/item.model';
import { ItemService } from 'src/app/core/service/item.service';

const confirmMsg = 'Do you want to delete this item?';

@Component({
	selector: 'app-item-details',
	templateUrl: './item-details.component.html',
	styleUrls: [ './item-details.component.scss' ]
})
export class ItemDetailsComponent implements OnInit {
	items: Item[] = [];
	tableHeaders: any[];

	constructor(private _itemService: ItemService, private router: Router) {}

	// itemDetailsTableHeaders = [
	// 	'Name',
	// 	'Manufacturer',
	// 	'HSN Code',
	// 	'Pack Type',
	// 	'Purchase Cost',
	// 	'Min. Sale Cost',
	// 	'Quantity',
	// 	'Actions'
	// ];

	ngOnInit() {
		this.getItems();

		this.tableHeaders = [
			{ field: 'name', header: 'Name' },
			{ field: 'manufacturer', header: 'Manufacturer' },
			{ field: 'HSNCode', header: 'HSN Code' },
			{ field: 'packType', header: 'Pack Type' },
			{ field: 'purchaseCost', header: 'Purchase Cost' },
			// { field: 'saleCost', header: 'Min. Sale Cost' },
			{ field: 'quantity', header: 'Quantity' }
		];
	}

	getItems() {
		this._itemService.getItems().subscribe((response) => {
			this.items = response;
		});
		console.log(new Date());
		console.log('ItemList:' + this.items);
	}

	deleteItem(item: Item) {
		if (confirm(confirmMsg)) {
			this._itemService.deleteItem(item);
		}
	}

	editItem(itemId: string) {
		this.router.navigate([ 'Items/New Item', itemId ]);
	}
}
