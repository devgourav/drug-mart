import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Tax } from 'src/app/core/model/tax.model';
import { TaxService } from 'src/app/core/service/tax.service';

const confirmMsg = "Do you want to delete this tax?";


@Component({
  selector: 'app-tax-details',
  templateUrl: './tax-details.component.html',
  styleUrls: ['./tax-details.component.scss']
})
export class TaxDetailsComponent implements OnInit {
  taxId: string = "";
  taxes: Tax[] = [];
  tax: Tax;

  taxInputForm = this.fb.group({
    name: ['', Validators.required],
    rate: ['', [Validators.required,Validators.max(100)]]
  });


  constructor(private location: Location, private _taxService: TaxService,private fb: FormBuilder) { }

  taxDetailsTableHeaders = ['Name','Rate','Actions']

  ngOnInit() {
    this.getTaxDetails();
  }

  get name() {
    return this.taxInputForm.get('name');
  }

  get rate() {
    return this.taxInputForm.get('rate');
  }

  closeClicked() {
    this.location.back();
  }


  getTaxDetails() {
    this._taxService.getTaxes()
      .subscribe((response) => {
        console.log("response:");
        if (response) {
          this.taxes = response;
        }
      });
  }

  deleteTax(tax: Tax){
    if(confirm(confirmMsg)){
      this._taxService.deleteTax(tax);
    }
  }

  setTax(){
    this.tax = Object.assign({}, this.taxInputForm.value);
    this._taxService.setTax(this.tax);
  }


}
