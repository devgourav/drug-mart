import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InvoiceItemModalComponent } from './invoiceItem-modal/invoiceItem-modal.component';

@NgModule({
	declarations: [ NewInvoiceComponent, InvoiceDetailsComponent, InvoiceItemModalComponent ],
	imports: [
		CommonModule,
		InvoiceRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		TableModule,
		SharedModule,
		ConfirmDialogModule,
		BrowserAnimationsModule,
		ToastModule,
		CalendarModule,
		MessagesModule,
		MessageModule
	],
	entryComponents: [ InvoiceItemModalComponent ]
})
export class InvoiceModule {}
