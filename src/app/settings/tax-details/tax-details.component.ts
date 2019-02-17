import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { TaxService } from 'src/app/service/tax.service';
import { Tax } from 'src/app/model/tax.model';

const confirmMsg = "Do you want to delete this tax?";


@Component({
  selector: 'app-tax-details',
  templateUrl: './tax-details.component.html',
  styleUrls: ['./tax-details.component.scss']
})
export class TaxDetailsComponent implements OnInit {
  taxId: string = "";
  taxes: Tax[] = [];
  tax: Tax = new Tax();

  constructor(private location: Location, private _taxService: TaxService) { }

  taxDetailsTableHeaders = ['Name','Rate','Actions']

  ngOnInit() {
    this.getTaxDetails();
  }

  taxInputForm = new FormGroup({
    name: new FormControl(''),
    rate: new FormControl('')
  });

  getTaxDetails() {
    this._taxService.getTaxes()
      .subscribe((response) => {
        console.log("response:");
        if (response && response.length>0) {
          this.taxes = response;
        }
      });
  }

  deleteTax(taxId: string){
    if(confirm(confirmMsg)){
      this._taxService.deleteTax(taxId)
      .subscribe(()=>{
        this.getTaxDetails();
      });

    }
  }

  setTax(){
    this.tax = Object.assign({}, this.taxInputForm.value);
    this._taxService.setTax(this.tax)
      .subscribe((response) => {
        this.getTaxDetails();
        console.log(response);
      });
  }


}
