import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiptDetailsComponent } from './receipt-details/receipt-details.component';
import { NewReceiptComponent } from './new-receipt/new-receipt.component';
import { ReceiptPrintComponent } from './receipt-print/receipt-print.component';

const routes: Routes = [
	{
		path: 'Receipts',
		component: ReceiptDetailsComponent
	},
	{
		path: 'Receipts/New Receipt',
		component: NewReceiptComponent
	},
	{
		path: 'Receipts/Print Receipt/:id',
		component: ReceiptPrintComponent
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class ReceiptRoutingModule {}
