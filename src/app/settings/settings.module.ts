import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingDetailsComponent } from './setting-details/setting-details.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { TaxDetailsComponent } from './tax-details/tax-details.component';

import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [SettingDetailsComponent,CompanyDetailsComponent,TaxDetailsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
