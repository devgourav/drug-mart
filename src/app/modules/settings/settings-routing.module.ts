import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingDetailsComponent} from './setting-details/setting-details.component'
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { TaxDetailsComponent } from './tax-details/tax-details.component';
import { DiscountDetailsComponent } from './discount-details/discount-details.component';



const routes: Routes = [
	{
		path:'Settings',
		component: SettingDetailsComponent
	},
	{
		path:'Settings/Company Details',
		component: CompanyDetailsComponent
	},
	{
		path:'Settings/Tax Details',
		component: TaxDetailsComponent
	},
	{
		path:'Settings/Discounts',
		component: DiscountDetailsComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
