import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BillDetailsComponent } from './bill-details/bill-details.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { BillRoutingModule } from './bill-routing.module';
import { BillItemModalComponent } from './billItem-modal/billItem-modal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/core/shared/shared.module';




@NgModule({
  declarations: [BillDetailsComponent, NewBillComponent,BillItemModalComponent],
  imports: [
    CommonModule,
    BillRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  entryComponents: [
        BillItemModalComponent,
    ],
})
export class BillModule { }
