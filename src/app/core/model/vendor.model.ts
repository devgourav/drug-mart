import { Payment } from './payment.model';

export class Vendor {
	id: string;
	creationDate: Date;
	modificationDate: Date;
	amountBalance: number = 0;
	public phoneNumber: string;
	public emailId: string;

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
