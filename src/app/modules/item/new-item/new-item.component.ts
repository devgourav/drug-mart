import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Item } from 'src/app/core/model/item.model';
import { ItemService } from 'src/app/core/service/item.service';

// TODO: Add A save/Update prompt

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {
  item: Item;
  itemId: string = "";
  itemMap: Map<string,string> = new Map();

  constructor(private location: Location, private _itemService: ItemService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id');
      if (this.itemId) {
        this.getItem(params.get('id'));
      }
    });
  }

  itemInputForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    manufacturer: new FormControl(''),
    packType: new FormControl(''),
    quantity: new FormControl(''),
    HSNCode: new FormControl(''),
    batchNumber: new FormControl(''),
    expiryDate: new FormControl(''),
    purchaseCost: new FormControl(''),
    itemMRP: new FormControl(''),
    saleCost: new FormControl(''),
    saleDiscount: new FormControl(''),
    saleOffers: new FormControl('')

  });

  getItem(itemId: string) {
    this._itemService.getItemById(itemId)
      .subscribe((response) => {
        this.item = new Item(
          response.name,
          response.quantity,
          response.description,
          response.HSNCode,
          response.batchNumber,
          response.expiryDate,
          response.packType,
          response.manufacturer,
          response.purchaseCost,
          response.itemMRP,
          response.saleCost,
          response.saleDiscount,
          response.saleOffers
        );
        console.log(new Date());
        console.log(response.expiryDate);
        this.populateItemData();
      })
  }

  populateItemData() {
    this.itemInputForm.setValue({
      name: this.item.name,
      description: this.item.description,
      manufacturer: this.item.manufacturer,
      packType: this.item.packType,
      quantity: this.item.quantity,
      HSNCode: this.item.HSNCode,
      batchNumber: this.item.batchNumber,
      expiryDate: this.item.expiryDate,
      purchaseCost: this.item.purchaseCost,
      saleCost: this.item.saleCost,
      itemMRP: this.item.itemMRP,
      saleDiscount: this.item.saleDiscount,
      saleOffers: this.item.saleOffers
    })
  }

  closeClicked() {
    this.location.back();
    this.itemInputForm.reset();
  }

  setItem() {
    this._itemService.setItem(this.getItemObj());
    this.closeClicked();
  }

  updateItem() {
    this._itemService.updateItem(this.getItemObj());
    this.closeClicked();

  }

  getItemObj(): Item {
    this.item = new Item(
      this.itemInputForm.get("name").value,
      this.itemInputForm.get("quantity").value,
      this.itemInputForm.get("description").value,
      this.itemInputForm.get("HSNCode").value,
      this.itemInputForm.get("batchNumber").value,
      this.itemInputForm.get("expiryDate").value,
      this.itemInputForm.get("packType").value,
      this.itemInputForm.get("manufacturer").value,
      this.itemInputForm.get("purchaseCost").value,
      this.itemInputForm.get("itemMRP").value,
      this.itemInputForm.get("saleCost").value,
      this.itemInputForm.get("saleDiscount").value,
      this.itemInputForm.get("saleOffers").value
    );
    this.item.id = this.itemId;
    if(this.itemId){
      this.item.modificationDate = new Date();
    }else{
      this.item.creationDate = new Date();
      this.item.modificationDate = new Date();
    }

    const item = Object.assign({}, this.item);
    return item;
  }

}
