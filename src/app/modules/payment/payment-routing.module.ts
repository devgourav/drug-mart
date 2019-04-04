import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';

const routes: Routes = [
	{
		path: 'Payments',
		component: PaymentDetailsComponent
	},
	{
		path: 'Payments/New Payment',
		component: NewPaymentComponent
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class PaymentRoutingModule {}
