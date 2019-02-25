import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bill } from 'src/app/core/model/bill.model';
import { BillService } from 'src/app/core/service/bill.service';
import { Amount } from 'src/app/core/model/amount.model';
import { BillItem } from 'src/app/core/model/billItem.model';


const confirmMsg = "Do you want to delete this Bill?";



@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit {
  bills: Bill[] = [];

  taxRate: number;
  discountRate: number;
  billAmount: Amount;
  response:any;

  constructor(private _billService: BillService, private router: Router) {
    this.billAmount = new Amount();
  }

  billDetailsTableHeaders = ['BillDate', 'Vendor', 'Sub Amount', 'Tax', 'Discount', 'Total Amount',
    'Order Notes', 'Amount Paid', 'Actions'];

  ngOnInit() {
    this.getBills();
  }

  getBills() {
    this._billService.getBills()
      .subscribe((response) => {
        this.bills = response;
      })
  }

  deleteBill(bill: Bill) {
    if (confirm(confirmMsg)) {
      this._billService.deleteBill(bill);
    }
  }

  editBill(billId: string) {
    this.router.navigate(['Bills/New Bill', billId]);
  }

  getSubAmount(billItems: BillItem[]): number {
    this.billAmount.subAmount = 0;
    for (let billItem of billItems) {
      this.billAmount.subAmount += (billItem.rate * billItem.quantity);
    }
    return this.billAmount.subAmount;
  }

  getTaxAmount(billItems: BillItem[]): number {
    this.billAmount.taxAmount = 0;
    for (let billItem of billItems) {
      this.billAmount.taxAmount += (billItem.tax["stateTax"] + billItem.tax["countryTax"]) * 0.01 * this.billAmount.subAmount;
    }
    return this.billAmount.taxAmount;
  }

  getDiscountAmount(billItems: BillItem[]): number {
    this.billAmount.discountAmount = 0;
    for (let billItem of billItems) {
      this.billAmount.discountAmount += (billItem.discount * 0.01 * this.billAmount.subAmount);
    }
    return this.billAmount.discountAmount;
  }

  getTotalAmount(): number {
    return  this.billAmount.totalAmount = this.billAmount.subAmount + this.billAmount.taxAmount
        - this.billAmount.discountAmount;
  }
}
