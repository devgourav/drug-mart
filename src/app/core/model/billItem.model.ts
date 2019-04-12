export class BillItem {
	id: string;
	creationDate: Date;
	modificationDate: Date;
	discount: number;
	offer: number;
	packType: string;
	taxrate: number;

	constructor(
		public itemId: string,
		public itemName: string,
		public itemHSN: string,
		public manufacturer: string,
		public batchNumber: string,
		public expiryDate: Date,
		public quantity: number,
		public rate: number,
		public itemMRP: number,
		public tax: Map<string, string>
	) {}
}
