import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingDetailsComponent } from './setting-details/setting-details.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { TaxDetailsComponent } from './tax-details/tax-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { DiscountDetailsComponent } from './discount-details/discount-details.component';

@NgModule({
  declarations: [SettingDetailsComponent,CompanyDetailsComponent,TaxDetailsComponent, DiscountDetailsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
