export class Tax {
	id: string;
	isCountryTax: boolean;
	isStateTax: boolean;
	creationDate: Date;
	modificationDate: Date;

	constructor(public name: string, public rate: number) {}
}
