import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BillItemModalComponent } from '../billItem-modal/billItem-modal.component';
import { Bill } from 'src/app/core/model/bill.model';
import { Amount } from 'src/app/core/model/amount.model';
import { BillService } from 'src/app/core/service/bill.service';
import { VendorService } from 'src/app/core/service/vendor.service';
import { BillItem } from 'src/app/core/model/billItem.model';
import { Vendor } from 'src/app/core/model/vendor.model';
import { OfferService } from 'src/app/core/service/offer.service';
import { Offer } from 'src/app/core/model/offer.model';

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
  vendorId: string = "";
  paymentSystems: string[] = ['Cash', 'Credit', 'Cheque', 'Bank Transfer'];

  vendors: Vendor[];
  // vendorId: string = "";
  vendorName: string = "";

  billInputForm = this.fb.group({
    vendorId: ['', Validators.required],
    billedDate: ['', Validators.required],
    orderNote: new FormControl(''),
    amountPaid: ['', Validators.required],
    paymentMethod: new FormControl(''),
    paymentRef: new FormControl('')
  });

  subAmount: number;
  taxAmount: number;
  discountAmount: number;
  offerAmount: number;
  totalAmount: number;
  taxRate: number;
  discountRate: number;
  offerRate: number;

  subAmountString: string = "";
  taxAmountString: string = "";
  discountAmountString: string = "";
  totalAmountString: string = "";



  constructor(private location: Location, private modalService: NgbModal,
    private _billService: BillService, private _vendorService: VendorService,
    private route: ActivatedRoute, private fb: FormBuilder,
    private _offerService: OfferService) {
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

  get billedDate() {
    return this.billInputForm.get('billedDate');
  }

  get amountPaid() {
    return this.billInputForm.get('amountPaid');
  }

  billTableHeaders = ['Particular', 'Manufacturer', 'Quantity', 'Rate', 'Amount',
    'Discount', 'Tax', 'Total', 'Offers', 'M.R.P', 'Actions']

  openItemModal() {
    const modalRef = this.modalService.open(BillItemModalComponent, { size: 'lg', keyboard: true });
    modalRef.componentInstance.addItemEvent.subscribe((response: BillItem) => {
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
      const billItem = Object.assign({}, this.billItem)
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
    return ((1 + (taxRate - discountRate) * 0.01) * this.getSubAmount(rate, qty)).toFixed(2);
  }

  getOfferDiscount(offer: number) {
    return offer.toFixed(2);
  }

  calculateTotalCosts(billItems: BillItem[]) {

    this.subAmount = this.taxAmount = this.discountAmount = this.offerAmount = this.totalAmount = this.taxRate
      = this.discountRate = this.offerRate = 0;

    for (let billItem of billItems) {
      this.taxRate = billItem.tax['stateTax'] + billItem.tax['countryTax'];
      this.discountRate = billItem.discount;
      this.offerRate = billItem.offer;

      const subRate = billItem.rate * billItem.quantity;
      this.subAmount += (subRate);
      this.taxAmount += (this.taxRate * 0.01 * subRate);
      this.offerAmount += (this.offerRate * 0.01 * subRate);
      this.discountAmount += (this.discountRate * 0.01 * subRate);
      this.totalAmount += subRate + this.taxAmount
        - (this.discountAmount + this.offerAmount);
    }
    this.subAmount = +this.subAmount.toFixed(2);
    this.taxAmount = +this.taxAmount.toFixed(2);
    this.offerAmount = +this.offerAmount.toFixed(2);
    this.discountAmount = +this.discountAmount.toFixed(2) + this.offerAmount;
    this.totalAmount = +this.totalAmount.toFixed(2);

    this.subAmountString = this.subAmount.toFixed(2);
    this.taxAmountString = this.taxAmount.toFixed(2);
    this.discountAmountString = (this.discountAmount + this.offerAmount).toFixed(2);
    this.totalAmountString = this.subAmount.toFixed(2);

  }

  openNewVendor() {
    // TODO: Route to NewVendorComponent
  }

  populateVendorDropDown() {
    this._vendorService.getVendors()
      .subscribe((response) => {
        this.vendors = response;
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
          response.amountPaid
        );
        this.bill.orderNote = response.orderNote;
        this.bill.paymentMethod = response.paymentMethod;
        this.bill.paymentRef = response.paymentRef,

          this.billItems = this.bill.billItems;

        this.billInputForm.patchValue({
          vendorId: this.bill.vendorId,
          billedDate: this.bill.billedDate,
          orderNote: this.bill.orderNote,
          amountPaid: this.bill.amountPaid,
          paymentMethod: this.bill.paymentMethod
        });

        this.calculateTotalCosts(this.billItems);
      })
  }

  setVendorName(event: any) {
    this.vendorId = event.target.value;
    for (let vendor of this.vendors) {
      if (this.vendorId == vendor.id) {
        this.vendorName = vendor.name;
      }
    }

  }

  setBill() {
    this._billService.setBill(this.getBillObj());
    this.closeClicked();
  }

  updateBill() {
    this._billService.updateBill(this.getBillObj());
    this.closeClicked();
  }

  getBillObj(): Bill {
    this.bill = new Bill(
      this.vendorId,
      this.billItems,
      this.billInputForm.get("billedDate").value,
      this.billInputForm.get("amountPaid").value,
    );

    this.bill.paymentMethod = this.billInputForm.get("paymentMethod").value;
    this.bill.paymentRef = this.billInputForm.get("paymentRef").value;
    this.bill.orderNote = this.billInputForm.get("orderNote").value;


    this.bill.vendorName = this.vendorName;
    this.bill.id = this.billId;
    const bill = Object.assign({}, this.bill);
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
    modalRef.componentInstance.editItemEvent.subscribe((response: BillItem) => {
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
}
