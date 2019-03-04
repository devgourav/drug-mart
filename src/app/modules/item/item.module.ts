import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemRoutingModule } from './item-routing.module';
import { SharedModule } from 'src/app/core/shared/shared.module';

@NgModule({
  declarations: [NewItemComponent, ItemDetailsComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[]
})
export class ItemModule { }
