import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-item-details',
	templateUrl: './item-details.component.html',
	styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

	constructor() { }

	itemDetailsTableHeaders = ['Name', 'Description','Category','Type', 'Price', 'Unit','Quantity','Actions'];
	itemDetailsTableColumns = ['itemName', 'itemDescription', 'itemCategory', 'itemType', 'itemPrice','itemUnit','itemQuantity'];
	rows = ['1', '2', '3', '4', '5'];


	ngOnInit() {
	}

}
