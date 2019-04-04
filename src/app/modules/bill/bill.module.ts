import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillDetailsComponent } from './bill-details/bill-details.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { BillRoutingModule } from './bill-routing.module';
import { BillItemModalComponent } from './billItem-modal/billItem-modal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';

import { SharedModule } from 'src/app/core/shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
	declarations: [ BillDetailsComponent, NewBillComponent, BillItemModalComponent ],
	imports: [
		CommonModule,
		BillRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		TableModule,
		SharedModule,
		ConfirmDialogModule,
		BrowserAnimationsModule,
		ToastModule,
		CalendarModule,
		TooltipModule,
		MessagesModule,
		MessageModule
	],
	entryComponents: [ BillItemModalComponent ]
})
export class BillModule {}
