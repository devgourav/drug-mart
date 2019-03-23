import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceItemModalComponent } from './invoice-item-modal/invoice-item-modal.component';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/core/shared/shared.module';

@NgModule({
	declarations: [ NewInvoiceComponent, InvoiceDetailsComponent, InvoiceItemModalComponent ],
	imports: [ CommonModule, InvoiceRoutingModule, FormsModule, ReactiveFormsModule, TableModule, SharedModule ],
	entryComponents: [ InvoiceItemModalComponent ]
})
export class InvoiceModule {}
