import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceiptRoutingModule } from './receipt-routing.module';
import { ReceiptDetailsComponent } from './receipt-details/receipt-details.component';
import { NewReceiptComponent } from './new-receipt/new-receipt.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ReceiptPrintComponent } from './receipt-print/receipt-print.component';

@NgModule({
	declarations: [ ReceiptDetailsComponent, NewReceiptComponent, ReceiptPrintComponent ],
	imports: [
		CommonModule,
		ReceiptRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		TableModule,
		SharedModule,
		CalendarModule,
		ConfirmDialogModule,
		BrowserAnimationsModule,
		ToastModule,
		MessagesModule,
		MessageModule
	]
})
export class ReceiptModule {}
