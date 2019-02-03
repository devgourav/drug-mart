import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BillDetailsComponent } from './bill-details/bill-details.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { BillRoutingModule } from './bill-routing.module';
import { ItemModalComponent } from './item-modal/item-modal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [BillDetailsComponent, NewBillComponent,ItemModalComponent],
  imports: [
    CommonModule,
    BillRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents: [
        ItemModalComponent,
    ],
})
export class BillModule { }
