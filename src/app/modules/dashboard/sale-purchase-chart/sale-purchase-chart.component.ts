import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { BillService } from 'src/app/core/service/bill.service';
import { Invoice } from 'src/app/core/model/invoice.model';
import { Bill } from 'src/app/core/model/bill.model';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-sale-purchase-chart',
	templateUrl: './sale-purchase-chart.component.html',
	styleUrls: [ './sale-purchase-chart.component.scss' ],
	providers: [ MessageService ]
})
export class SalePurchaseChartComponent implements OnInit {
	invoices: Invoice[] = [];
	invoiceAmounts: number[] = [];
	billAmounts: number[] = [];
	bills: Bill[] = [];
	data: any;

	constructor(
		private _invoiceService: InvoiceService,
		private _billService: BillService,
		private messageService: MessageService
	) {}

	ngOnInit() {
		this.getDatasets();
	}

	getDatasets() {
		this._invoiceService.getInvoices().subscribe((response) => {
			this.invoices = response;
			for (let invoice of this.invoices) {
				this.invoiceAmounts.push(invoice.totalAmount);
			}
			this._billService.getBills().subscribe((response) => {
				this.bills = response;
				for (let bill of this.bills) {
					this.billAmounts.push(bill.totalAmount);
				}
				this.drawChart();
			});
		});
	}

	drawChart() {
		this.data = {
			labels: [ '01 Mar', '02 Mar', '03 Mar', '04 Mar', '05 Mar', '06 Mar' ],
			datasets: [
				{
					label: 'Sale Data',
					data: [ 0, 10, 20, 30, 40, 50 ],
					fill: false,
					borderColor: '#4bc0c0'
				},
				{
					label: 'Purchase Data',
					data: [ 0, 10, 20, 30, 40, 50 ],
					fill: false,
					borderColor: '#4bc0c0'
				}
			]
		};
	}
}
