import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { NewPaymentComponent } from './new-payment/new-payment.component';

@NgModule({
  declarations: [PaymentDetailsComponent, NewPaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
