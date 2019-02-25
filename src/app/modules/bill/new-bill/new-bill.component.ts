import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { BillItemModalComponent } from '../billItem-modal/billItem-modal.component';
import { Bill } from 'src/app/core/model/bill.model';
import { Vendor } from 'src/app/core/model/vendor.model';
import { Amount } from 'src/app/core/model/amount.model';
import { BillService } from 'src/app/core/service/bill.service';
import { VendorService } from 'src/app/core/service/vendor.service';
import { BillItem } from 'src/app/core/model/billItem.model';

// TODO: Add A save/Update prompt


@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit {

  bill: Bill;
  billItems: BillItem[] = [];
  billItem: BillItem;

  billId: string = "";
  netAmount: Amount = new Amount();
  taxRate: number;
  discountRate: number;

  vendorNameMaps: Map<string,string>[] = [];
  vendorNameMap: Map<string,string> = new Map();


  constructor(private location: Location, private modalService: NgbModal,
    private _billService: BillService, private _vendorService: VendorService,
    private route: ActivatedRoute) {
    this.netAmount = new Amount();
  }


  ngOnInit() {
    this.populateVendorDropDown();
    this.route.paramMap.subscribe(params => {
      this.billId = params.get('id');
      if (this.billId) {
        this.getBill(params.get('id'));
      }
    });
  }

  billInputForm = new FormGroup({
    vendorId: new FormControl(''),
    billedDate: new FormControl(''),
    orderNote: new FormControl(''),
    amountPaid: new FormControl(''),
    paymentMethod: new FormControl('')
  });

  billTableHeaders = ['Particular', 'Manufacturer', 'Quantity', 'Rate', 'Amount',
    'Discount', 'Tax', 'Total', 'Offers', 'M.R.P', 'Actions']

  openItemModal() {
    const modalRef = this.modalService.open(BillItemModalComponent, { size: 'lg', keyboard: true });
    modalRef.componentInstance.addItemEvent.subscribe((response:BillItem) => {
      this.billItem = new BillItem(
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
      const billItem = Object.assign({},this.billItem)
      this.billItems.push(billItem);
      this.calculateTotalCosts(this.billItems);
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

  calculateTotalCosts(billItems: BillItem[]) {
    this.netAmount = new Amount();
    this.taxRate = this.discountRate = 0;

    for (let billItem of billItems) {
      console.log(billItem);
      this.taxRate = billItem.tax['stateTax'] + billItem.tax['countryTax'];
      this.discountRate = billItem.discount;

      this.netAmount.subAmount += (billItem.rate * billItem.quantity);
      this.netAmount.taxAmount += (this.taxRate * 0.01 * this.netAmount.subAmount);
      this.netAmount.discountAmount += (this.discountRate * 0.01 * this.netAmount.subAmount);
      this.netAmount.totalAmount += this.netAmount.subAmount + this.netAmount.taxAmount
        - this.netAmount.discountAmount;

    }
  }

  openNewVendor() {
    // TODO: Route to NewVendorComponent
  }

  populateVendorDropDown() {
    this._vendorService.getVendors()
      .subscribe((response) => {
        response.forEach((vendor,index)=>{
          this.vendorNameMap.set("id",vendor.id);
          this.vendorNameMap.set("name",vendor.name);
          this.vendorNameMaps.push(this.vendorNameMap);
        })
        console.log(this.vendorNameMaps);
      });
  }

  closeClicked() {
    this.location.back();
  }

  getBill(billId: string) {
    this._billService.getBillById(billId)
      .subscribe((response) => {
        this.bill = new Bill(
          response.vendorId,
          response.billItems,
          response.billedDate,
          response.orderNote,
          response.paymentMethod,
          response.amountPaid
        );
        console.log(this.bill);
        this.billItems = this.bill.billItems;
        this.populateBillData();
        this.calculateTotalCosts(this.billItems);
      })
  }

  setVendorName(event: any) {
    this.vendorNameMap.set("id",event.target.value);
    // this.vendorNameMap.set("name",event.target.value) ;

  }

  setBill() {
    this._billService.setBill(this.getBillObj());
    this.closeClicked();
  }

  updateBill() {
    this._billService.updateBill(this.getBillObj());
    this.closeClicked();
  }

  getBillObj():Bill{
    this.bill = new Bill(
      this.billInputForm.get("vendorId").value,
      this.billItems,
      this.billInputForm.get("billedDate").value,
      this.billInputForm.get("orderNote").value,
      this.billInputForm.get("paymentMethod").value,
      this.billInputForm.get("amountPaid").value
    );
    this.bill.id = this.billId;
    const bill = Object.assign({},this.bill);
    return bill;
  }

  deleteItem(billItem: BillItem) {
    const index: number = this.billItems.indexOf(billItem);
    if (index !== -1) {
      this.billItems.splice(index, 1);
    }
  }

  editItem(billItem: BillItem) {
    const modalRef = this.modalService.open(BillItemModalComponent, { size: 'lg', keyboard: true });
    if (billItem) {
      modalRef.componentInstance.billItem = billItem
    }
    modalRef.componentInstance.editItemEvent.subscribe((response) => {
      this.billItem = response;
      for (let billItem of this.billItems) {
        if (this.billItem.itemId == billItem.itemId) {
          const index: number = this.billItems.indexOf(billItem);
          this.billItems[index] = this.billItem;
          break;
        }
      }
      this.calculateTotalCosts(this.billItems);
    });
  }

  populateBillData() {
    this.billInputForm.setValue({
      vendorId: this.bill.vendorId,
      billedDate: this.bill.billedDate,
      orderNote: this.bill.orderNote,
      amountPaid: this.bill.amountPaid,
      paymentMethod: this.bill.paymentMethod
    });
  }
}
