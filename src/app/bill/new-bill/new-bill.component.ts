import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BillItem,Bill } from '../../model/billItem.model';
import { Vendor } from '../../model/vendor.model';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillService } from '../../service/bill.service';
import { VendorService } from '../../service/vendor.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit {

  bill: Bill;
  billItems: BillItem[] = [];
  itemTax: number;
  itemAmount: number;
  discountAmount: number;

  subTotalAmount: number;
  totalTax: number;
  totalDiscount: number;
  netAmount: number;
  vendors: Vendor[];


  response: any;
  billItem: BillItem;

  constructor(private location: Location,private modalService: NgbModal,
    private _billService: BillService,private _vendorService: VendorService,
    private route: ActivatedRoute) {
    this.bill = new Bill();
    this.billItem = new BillItem();
    this.itemTax = 0;
    this.itemAmount = 0;
    this.discountAmount = 0;

    this.subTotalAmount = 0;
    this.totalTax = 0;
    this.totalDiscount = 0;
    this.netAmount = 0;
    this.vendors=[];
  }
  ngOnInit() {
    this.populateVendorDropDown();
  }

  billInputForm = new FormGroup({
    vendorName: new FormControl(''),
    billedDate: new FormControl(''),
    orderNote: new FormControl(''),
    amountPaid: new FormControl(''),
    paymentMethod: new FormControl('')
  });

  billTableHeaders = ['Particular', 'Manufacturer', 'Quantity', 'Rate', 'Amount',
    'Discount', 'Tax','Offers','M.R.P','Actions']

  openItemModal() {
    const modalRef = this.modalService.open(ItemModalComponent,{size: 'lg',keyboard: true});
    modalRef.componentInstance.addItemEvent.subscribe((response) => {
      this.billItem = response;
      this.billItems.push(this.billItem);
      this.calculateItemCosts();
      this.calculateTotalCosts();
    });
  }

  saveBill(){
    this.bill = Object.assign({}, this.billInputForm.value);
    this.bill.billItems = this.billItems;
    this._billService.setBill(this.bill);
    this.location.back();
  }

  calculateItemCosts(){
    this.itemAmount = (this.billItem.rate*1*this.billItem.quantity*1);
    this.itemTax = (this.billItem.tax1*1 + this.billItem.tax2*1)*0.01*this.itemAmount;
    this.discountAmount = this.billItem.discount*0.01*this.itemAmount;
  }

  calculateTotalCosts(){
    for(let billItem of this.billItems){
      this.itemAmount = 0;
      this.itemTax = 0;
      this.discountAmount = 0;

      this.itemAmount = (billItem.rate*1*billItem.quantity*1);
      this.itemTax = (this.billItem.tax1*1 + this.billItem.tax2*1)*0.01*this.itemAmount;
      this.discountAmount = this.billItem.discount*0.01*this.itemAmount;

      this.subTotalAmount += this.itemAmount;
      this.totalTax += this.itemTax;
      this.totalDiscount += this.discountAmount;
      this.netAmount += this.subTotalAmount + this.totalTax - this.totalDiscount;

    }
  }

  populateVendorDropDown(){
    this.vendors = this._vendorService.getVendors();
    console.warn(this.vendors);
    for(let vendor of this.vendors){
      console.warn(vendor.name);
    }
  }

  closeClicked(){
    this.location.back();
  }
}
