import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BillItem } from '../../model/billItem.model';
import { NgbModalConfig, NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.scss'],
})
export class ItemModalComponent implements OnInit {

  billItemForm = new FormGroup({
    itemName: new FormControl(''),
    itemPackType: new FormControl(''),
    itemHSN: new FormControl(''),
    itemMfg: new FormControl(''),
    itemBatchNumber: new FormControl(''),
    itemExpiryDate: new FormControl(''),
    itemQuantity: new FormControl(''),
    itemRate: new FormControl(''),
    itemMRP: new FormControl(''),
    itemTax1: new FormControl(''),
    itemTax2: new FormControl(''),
    itemDiscount: new FormControl(''),
    itemOffer: new FormControl('')

  });

  public billItem: BillItem;

  constructor(config: NgbModalConfig, private modalService: NgbModal,
    private activeModal: NgbActiveModal) {
    this.billItem = new BillItem();
  }

  @Output() addItemEvent: EventEmitter<any> = new EventEmitter();



  addToItemList() {
    this.billItem = Object.assign({}, this.billItemForm.value);
    console.warn(this.billItem);
    this.addItemEvent.emit(this.billItem);
  }

  ngOnInit() {
  }


}
