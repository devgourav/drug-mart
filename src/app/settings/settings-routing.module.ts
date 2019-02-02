import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingDetailsComponent} from './setting-details/setting-details.component'
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { TaxDetailsComponent } from './tax-details/tax-details.component';



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
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
