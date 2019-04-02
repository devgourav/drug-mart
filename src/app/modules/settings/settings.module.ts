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
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
	declarations: [
		SettingDetailsComponent,
		CompanyDetailsComponent,
		TaxDetailsComponent,
		DiscountDetailsComponent,
		OfferDetailsComponent
	],
	imports: [
		CommonModule,
		SettingsRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		SharedModule,
		ConfirmDialogModule,
		BrowserAnimationsModule,
		ToastModule,
		MessagesModule,
		MessageModule,
		TableModule
	]
})
export class SettingsModule {}
