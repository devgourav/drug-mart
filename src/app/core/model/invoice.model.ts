import { BillItem } from './billItem.model';

export class Invoice {
	id: string;
	invoiceNumber: string;
	clientName: string;
	totalTax: number;
	totalDiscount: number;
	totalAmount: number;
	creationDate: Date;
	modificationDate: Date;
	paymentMethod: string;
	orderNote: string;
	paymentRef: string;

	constructor(
		public clientId: string,
		public invoiceItems: BillItem[],
		public invoicedDate: Date,
		public amountPaid: number
	) {}
}
