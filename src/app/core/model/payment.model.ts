export class Payment {
	id: string;
	creationDate: Date;
	modificationDate: Date;
	billId: string[];

	constructor(
		public clientId: string,
		public amountPending: number,
		public amountPaid: number,
		public paymentDate: Date,
		public paymentCutoffDate: Date,
		public paymentMethod: string
	) {}
}
