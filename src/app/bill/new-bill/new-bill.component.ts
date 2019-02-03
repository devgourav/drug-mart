import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { BillItem } from '../../model/billItem.model';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';





@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent implements OnInit {

  billItemList: BillItem[];
  billItem: BillItem

  constructor(private modalService: NgbModal) {
    this.billItem = new BillItem();
    this.billItemList = [];
  }
  ngOnInit() { }




  billInputForm = new FormGroup({
    billVendorName: new FormControl(''),
    billDate: new FormControl(''),
    orderNote: new FormControl(''),
    billAmountPaid: new FormControl(''),
    paymentMethod: new FormControl('')
  });

  billTableHeaders = ['Particular', 'Manufacturer', 'Quantity', 'Rate', 'Tax',
    'Discount', 'Offers', 'Amount', 'M.R.P']

  openItemModal() {
    const modalRef = this.modalService.open(ItemModalComponent,{size: 'lg',keyboard: true});

    modalRef.componentInstance.addItemEvent.subscribe((billItem) => {
      // console.log(billItem);
      this.billItem = billItem;
      this.billItemList.push(this.billItem);
      // console.log(this.billItem);
    });
  }
}
