import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Tax } from 'src/app/core/model/tax.model';
import { TaxService } from 'src/app/core/service/tax.service';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

const confirmMsg = 'Do you want to delete this tax?';

@Component({
	selector: 'app-tax-details',
	templateUrl: './tax-details.component.html',
	styleUrls: [ './tax-details.component.scss' ],
	providers: [ ConfirmationService, MessageService ]
})
export class TaxDetailsComponent implements OnInit {
	taxId: string = '';
	taxes: Tax[] = [];
	tableHeaders: any[];
	msgs: Message[] = [];
	tax: Tax;
	ifStateTax: boolean = true;

	taxInputForm = this.fb.group({
		name: [ '', Validators.required ],
		rate: [ '', [ Validators.required, Validators.max(100) ] ],
		isStateTax: [ '', Validators.required ],
		isCountryTax: [ '', Validators.required ]
	});

	constructor(private location: Location, private _taxService: TaxService, private fb: FormBuilder) {}

	ngOnInit() {
		this.getTaxDetails();

		this.tableHeaders = [
			{ field: 'name', header: ' Tax Name' },
			{ field: 'rate', header: 'Rate' },
			{ field: 'taxType', header: 'Tax Type' }
		];
	}

	get name() {
		return this.taxInputForm.get('name');
	}

	get rate() {
		return this.taxInputForm.get('rate');
	}

	get isStateTax() {
		return this.taxInputForm.get('isStateTax').value;
	}

	get isCountryTax() {
		return this.taxInputForm.get('isCountryTax').value;
	}

	closeClicked() {
		this.location.back();
	}

	getTaxDetails() {
		this._taxService.getTaxes().subscribe((response) => {
			this.taxes = response;
			console.log(response);
		});
	}

	getTaxType(tax: Tax): string {
		if (tax.isStateTax) {
			return 'StateTax';
		} else {
			return 'CountryTax';
		}
	}

	deleteTax(tax: Tax) {
		if (confirm(confirmMsg)) {
			this._taxService.deleteTax(tax);
		}
	}

	setTax() {
		this._taxService.setTax(this.getTaxObj());
	}

	getTaxObj(): Tax {
		if (this.isStateTax == 'true') {
			this.ifStateTax == true;
		} else {
			this.isStateTax == false;
		}
		this.tax = new Tax(this.taxInputForm.get('name').value, this.taxInputForm.get('rate').value, this.isStateTax);

		const tax = Object.assign({}, this.tax);
		return tax;
	}

	stateTaxChecked(isChecked) {
		console.log(isChecked);
		if (isChecked) {
			this.taxInputForm.get('isCountryTax').setValue(false);
		}
	}

	countryTaxChanged(isChecked) {
		console.log(isChecked);
		if (isChecked) {
			this.taxInputForm.get('isStateTax').setValue(false);
		}
	}
}
