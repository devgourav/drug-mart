import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {

  constructor() { }

  vendorDetailsTableHeaders = ['Company Name','Contact Name','Balance','Billing Address','Phone','Email','Actions']
  vendorDetailsTableColumns = ['clientCompanyName','clientContactName','clientBalance','clientBillingAddress','clientPhone','clientEmail']
  rows=['1','2','3','4','5']

  ngOnInit() {
  }

}
