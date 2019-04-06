export class Payment {
	id: string;
	creationDate: Date;
	modificationDate: Date;
	vendorName: string;
	vendorContactName: string;
	vendorPhoneNumber: string;
	paymentRefNo: string;
	paymentMethod: string;
	paymentNote: string;

	constructor(
		public vendorId: string,
		public amountPaid: number,
		public paymentDate: Date,
		public billPaymentType: boolean,
		public manualPaymentType: boolean
	) {}
}
