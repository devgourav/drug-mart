import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Item } from 'src/app/model/item.model';
import { ItemService } from 'src/app/service/item.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

// TODO: Add A save/Update prompt

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {
  item: Item;
  itemId: string;

  constructor(private location: Location,private _itemService: ItemService,
    private route: ActivatedRoute) {
      this.item = new Item();
      this.itemId = "";
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.itemId = params.get('id');
      if(this.itemId){
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
    purchaseCost: new FormControl(''),
    itemMRP: new FormControl(''),
    saleCost: new FormControl(''),
    saleDiscount: new FormControl(''),
    saleOffers: new FormControl('')

  });

  getItem(itemId: string){
    this._itemService.getItemById(itemId)
    .subscribe((response) => {
      this.item = response;
      this.populateItemData();
    })
  }

  populateItemData(){
    this.itemInputForm.setValue({
      name: this.item.name,
      description: this.item.description,
      manufacturer: this.item.manufacturer,
      packType: this.item.packType,
      quantity: this.item.quantity,
      HSNCode: this.item.HSNCode,
      purchaseCost: this.item.purchaseCost,
      saleCost: this.item.saleCost,
      itemMRP: this.item.itemMRP,
      saleDiscount: this.item.saleDiscount,
      saleOffers: this.item.saleOffers
    })
  }

  closeClicked(){
    this.location.back();
    this.itemInputForm.reset();
  }

  setItem(){
    this.item = Object.assign({}, this.itemInputForm.value);
    this._itemService.setItem(this.item)
    .subscribe((response)=> {
      this.location.back()
    });
  }

  updateItem(){
    this.item = Object.assign({}, this.itemInputForm.value);
    this.item.id = this.itemId;
    this._itemService.updateItem(this.item)
    .subscribe((response)=>{
      this.location.back()
    });
  }

}
