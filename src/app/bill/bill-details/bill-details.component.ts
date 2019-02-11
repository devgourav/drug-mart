import { Component, OnInit } from '@angular/core';
import { Bill } from '../../model/billItem.model';
import { BillService } from '../../service/bill.service';
import { Router } from '@angular/router';


const confirmMsg = "Do you want to delete this Bill?";



@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit {
  bills: Bill[] = [];

  constructor(private _billService: BillService, private router: Router) {
  }

  billDetailsTableHeaders = ['BillDate', 'Vendor', 'Amount', 'Tax', 'Discount',
    'Order Notes', 'Amount Paid', 'Actions'];

  ngOnInit() {
    this.getBills();
  }

  getBills() {
    this._billService.getBills()
    .subscribe((response)=>{
      this.bills = response;
    });
  }

  deleteBill(billId: string) {
    if (confirm(confirmMsg)) {
      this._billService.deleteBill(billId)
      .subscribe(()=>{
        this.getBills();
      });
    }
  }

  editBill(billId: string){
    this.router.navigate(['Bills/New Bill',billId]);
  }

}
