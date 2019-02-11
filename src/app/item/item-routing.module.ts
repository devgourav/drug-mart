import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemDetailsComponent } from './item-details/item-details.component'
import { NewItemComponent } from './new-item/new-item.component';


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
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ItemRoutingModule { }
