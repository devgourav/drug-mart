import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Item } from 'src/app/core/model/item.model';
import { ItemService } from 'src/app/core/service/item.service';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BillItem } from 'src/app/core/model/billItem.model';
import { TaxService } from 'src/app/core/service/tax.service';
import { Tax } from 'src/app/core/model/tax.model';



@Component({
  selector: 'item-modal',
  templateUrl: './billItem-modal.component.html',
  styleUrls: ['./billItem-modal.component.scss'],
})
export class BillItemModalComponent implements OnInit {

  @Input() billItem: BillItem;
  @Output() addItemEvent: EventEmitter<BillItem> = new EventEmitter();
  @Output() editItemEvent: EventEmitter<BillItem> = new EventEmitter();

  items: Item[] = [];
  item: Item;
  taxes: Tax[];
  itemId: string = "";
  taxMap: Map<string,number>;

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


  constructor(private modalService: NgbModal,private activeModal: NgbActiveModal,
    private _itemService: ItemService,private _taxService: TaxService) {
  }

  ngOnInit() {
    this.fetchTaxDetails();
    this.populateItemDropdown();
    if (this.billItem) {
      console.warn("BillItem:" + this.billItem);
      this.populateBillItem();
    }
  }

  addBillItem() {
    this.addItemEvent.emit(this.getBillItemObj());
  }

  editBillItem() {
    this.editItemEvent.emit(this.getBillItemObj());
  }

  getBillItemObj():BillItem{
    this.taxMap = new Map();
    this.taxMap.set("stateTax",+this.billItemForm.get("stateTax").value);
    this.taxMap.set("countryTax",+this.billItemForm.get("countryTax").value);

    const taxMap = this.convertMapToObject(this.taxMap);

    this.billItem = new BillItem(
      this.billItemForm.get("itemId").value,
      this.billItemForm.get("itemName").value,
      this.billItemForm.get("packType").value,
      this.billItemForm.get("itemHSN").value,
      this.billItemForm.get("manufacturer").value,
      this.billItemForm.get("batchNumber").value,
      this.billItemForm.get("expiryDate").value,
      this.billItemForm.get("quantity").value,
      this.billItemForm.get("rate").value,
      this.billItemForm.get("itemMRP").value,
      taxMap,
      this.billItemForm.get("discount").value,
      this.billItemForm.get("offer").value
    );
    const billItem = Object.assign({}, this.billItem);
    return billItem;
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
      stateTax: this.billItem.tax["stateTax"],
      countryTax: this.billItem.tax["countryTax"],
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

  populateOnItemSelectEvent(event: any){
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
      batchNumber: this.item.batchNumber,
      expiryDate: "",
      quantity: null,
      rate: this.item.saleCost,
      stateTax: null,
      countryTax: null,
      discount: null,
      offer: ""
    });
  }

  fetchTaxDetails(){
    this._taxService.getTaxes()
      .subscribe((response) => {
        this.taxes = response;
      });
  }

  convertMapToObject(map: Map<any,any>):Map<any,any>{
    let objectMap = Object.create(null);
    for(let[k,v] of map){
      objectMap[k]=v;
    }
    return objectMap;
  }





}
