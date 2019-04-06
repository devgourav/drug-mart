import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';
import { PaymentPrintComponent } from './payment-print/payment-print.component';

const routes: Routes = [
	{
		path: 'Payments',
		component: PaymentDetailsComponent
	},
	{
		path: 'Payments/New Payment',
		component: NewPaymentComponent
	},
	{
		path: 'Payments/Print Payment/:id',
		component: PaymentPrintComponent
	}
];

@NgModule({
	imports: [ RouterModule.forChild(routes) ],
	exports: [ RouterModule ]
})
export class PaymentRoutingModule {}
