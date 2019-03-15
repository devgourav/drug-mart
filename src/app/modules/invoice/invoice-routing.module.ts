import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { NewClientComponent } from '../client/new-client/new-client.component';

const routes: Routes = [
	{
		path: 'Invoice',
		component: InvoiceDetailsComponent
	},
	{
		path: 'Invoice/New Invoice',
		component: NewInvoiceComponent
	},
	{
		path: 'Invoices/New Invoice/:id',
		component: NewInvoiceComponent
	},
	{
		path: 'Invoices/New Invoice/New Invoice/New Client',
		component: NewClientComponent
	},
	{
		path: 'Invoices/New Invoice/:id/New Client',
		component: NewClientComponent
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class InvoiceRoutingModule {}
