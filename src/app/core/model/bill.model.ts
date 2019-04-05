import { BillItem } from './billItem.model';

export class Bill {
	id: string;
	billNumber: string;
	vendorName: string;
	totalTax: number;
	totalDiscount: number;
	totalAmount: number;
	creationDate: Date;
	modificationDate: Date;
	paymentMethod: string;
	orderNote: string;
	paymentRef: string;
	paymentId: string;

	constructor(
		public vendorId: string,
		public billItems: BillItem[],
		public billedDate: Date,
		public amountPaid: number
	) {}
}
