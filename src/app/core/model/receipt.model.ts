export class Receipt {
	id: string;
	creationDate: Date;
	modificationDate: Date;
	clientName: string;
	clientContactName: string;
	clientPhoneNumber: string;
	paymentRefNo: string;
	paymentMethod: string;
	receiptNote: string;

	constructor(
		public clientId: string,
		public amountPaid: number,
		public receiptDate: Date,
		public invoiceReceiptType: boolean,
		public manualReceiptType: boolean
	) {}
}
