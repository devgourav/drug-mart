import { Component, OnInit } from '@angular/core';
import { Bill } from '../../model/bill.model';
import { BillService } from '../../service/bill.service';
import { Router } from '@angular/router';
import { VendorService } from 'src/app/service/vendor.service';


const confirmMsg = "Do you want to delete this Bill?";



@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit {
  bills: Bill[] = [];
  vendorName: string = "";
  totalAmount:number = null;
  totalTax:number = null;
  totalDiscount:number = null;

  constructor(private _billService: BillService, private router: Router,
  private _vendorService: VendorService) {
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
      console.log(this.bills);
    })
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

  getTotalAmount(bill: Bill){
    for(let billItem of bill.billItems){
      this.totalAmount+=billItem.rate*1*billItem.quantity*1;
      this.totalTax+=billItem.rate*1*billItem.quantity*1;
    }
  }

}
