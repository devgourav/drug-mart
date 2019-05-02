export class Client {
	id: string;
	creationDate: Date;
	modificationDate: Date;
	phoneNumber: string;
	emailId: string;
	amountBalance: number = 0;

	constructor(
		public name: string,
		public website: string,
		public GSTIN: string,
		public contactPersonName: string,
		public contactPersonPhoneNumber: string,
		public contactPersonEmailId: string,
		public address: Map<string, string>,
		public notes: string,
		public drugLicense20B: string,
		public drugLicense21B: string
	) {}
}
