import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BillDetailsComponent } from './bill-details/bill-details.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { BillRoutingModule } from './bill-routing.module';
import { BillItemModalComponent } from './billItem-modal/billItem-modal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [BillDetailsComponent, NewBillComponent,BillItemModalComponent],
  imports: [
    CommonModule,
    BillRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents: [
        BillItemModalComponent,
    ],
})
export class BillModule { }
