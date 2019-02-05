import { Component, OnInit } from '@angular/core';
import { Bill } from '../../model/billItem.model';
import { BillService } from '../../service/bill.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit {
  bills: Bill[] = [];
  confirmMsg = "Do you want to delete this Bill?";

  constructor(private _billService: BillService, private router: Router) {
  }

  billDetailsTableHeaders = ['BillDate', 'Vendor', 'Amount', 'Tax', 'Discount',
    'Order Notes', 'Amount Paid', 'Actions'];
  ngOnInit() {
    this.getBills();
  }

  getBills() {
    this.bills = this._billService.getBills();
    console.log(this.bills);
  }

  deleteBill(billId: string) {
    if (confirm(this.confirmMsg)) {
      this._billService.deleteBill(billId);
      this.getBills();
    }
  }

}
