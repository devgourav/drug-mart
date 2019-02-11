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

// TODO: Add A save/Update prompt



@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit {

  bill: Bill;
  billItems: BillItem[] = [];
  billId: string;
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
  defaultVendorId: string;

  constructor(private location: Location,private modalService: NgbModal,
    private _billService: BillService,private _vendorService: VendorService,
    private route: ActivatedRoute) {
    this.bill = new Bill();
    this.billId = "";
    this.billItem = new BillItem();
    this.itemTax = 0;
    this.itemAmount = 0;
    this.discountAmount = 0;

    this.subTotalAmount = 0;
    this.totalTax = 0;
    this.totalDiscount = 0;
    this.netAmount = 0;
    this.vendors=[];
    this.defaultVendorId = "";
  }
  ngOnInit() {
    this.populateVendorDropDown();
    this.route.paramMap.subscribe(params => {
      this.billId = params.get('id');
      if(this.billId){
        this.getBill(params.get('id'));
      }
    });
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

  editItemModal(billItem: BillItem) {
    const modalRef = this.modalService.open(ItemModalComponent,{size: 'lg',keyboard: true});
    if(billItem){
      modalRef.componentInstance.billItem = billItem
    }
    modalRef.componentInstance.editItemEvent.subscribe((response) => {
      this.billItem = response;
      //// TODO: Use Itm id
      this.calculateItemCosts();
      this.calculateTotalCosts();
    });
  }

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
    this._vendorService.getVendors()
    .subscribe((response)=>{
      this.vendors = response;
    })
  }

  closeClicked(){
    this.location.back();
  }

  getBill(billId: string){
    this._billService.getBillById(billId)
    .subscribe((response) => {
      this.bill = response;
      this.billItems = this.bill.billItems;
      this.populateBillData();
      console.log(this.bill);
    })
  }

  setBill(){
    this.bill = Object.assign({}, this.billInputForm.value);
    this.bill.billItems = this.billItems;
    this._billService.setBill(this.bill)
    .subscribe((response)=> {
      this.location.back()
    });

  }

  deleteItem(billItem: BillItem){
    const index: number = this.bill.billItems.indexOf(billItem);
    if(index !== -1){
      this.bill.billItems.splice(index,1);
    }
  }

  editItem(billItem: BillItem){
    this.editItemModal(billItem);
  }

  populateBillData(){
    this.billInputForm.setValue({
      vendorName:this.bill.vendorName,
      billedDate:this.bill.billedDate,
      orderNote:this.bill.orderNote,
      amountPaid:this.bill.amountPaid,
      paymentMethod:this.bill.paymentMethod
    });
  }
}
