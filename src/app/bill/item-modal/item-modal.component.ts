import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BillItem } from '../../model/billItem.model';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss'],
})
export class ItemModalComponent implements OnInit {

  @Input() billItem: BillItem;
  @Output() addItemEvent: EventEmitter<BillItem> = new EventEmitter();
  @Output() editItemEvent: EventEmitter<BillItem> = new EventEmitter();

  billItemForm = new FormGroup({
    itemName: new FormControl(''),
    packType: new FormControl(''),
    itemHSN: new FormControl(''),
    manufacturer: new FormControl(''),
    batchNumber: new FormControl(''),
    expiryDate: new FormControl(''),
    quantity: new FormControl(''),
    rate: new FormControl(''),
    itemMRP: new FormControl(''),
    tax1: new FormControl(''),
    tax2: new FormControl(''),
    discount: new FormControl(''),
    offer: new FormControl('')

  });


  constructor(private modalService: NgbModal,
    private activeModal: NgbActiveModal) {
    this.billItem = new BillItem();
  }

  ngOnInit() {
    if (this.billItem.itemName!="" && this.billItem.itemName!=null) {
      console.warn("BillItem:" + this.billItem);
      this.populateBillItem();
    }
  }

  addBillItem() {
    this.billItem = Object.assign({}, this.billItemForm.value);
    console.warn(this.billItem);
    this.addItemEvent.emit(this.billItem);
  }

  editBillItem() {
    this.billItem = Object.assign({}, this.billItemForm.value);
    console.warn(this.billItem);
    this.editItemEvent.emit(this.billItem);
  }

  populateBillItem() {
    this.billItemForm.setValue({
      itemName: this.billItem.itemName,
      packType: this.billItem.packType,
      itemHSN: this.billItem.itemHSN,
      manufacturer: this.billItem.manufacturer,
      batchNumber: this.billItem.batchNumber,
      expiryDate: this.billItem.expiryDate,
      quantity: this.billItem.quantity,
      rate: this.billItem.rate,
      itemMRP: this.billItem.itemMRP,
      tax1: this.billItem.tax1,
      tax2: this.billItem.tax2,
      discount: this.billItem.discount,
      offer: this.billItem.offer
    });

  }





}
