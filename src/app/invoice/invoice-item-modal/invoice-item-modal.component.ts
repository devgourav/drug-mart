import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { InvoiceItem } from '../../model/invoice.model';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../../service/item.service';
import { Item } from 'src/app/model/item.model';




@Component({
  selector: 'item-modal',
  templateUrl: './invoice-item-modal.component.html',
  styleUrls: ['./invoice-item-modal.component.scss'],
})
export class InvoiceItemModalComponent implements OnInit {

  @Input() invoiceItem: InvoiceItem = new InvoiceItem();
  @Output() addItemEvent: EventEmitter<InvoiceItem> = new EventEmitter();
  @Output() editItemEvent: EventEmitter<InvoiceItem> = new EventEmitter();

  items: Item[] = [];
  item: Item = new Item();
  itemId: string = "";

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


  constructor(private modalService: NgbModal,
    private activeModal: NgbActiveModal, private _itemService: ItemService) {
  }

  ngOnInit() {
    this.populateItemDropdown();
    if (this.invoiceItem.itemName!="" && this.invoiceItem.itemName!=null) {
      console.warn("InvoiceItem:" + this.invoiceItem);
      this.populateInvoiceItem();
    }
  }

  addInvoiceItem() {
    this.invoiceItem = Object.assign({}, this.invoiceItemForm.value);
    console.warn(this.invoiceItem);
    this.addItemEvent.emit(this.invoiceItem);
  }

  editInvoiceItem() {
    this.invoiceItem = Object.assign({}, this.invoiceItemForm.value);
    console.warn(this.invoiceItem);
    this.editItemEvent.emit(this.invoiceItem);
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
      stateTax: +this.invoiceItem.stateTax,
      countryTax: +this.invoiceItem.countryTax,
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

  populateItemModal(event: any){
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





}
