import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { Invoice } from 'src/app/core/model/invoice.model';

@Component({
	selector: 'app-sale-data',
	templateUrl: './sale-data.component.html',
	styleUrls: [ './sale-data.component.scss' ]
})
export class SaleDataComponent implements OnInit {
	invoices: Invoice[] = [];
	totalSale: string = '';
	noOfSales: string = '';
	constructor(private _invoiceService: InvoiceService) {}

	ngOnInit() {
		this.getInvoices();
	}

	getInvoices() {
		this._invoiceService.getInvoices().subscribe((response) => {
			this.invoices = response;
			this.getTotalSale();
		});
	}

	getTotalSale() {
		let totalSale = 0;
		let noOfSales = 0;
		for (let invoice of this.invoices) {
			totalSale += invoice.totalAmount;
			noOfSales++;
		}
		this.totalSale = totalSale.toFixed(2).toString();
		this.noOfSales = noOfSales.toString();
	}
}
