import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorDetailsComponent} from './vendor-details/vendor-details.component'
import { NewVendorComponent } from './new-vendor/new-vendor.component';


const routes: Routes = [
	{
		path:'Vendors',
		component: VendorDetailsComponent
	},
	{
		path:'Vendors/New Vendor',
		component: NewVendorComponent
	},
	{
		path:'Vendors/New Vendor/:id',
		component: NewVendorComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
