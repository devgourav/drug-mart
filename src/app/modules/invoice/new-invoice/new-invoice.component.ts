import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InvoiceItemModalComponent } from '../invoice-item-modal/invoice-item-modal.component';
import { Invoice, InvoiceItem } from 'src/app/core/model/invoice.model';
import { Client } from 'src/app/core/model/client.model';
import { Amount } from 'src/app/core/model/amount.model';
import { InvoiceService } from 'src/app/core/service/invoice.service';
import { ClientService } from 'src/app/core/service/client.service';


// TODO: Add A save/Update prompt



@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss']
})
export class NewInvoiceComponent implements OnInit {

  invoice: Invoice = new Invoice();
  invoiceItems: Array<InvoiceItem> = new Array<InvoiceItem>();
  invoiceItem: InvoiceItem = new InvoiceItem();
  clients: Client[] = [];

  invoiceId: string = "";
  netAmount: Amount = new Amount();
  taxRate: number;
  discountRate: number;
  response: any;
  subClient = {clientId:"",clientName: ""};

  constructor(private location: Location, private modalService: NgbModal,
    private _invoiceService: InvoiceService, private _clientService: ClientService,
    private route: ActivatedRoute) {
    this.netAmount = new Amount();
  }
  ngOnInit() {
    this.populateClientDropDown();
    this.route.paramMap.subscribe(params => {
      this.invoiceId = params.get('id');
      if (this.invoiceId) {
        this.getInvoice(params.get('id'));
      }
    });
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
    modalRef.componentInstance.addItemEvent.subscribe((response) => {
      this.invoiceItem = response;
      this.invoiceItems.push(this.invoiceItem);
      this.calculateTotalCosts(this.invoiceItems);
    });
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
      this.taxRate = invoiceItem.stateTax + invoiceItem.countryTax;
      this.discountRate = invoiceItem.discount;

      this.netAmount.subAmount += (invoiceItem.rate * invoiceItem.quantity);
      this.netAmount.taxAmount += (this.taxRate * 0.01 * this.netAmount.subAmount);
      this.netAmount.discountAmount += (this.discountRate * 0.01 * this.netAmount.subAmount);
      this.netAmount.totalAmount += this.netAmount.subAmount + this.netAmount.taxAmount
        - this.netAmount.discountAmount;

    }
  }

  populateClientDropDown() {
    this._clientService.getClients()
      .subscribe((response) => {
        this.clients = response;
      })
  }

  closeClicked() {
    this.location.back();
  }

  getInvoice(invoiceId: string) {
    this._invoiceService.getInvoiceById(invoiceId)
      .subscribe((response) => {
        this.invoice = response;
        this.invoiceItems = this.invoice.invoiceItems;
        this.populateInvoiceData();
        console.warn(this.invoiceItems);
        this.calculateTotalCosts(this.invoiceItems);
      })
  }

  setClientName(event: any){
    this.subClient.clientId = event.target.value;
    this._clientService.getClientById(this.subClient.clientId)
    .subscribe((response)=>{
      this.subClient.clientName = response.name;
    })
  }

  setInvoice() {
    this.invoice = Object.assign({}, this.invoiceInputForm.value,this.subClient);
    this.invoice.invoiceItems = this.invoiceItems;
    this._invoiceService.setInvoice(this.invoice)
      .subscribe((response) => {
        this.location.back()
      });
  }

  updateInvoice() {
    this.invoice = Object.assign({}, this.invoiceInputForm.value,this.subClient);
    this.invoice.invoiceItems = this.invoiceItems;
    this.invoice.id = this.invoiceId;
    this._invoiceService.updateInvoice(this.invoice)
      .subscribe((response) => {
        this.location.back()
      });
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
    modalRef.componentInstance.editItemEvent.subscribe((response) => {
      this.invoiceItem = response;
      for (let invoiceItem of this.invoiceItems) {
        if (this.invoiceItem.itemId == invoiceItem.itemId) {
          const index: number = this.invoiceItems.indexOf(invoiceItem);
          // if (index !== -1) {
          //   this.invoiceItems.splice(index, 1);
          //   this.invoiceItems.push(this.invoiceItem);
          // }
          this.invoiceItems[index] = this.invoiceItem;
          break;
        }
      }
      this.calculateTotalCosts(this.invoiceItems);
    });
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
}
