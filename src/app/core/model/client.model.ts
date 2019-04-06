export class Client {
	id: string;
	creationDate: Date;
	modificationDate: Date;
	amountBalance: number = 0;

	constructor(
		public name: string,
		public phoneNumber: string,
		public emailId: string,
		public website: string,
		public GSTIN: string,
		public contactPersonName: string,
		public contactPersonPhoneNumber: string,
		public contactPersonEmailId: string,
		public address: Map<string, string>,
		public notes: string
	) {}
}
