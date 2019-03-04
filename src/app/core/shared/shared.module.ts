import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared/shared.component';
import { CurrencyDirective } from '../directive/currency.directive';

@NgModule({
  declarations: [SharedComponent,CurrencyDirective],
  imports: [
    CommonModule
  ],
  exports:[
    CurrencyDirective
  ]
})
export class SharedModule { }
