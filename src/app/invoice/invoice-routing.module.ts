import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component'
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';

const routes: Routes = [
	{
		path:'Invoice',
		component: InvoiceDetailsComponent
	},
	{
		path:'Invoice/New Invoice',
		component: NewInvoiceComponent
	},
	{
		path:'Invoice/New Invoice/:id',
		component: NewInvoiceComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
