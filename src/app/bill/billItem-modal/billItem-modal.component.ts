import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BillItem } from '../../model/bill.model';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../../service/item.service';
import { Item } from 'src/app/model/item.model';




@Component({
  selector: 'item-modal',
  templateUrl: './billItem-modal.component.html',
  styleUrls: ['./billItem-modal.component.scss'],
})
export class BillItemModalComponent implements OnInit {

  @Input() billItem: BillItem = new BillItem();
  @Output() addItemEvent: EventEmitter<BillItem> = new EventEmitter();
  @Output() editItemEvent: EventEmitter<BillItem> = new EventEmitter();

  items: Item[] = [];
  item: Item = new Item();
  itemId: string = "";

  billItemForm = new FormGroup({
    itemName: new FormControl(''),
    itemId: new FormControl(''),
    packType: new FormControl(''),
    itemHSN: new FormControl(''),
    manufacturer: new FormControl(''),
    batchNumber: new FormControl(''),
    expiryDate: new FormControl(''),
    quantity: new FormControl(''),
    rate: new FormControl(''),
    itemMRP: new FormControl(''),
    stateTax: new FormControl(''),
    countryTax: new FormControl(''),
    discount: new FormControl(''),
    offer: new FormControl('')

  });


  constructor(private modalService: NgbModal,
    private activeModal: NgbActiveModal, private _itemService: ItemService) {
  }

  ngOnInit() {
    this.populateItemDropdown();
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
      itemId: this.billItem.itemId,
      packType: this.billItem.packType,
      itemHSN: this.billItem.itemHSN,
      manufacturer: this.billItem.manufacturer,
      batchNumber: this.billItem.batchNumber,
      expiryDate: this.billItem.expiryDate,
      quantity: this.billItem.quantity,
      rate: this.billItem.rate,
      itemMRP: this.billItem.itemMRP,
      stateTax: +this.billItem.stateTax,
      countryTax: +this.billItem.countryTax,
      discount: this.billItem.discount,
      offer: this.billItem.offer
    });
  }

  populateItemDropdown(){
    this._itemService.getItems()
    .subscribe((response)=>{
      this.items = response;
    })
  }

  populateItemModal(event: any){
    this.itemId = event.target.value;
    for(let item of this.items){
      if(item.id == this.itemId){
        this.item = item;
      }
    }
    this.billItemForm.setValue({
      itemName: this.item.name,
      itemId:this.item.id,
      packType: this.item.packType,
      itemHSN: this.item.HSNCode,
      manufacturer: this.item.manufacturer,
      itemMRP: this.item.itemMRP,
      batchNumber: "",
      expiryDate: "",
      quantity: null,
      rate: this.item.saleCost,
      stateTax: null,
      countryTax: null,
      discount: null,
      offer: ""
    });
  }





}
