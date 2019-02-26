import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/core/model/item.model';
import { ItemService } from 'src/app/core/service/item.service';
import { InvoiceItem } from 'src/app/core/model/invoiceItem.model';
import { TaxService } from 'src/app/core/service/tax.service';
import { Tax } from 'src/app/core/model/tax.model';




@Component({
  selector: 'item-modal',
  templateUrl: './invoice-item-modal.component.html',
  styleUrls: ['./invoice-item-modal.component.scss'],
})
export class InvoiceItemModalComponent implements OnInit {

  @Input() invoiceItem: InvoiceItem;
  @Output() addItemEvent: EventEmitter<InvoiceItem> = new EventEmitter();
  @Output() editItemEvent: EventEmitter<InvoiceItem> = new EventEmitter();

  items: Item[] = [];
  item: Item;
  itemId: string = "";
  taxMap: Map<string,number>;
  taxes: Tax[];

  invoiceItemForm = new FormGroup({
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
    if (this.invoiceItem) {
      console.warn("InvoiceItem:" + this.invoiceItem);
      this.populateInvoiceItem();
    }
  }

  addInvoiceItem() {
    this.addItemEvent.emit(this.getBillItemObj());
  }

  editInvoiceItem() {
    this.editItemEvent.emit(this.getBillItemObj());
  }

  getBillItemObj():InvoiceItem{
    this.taxMap = new Map();
    this.taxMap.set("stateTax",+this.invoiceItemForm.get("stateTax").value);
    this.taxMap.set("countryTax",+this.invoiceItemForm.get("countryTax").value);

    const taxMap = this.convertMapToObject(this.taxMap);

    this.invoiceItem = new InvoiceItem(
      this.invoiceItemForm.get("itemId").value,
      this.invoiceItemForm.get("itemName").value,
      this.invoiceItemForm.get("packType").value,
      this.invoiceItemForm.get("itemHSN").value,
      this.invoiceItemForm.get("manufacturer").value,
      this.invoiceItemForm.get("batchNumber").value,
      this.invoiceItemForm.get("expiryDate").value,
      this.invoiceItemForm.get("quantity").value,
      this.invoiceItemForm.get("rate").value,
      this.invoiceItemForm.get("itemMRP").value,
      taxMap,
      this.invoiceItemForm.get("discount").value,
      this.invoiceItemForm.get("offer").value
    );
    const billItem = Object.assign({}, this.invoiceItem);
    return billItem;
  }

  populateInvoiceItem() {
    this.invoiceItemForm.setValue({
      itemName: this.invoiceItem.itemName,
      itemId: this.invoiceItem.itemId,
      packType: this.invoiceItem.packType,
      itemHSN: this.invoiceItem.itemHSN,
      manufacturer: this.invoiceItem.manufacturer,
      batchNumber: this.invoiceItem.batchNumber,
      expiryDate: this.invoiceItem.expiryDate,
      quantity: this.invoiceItem.quantity,
      rate: this.invoiceItem.rate,
      itemMRP: this.invoiceItem.itemMRP,
      stateTax: +this.invoiceItem.tax["stateTax"],
      countryTax: +this.invoiceItem.tax["countryTax"],
      discount: this.invoiceItem.discount,
      offer: this.invoiceItem.offer
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
    this.invoiceItemForm.setValue({
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
