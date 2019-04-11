export class Tax {
	id: string;
	type: Map<string, boolean>;
	creationDate: Date;
	modificationDate: Date;

	constructor(public name: string, public rate: number) {}
}
