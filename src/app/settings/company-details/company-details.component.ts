import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  constructor() { }

  showBillingAddress = true

  onBillingAddressClick(){
  	this.showBillingAddress = true
  }
  onShippingAddressClick(){
  	this.showBillingAddress = false;
  }

  ngOnInit() {
  }

}
