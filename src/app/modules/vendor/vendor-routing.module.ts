import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorDetailsComponent} from './vendor-details/vendor-details.component'
import { NewVendorComponent } from './new-vendor/new-vendor.component';
import { CanReadGuard } from 'src/app/core/guard/can-read.guard';
import { CanEditGuard } from 'src/app/core/guard/can-edit.guard';


const routes: Routes = [
	{
		path:'Vendors',
		component: VendorDetailsComponent,
		canActivate: [CanReadGuard]
	},
	{
		path:'Vendors/New Vendor',
		component: NewVendorComponent,
		canActivate: [CanEditGuard]
	},
	{
		path:'Vendors/New Vendor/:id',
		component: NewVendorComponent,
		canActivate: [CanReadGuard]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
