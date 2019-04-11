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

	constructor(
		private location: Location,
		private _taxService: TaxService,
		private fb: FormBuilder,
		private messageService: MessageService,
		private confirmationService: ConfirmationService
	) {}

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

	getTaxDetails() {
		this._taxService.getTaxes().subscribe((response) => {
			this.taxes = response;
		});
	}

	/**
	 * 
	 * @param tax 
	 */
	getTaxType(tax: Tax): string {
		var taxMap = tax.type;
		return taxMap['stateTax'] ? 'StateTax' : 'CountryTax';
	}

	/**
	 * 
	 * @param tax 
	 */
	deleteTax(tax: Tax) {
		this.confirmationService.confirm({
			message: 'Do you want to delete this item?',
			header: 'Delete Confirmation',
			icon: 'pi pi-info-circle',
			reject: () => {
				this.msgs = [ { severity: 'info', summary: 'Rejected', detail: 'You have rejected' } ];
			},
			accept: () => {
				this.msgs = [ { severity: 'info', summary: 'Confirmed', detail: 'Tax Deleted' } ];
				this._taxService.deleteTax(tax);
				this.messageService.add({ severity: 'success', summary: '', detail: 'Tax Deleted' });
			}
		});
	}

	/**
	 * 
	 */
	setTax() {
		this._taxService.setTax(this.getTaxObj());
		this.getTaxDetails();
	}

	/**
	 * @name getTaxObj
	 * @returns Tax
	 */
	getTaxObj(): Tax {
		var taxMap: Map<string, boolean> = new Map();
		if (this.isStateTax == true) {
			taxMap.set('stateTax', true);
		} else if (this.isCountryTax == true) {
			taxMap.set('countryTax', true);
		}

		this.tax = new Tax(this.taxInputForm.get('name').value, this.taxInputForm.get('rate').value);
		this.tax.type = this.convertMapToObject(taxMap);

		const tax = Object.assign({}, this.tax);

		console.log(tax);
		return tax;
	}

	/**
	 * 
	 * @param isChecked 
	 */
	stateTaxChecked(isChecked: boolean) {
		if (isChecked) {
			this.taxInputForm.get('isCountryTax').setValue(false);
		}
	}

	/**
	 * 
	 * @param isChecked 
	 */
	countryTaxChanged(isChecked: boolean) {
		if (isChecked) {
			this.taxInputForm.get('isStateTax').setValue(false);
		}
	}

	convertMapToObject(map: Map<any, any>): Map<any, any> {
		let objectMap = Object.create(null);
		for (let [ k, v ] of map) {
			objectMap[k] = v;
		}
		return objectMap;
	}

	closeClicked() {
		this.location.back();
	}
}
