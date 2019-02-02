import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
  billTableHeaders = ['Particular','Manufacturer','Quantity', 'Rate', 'Tax','Discount','Offers','Amount','M.R.P', 'Actions']
  billTableColumns = ['itemParticular','itemMfg','itemQuantity', 'itemRate','itemTax','itemDiscount','itemOffers','itemAmount','itemTotal']


}
