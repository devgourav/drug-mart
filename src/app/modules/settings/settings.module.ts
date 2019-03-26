import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingDetailsComponent } from './setting-details/setting-details.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { TaxDetailsComponent } from './tax-details/tax-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { DiscountDetailsComponent } from './discount-details/discount-details.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { OfferDetailsComponent } from './offer-details/offer-details.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
	declarations: [
		SettingDetailsComponent,
		CompanyDetailsComponent,
		TaxDetailsComponent,
		DiscountDetailsComponent,
		OfferDetailsComponent
	],
	imports: [ CommonModule, SettingsRoutingModule, FormsModule, ReactiveFormsModule, ButtonModule, SharedModule ]
})
export class SettingsModule {}
