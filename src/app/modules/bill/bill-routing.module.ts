import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillDetailsComponent } from './bill-details/bill-details.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { NewVendorComponent } from '../vendor/new-vendor/new-vendor.component';

const routes: Routes = [
	{
		path: 'Bills',
		component: BillDetailsComponent
	},
	{
		path: 'Bills/New Bill',
		component: NewBillComponent
	},
	{
		path: 'Bills/New Bill/:id',
		component: NewBillComponent
	},
	{
		path: 'Bills/New Bill/New Vendor/New Vendor',
		component: NewVendorComponent
	},
	{
		path: 'Bills/New Bill/:id/New Vendor',
		component: NewVendorComponent
	}
];

//TODO: Run my function
@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class BillRoutingModule {}
