import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/core/model/invoice.model';
import { Amount } from 'src/app/core/model/amount.model';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { InvoiceItem } from 'src/app/core/model/invoiceItem.model';

const confirmMsg = "Do you want to delete this Invoice?";



@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  invoices: Invoice[] = [];

  taxRate: number;
  discountRate: number;
  invoiceAmount: Amount;
  response:any;

  constructor(private _invoiceService: InvoiceService, private router: Router) {
    this.invoiceAmount = new Amount();
  }

  invoiceDetailsTableHeaders = ['InvoiceDate', 'Client', 'Sub Amount', 'Tax', 'Discount', 'Total Amount',
    'Order Notes', 'Amount Paid', 'Actions'];

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices() {
    this._invoiceService.getInvoices()
      .subscribe((response) => {
        this.invoices = response;
      })
  }

  deleteInvoice(invoice: Invoice) {
    if (confirm(confirmMsg)) {
      this._invoiceService.deleteInvoice(invoice);
    }
  }

  editInvoice(invoiceId: string) {
    this.router.navigate(['Invoice/New Invoice', invoiceId]);
  }

  getSubAmount(invoiceItems: InvoiceItem[]): number {
    this.invoiceAmount.subAmount = 0;
    for (let invoiceItem of invoiceItems) {
      this.invoiceAmount.subAmount += (invoiceItem.rate * invoiceItem.quantity);
    }
    return this.invoiceAmount.subAmount;
  }

  getTaxAmount(invoiceItems: InvoiceItem[]): number {
    this.invoiceAmount.taxAmount = 0;
    for (let invoiceItem of invoiceItems) {
      this.invoiceAmount.taxAmount += (invoiceItem.tax["stateTax"] + invoiceItem.tax["countryTax"]) * 0.01 * this.invoiceAmount.subAmount;
    }
    return this.invoiceAmount.taxAmount;
  }

  getDiscountAmount(invoiceItems: InvoiceItem[]): number {
    this.invoiceAmount.discountAmount = 0;
    for (let invoiceItem of invoiceItems) {
      this.invoiceAmount.discountAmount += (invoiceItem.discount * 0.01 * this.invoiceAmount.subAmount);
    }
    return this.invoiceAmount.discountAmount;
  }

  getTotalAmount(): number {
    return  this.invoiceAmount.totalAmount = this.invoiceAmount.subAmount + this.invoiceAmount.taxAmount
        - this.invoiceAmount.discountAmount;
  }
}
