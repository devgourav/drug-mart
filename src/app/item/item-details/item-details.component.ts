import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item.model';
import { ItemService } from 'src/app/service/item.service';
import { Router } from '@angular/router';

const confirmMsg = "Do you want to delete this Item?";


@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  items: Item[] = [];

  constructor(private _itemService: ItemService,
    private router: Router) {
  }

  itemDetailsTableHeaders = ['Name', 'Manufacturer', 'HSN Code', 'Pack Type', 'Purchase Cost',
    'Min. Sale Cost', 'Quantity', 'Actions'];

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this._itemService.getItems()
      .subscribe((response) => {
        this.items = response;
      })
    console.log("ItemList:" + this.items);
  }

  deleteItem(itemId: string) {
    if (confirm(confirmMsg)) {
      this._itemService.deleteItem(itemId)
        .subscribe(() => {
          this.getItems();
        });

    }
  }

  editItem(itemId: string) {
    this.router.navigate(['Items/New Item', itemId]);
  }

}
