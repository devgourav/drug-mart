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

  billItem: BillItem;

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

  @Output() addItemEvent: EventEmitter<BillItem> = new EventEmitter();



  addToItemList() {
    this.billItem = Object.assign({}, this.billItemForm.value);
    console.warn(this.billItem);
    this.addItemEvent.emit(this.billItem);
  }

  ngOnInit() {
  }


}
