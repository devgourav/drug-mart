import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewInvoiceComponent, InvoiceDetailsComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    ReactiveFormsModule
  ]
})
export class InvoiceModule { }
