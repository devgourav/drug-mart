import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemDetailsComponent } from './item-details/item-details.component'
import { NewItemComponent } from './new-item/new-item.component';
import { ItemPricelistComponent } from './item-pricelist/item-pricelist.component';


const routes: Routes = [
	{
		path: 'Items',
		component: ItemDetailsComponent
	},
	{
		path: 'Items/New Item',
		component: NewItemComponent
	},
	{
		path: 'Items/New Item/:id',
		component: NewItemComponent
	},
	{
		path: 'Items/Price List',
		component: ItemPricelistComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ItemRoutingModule { }
