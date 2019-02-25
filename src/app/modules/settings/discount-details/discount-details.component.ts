import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Discount } from 'src/app/core/model/discount.model';
import { DiscountService } from 'src/app/core/service/discount.service';

const confirmMsg = "Do you want to delete this discount?";


@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss']
})
export class DiscountDetailsComponent implements OnInit {
  discountId: string = "";
  discounts: Discount[] = [];
  discount: Discount = new Discount();

  constructor(private location: Location, private _discountService: DiscountService) { }

  discountDetailsTableHeaders = ['Name','Rate','Type','Actions']

  ngOnInit() {
    this.getDiscountDetails();
  }

  closeClicked() {
    this.location.back();
  }


  discountInputForm = new FormGroup({
    name: new FormControl(''),
    rate: new FormControl(''),
    type: new FormControl(''),
    description: new FormControl('')
  });

  getDiscountDetails() {
    this._discountService.getDiscounts()
      .subscribe((response) => {
        console.log("response:");
        if (response) {
          this.discounts = response;
        }
      });
  }

  deleteDiscount(discountId: string){
    if(confirm(confirmMsg)){
      this._discountService.deleteDiscount(discountId)
      .subscribe(()=>{
        this.getDiscountDetails();
      });

    }
  }

  setDiscount(){
    this.discount = Object.assign({}, this.discountInputForm.value);
    this._discountService.setDiscount(this.discount)
      .subscribe((response) => {
        this.getDiscountDetails();
        console.log(response);
      });
  }


}
