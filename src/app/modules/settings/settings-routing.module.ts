import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingDetailsComponent } from './setting-details/setting-details.component'
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { TaxDetailsComponent } from './tax-details/tax-details.component';
import { DiscountDetailsComponent } from './discount-details/discount-details.component';
import { CanReadGuard } from 'src/app/core/guard/can-read.guard';
import { CanEditGuard } from 'src/app/core/guard/can-edit.guard';
import { OfferDetailsComponent } from './offer-details/offer-details.component';



const routes: Routes = [
  {
    path: 'Settings',
    component: SettingDetailsComponent,
    canActivate: [CanReadGuard]
  },
  {
    path: 'Settings/Company Details',
    component: CompanyDetailsComponent,
    canActivate: [CanEditGuard]
  },
  {
    path: 'Settings/Tax Details',
    component: TaxDetailsComponent,
    canActivate: [CanReadGuard]
  },
  {
    path: 'Settings/Discounts',
    component: DiscountDetailsComponent,
    canActivate: [CanReadGuard]
  },
  {
    path: 'Settings/Offers',
    component: OfferDetailsComponent,
    canActivate: [CanReadGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
