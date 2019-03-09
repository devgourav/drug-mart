import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InvoiceItemModalComponent } from '../invoice-item-modal/invoice-item-modal.component';
import { Invoice } from 'src/app/core/model/invoice.model';
import { Client } from 'src/app/core/model/client.model';
import { Amount } from 'src/app/core/model/amount.model';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { ClientService } from 'src/app/core/service/client.service';
import { InvoiceItem } from 'src/app/core/model/invoiceItem.model';
import { Subscription } from 'rxjs';


// TODO: Add A save/Update prompt



@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {

  invoice: Invoice;
  invoiceItems: InvoiceItem[] = [];
  invoiceItem: InvoiceItem;

  invoiceId: string = "";
  netAmount: Amount = new Amount();
  taxRate: number;
  discountRate: number;

  clients: Client[];
  clientId: string = "";
  clientName: string = "";

    private subscriptions: Array<Subscription> = [];


  constructor(private location: Location, private modalService: NgbModal,
    private _invoiceService: InvoiceService, private _clientService: ClientService,
    private route: ActivatedRoute) {
    this.netAmount = new Amount();
  }
  ngOnInit() {
    this.populateClientDropDown();
    this.subscriptions.push(this.route.paramMap.subscribe(params => {
      this.invoiceId = params.get('id');
      if (this.invoiceId) {
        this.getInvoice(params.get('id'));
      }
    }));
  }

  invoiceInputForm = new FormGroup({
    clientId: new FormControl(''),
    invoicedDate: new FormControl(''),
    orderNote: new FormControl(''),
    amountPaid: new FormControl(''),
    paymentMethod: new FormControl('')
  });

  invoiceTableHeaders = ['Particular', 'Manufacturer', 'Quantity', 'Rate', 'Amount',
    'Discount', 'Tax', 'Total', 'Offers', 'M.R.P', 'Actions']

  openItemModal() {
    const modalRef = this.modalService.open(InvoiceItemModalComponent, { size: 'lg', keyboard: true });
    this.subscriptions.push(modalRef.componentInstance.addItemEvent.subscribe((response: InvoiceItem) => {
      this.invoiceItem = new InvoiceItem(
        response.itemId,
        response.itemName,
        response.packType,
        response.itemHSN,
        response.manufacturer,
        response.batchNumber,
        response.expiryDate,
        response.quantity,
        response.rate,
        response.itemMRP,
        response.tax,
        response.discount,
        response.offer
      );
      const invoiceItem = Object.assign({}, this.invoiceItem)
      this.invoiceItems.push(invoiceItem);
      this.calculateTotalCosts(this.invoiceItems);
    }));
  }

  getSubAmount(rate: number, qty: number): number {
    return rate * qty;
  }

  // getTaxAmount(rate: number,qty: number,taxRate: number){
  //   return taxRate*0.1*this.getSubAmount(rate,qty);
  // }
  //
  // getDiscountAmount(rate: number,qty: number,discountRate: number){
  //   return discountRate*0.1*this.getSubAmount(rate,qty);
  // }

  getTotalAmount(rate: number, qty: number, discountRate: number, taxRate: number) {
    return (1 + (taxRate - discountRate) * 0.01) * this.getSubAmount(rate, qty);
  }

  calculateTotalCosts(invoiceItems: InvoiceItem[]) {
    this.netAmount = new Amount();
    this.taxRate = this.discountRate = 0;

    for (let invoiceItem of invoiceItems) {
      this.taxRate = invoiceItem.tax["stateTax"] + invoiceItem.tax["countryTax"]
      this.discountRate = invoiceItem.discount;

      this.netAmount.subAmount += (invoiceItem.rate * invoiceItem.quantity);
      this.netAmount.taxAmount += (this.taxRate * 0.01 * this.netAmount.subAmount);
      this.netAmount.discountAmount += (this.discountRate * 0.01 * this.netAmount.subAmount);
      this.netAmount.totalAmount += this.netAmount.subAmount + this.netAmount.taxAmount
        - this.netAmount.discountAmount;

    }
  }

  populateClientDropDown() {
    this._clientService.clients
      .subscribe((response) => {
        this.clients = response;
      })
  }

  closeClicked() {
    this.location.back();
  }

  getInvoice(invoiceId: string) {
    this.subscriptions.push(this._invoiceService.getInvoiceById(invoiceId)
      .subscribe((response) => {
        this.invoice = new Invoice(
          response.clientId,
          response.invoicedDate,
          response.invoiceItems,
          response.orderNote,
          response.paymentMethod,
          response.amountPaid
        );
        this.invoiceItems = this.invoice.invoiceItems;
        this.populateInvoiceData();
        console.warn(this.invoiceItems);
        this.calculateTotalCosts(this.invoiceItems);
      }));
  }

  setClientName(event: any) {
    this.clientId = event.target.value;
    for(let client of this.clients){
      if(this.clientId == client.id){
        this.clientName = client.name;
      }
    }
  }

  setInvoice() {
    this._invoiceService.setInvoice(this.getInvoiceObj());
    this.closeClicked();
  }

  updateInvoice() {
    this._invoiceService.updateInvoice(this.getInvoiceObj());
    this.closeClicked();
  }

  getInvoiceObj(): Invoice {
    this.invoice = new Invoice(
      this.clientId,
      this.invoiceInputForm.get("invoicedDate").value,
      this.invoiceItems,
      this.invoiceInputForm.get("orderNote").value,
      this.invoiceInputForm.get("paymentMethod").value,
      this.invoiceInputForm.get("amountPaid").value
    );
    this.invoice.clientName = this.clientName;
    this.invoice.id = this.invoiceId;
    const bill = Object.assign({}, this.invoice);
    return bill;
  }

  deleteItem(invoiceItem: InvoiceItem) {
    const index: number = this.invoice.invoiceItems.indexOf(invoiceItem);
    if (index !== -1) {
      this.invoice.invoiceItems.splice(index, 1);
    }
  }

  editItem(invoiceItem: InvoiceItem) {
    const modalRef = this.modalService.open(InvoiceItemModalComponent, { size: 'lg', keyboard: true });
    if (invoiceItem) {
      modalRef.componentInstance.invoiceItem = invoiceItem
    }
    this.subscriptions.push(modalRef.componentInstance.editItemEvent.subscribe((response:InvoiceItem) => {
      this.invoiceItem = response;
      for (let invoiceItem of this.invoiceItems) {
        if (this.invoiceItem.itemId == invoiceItem.itemId) {
          const index: number = this.invoiceItems.indexOf(invoiceItem);
          this.invoiceItems[index] = this.invoiceItem;
          break;
        }
      }
      this.calculateTotalCosts(this.invoiceItems);
    }))
  }

  populateInvoiceData() {
    this.invoiceInputForm.setValue({
      clientId: this.invoice.clientId,
      invoicedDate: this.invoice.invoicedDate,
      orderNote: this.invoice.orderNote,
      amountPaid: this.invoice.amountPaid,
      paymentMethod: this.invoice.paymentMethod
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
