import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  constructor() { }

  clientDetailsTableHeaders = ['Company Name','Contact Name','Balance','Billing Address','Phone','Email','Actions']
  clientDetailsTableColumns = ['clientCompanyName','clientContactName','clientBalance','clientBillingAddress','clientPhone','clientEmail']
  rows=['1','2','3','4','5']


  ngOnInit() {
  }

}
