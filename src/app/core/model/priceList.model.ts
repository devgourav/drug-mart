export class PriceList {
	id: string;
	creationDate: Date;
	modificationDate: Date;

	constructor(public name: string, public rate: number) {}
}
