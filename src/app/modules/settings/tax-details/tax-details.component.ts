import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  constructor(private location: Location, private _taxService: TaxService) { }

  taxDetailsTableHeaders = ['Name','Rate','Actions']

  ngOnInit() {
    this.getTaxDetails();
  }

  closeClicked() {
    this.location.back();
  }


  taxInputForm = new FormGroup({
    name: new FormControl(''),
    rate: new FormControl('')
  });

  getTaxDetails() {
    this._taxService.getTaxes()
      .subscribe((response) => {
        console.log("response:");
        if (response) {
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
