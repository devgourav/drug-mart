import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
  discountType: string = "percentage";
  discounts: Discount[] = [];
  discount: Discount;

  discountInputForm = this.fb.group({
    name: ['', Validators.required],
    percentRate: [0, [Validators.required, Validators.max(100)]],
    fixedRate: [0, Validators.required],
    type: new FormControl(''),
    description: new FormControl('')
  });

  constructor(private location: Location, private _discountService: DiscountService,
     private fb: FormBuilder) { }

  discountDetailsTableHeaders = ['Name', 'Rate', 'Type', 'Actions']

  ngOnInit() {
    this.getDiscountDetails();
  }

  get name() {
    return this.discountInputForm.get('name');
  }

  get percentRate() {
    return this.discountInputForm.get('percentRate');
  }

  get fixedRate() {
    return this.discountInputForm.get('fixedRate');
  }


  closeClicked() {
    this.location.back();
  }


  getDiscountDetails() {
    this._discountService.getDiscounts()
      .subscribe((response) => {
        console.log("response:");
        if (response) {
          this.discounts = response;
        }
      });
  }

  deleteDiscount(discount: Discount) {
    if (confirm(confirmMsg)) {
      this._discountService.deleteDiscount(discount);
    }
  }

  setDiscount() {
    console.log(this.discountInputForm.get("type").value);
    this._discountService.setDiscount(this.getDiscountObj());
  }

  setDiscountType(event: any) {
    this.discountType = event.target.value;
    this.discountInputForm.patchValue({
      percentRate:0,
      fixedRate:0
    })

  }

  getDiscountObj(): Discount {
    const rate = (this.discountType == "percentage") ?
      this.discountInputForm.get("percentRate").value : this.discountInputForm.get("fixedRate").value;

    this.discount = new Discount(
      this.discountInputForm.get("name").value,
      rate,
      this.discountType
    )

    const discount = Object.assign({}, this.discount);
    return discount;
  }



}
