import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemRoutingModule } from './item-routing.module';

@NgModule({
  declarations: [NewItemComponent, ItemDetailsComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ItemModule { }
