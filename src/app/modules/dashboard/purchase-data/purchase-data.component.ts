import { Component, OnInit } from '@angular/core';
import { Bill } from 'src/app/core/model/bill.model';
import { BillService } from 'src/app/core/service/bill.service';

@Component({
	selector: 'app-purchase-data',
	templateUrl: './purchase-data.component.html',
	styleUrls: [ './purchase-data.component.scss' ]
})
export class PurchaseDataComponent implements OnInit {
	bills: Bill[] = [];
	totalPurchase: string = '';
	noOfPurchases: string = '';
	constructor(private _billService: BillService) {}

	ngOnInit() {
		this.getBills();
	}

	getBills() {
		this._billService.getBills().subscribe((response) => {
			this.bills = response;
			this.getTotalPurchase();
		});
	}

	getTotalPurchase() {
		let totalPurchase = 0;
		let noOfPurchases = 0;
		for (let invoice of this.bills) {
			totalPurchase += invoice.totalAmount;
			noOfPurchases++;
		}
		this.totalPurchase = totalPurchase.toFixed(2).toString();
		this.noOfPurchases = noOfPurchases.toString();
	}
}
