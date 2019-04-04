export class Payment {
	id: string;
	creationDate: Date;
	modificationDate: Date;
	clientName: string;
	clientContactName: string;
	clientPhoneNumber: string;
	paymentRefNo: string;
	amountPending: number;
	paymentMethod: string;

	constructor(public clientId: string, public amountPaid: number, public paymentDate: Date) {}
}
