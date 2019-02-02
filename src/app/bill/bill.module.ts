import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { NewBillComponent } from './new-bill/new-bill.component';

import { BillRoutingModule } from './bill-routing.module';
import { ItemModalComponent } from './item-modal/item-modal.component';



@NgModule({
  declarations: [BillDetailsComponent, NewBillComponent,ItemModalComponent],
  imports: [
    CommonModule,
    BillRoutingModule,
  ]
})
export class BillModule { }
