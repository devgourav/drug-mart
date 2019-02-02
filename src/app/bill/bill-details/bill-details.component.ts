import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit {

  constructor() { }

  billDetailsTableHeaders = ['Issue Date','Vendor Name','Status','Category','Due Date','Tax','Amount','Balance','Actions']
  billDetailsTableColumns = ['billIssueDate','billVendorName','billStatus','billCategory','billDueDate','billTax','billAmount','billBalance']
  rows=['1','2','3','4','5']


  ngOnInit() {
  }

}
