import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-invoice-details',
	templateUrl: './invoice-details.component.html',
	styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {

	constructor() { }

	invoiceDetailsTableHeaders = ['Invoice Number', 'Client Name', 'Status', 'Issue Date', 'Due Date', 'Tax', 'Amount','Balance','Actions'];
	invoiceDetailsTableColumns = ['invoiceNumber', 'clientName', 'clientStatus', 'invoiceIssueDate', 'invoiceDueDate', 'invoiceTax', 'invoiceAmount', 'invoiceBalance'];
	rows = ['1', '2', '3', '4', '5'];

	ngOnInit() {
	}

}
