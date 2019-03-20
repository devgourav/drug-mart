import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared/shared.component';
import { CurrencyDirective } from '../directive/currency.directive';
import { QuantityDirective } from '../directive/quantity.directive';
import { AlphabetDirective } from '../directive/alphabet.directive';

@NgModule({
	declarations: [ SharedComponent, CurrencyDirective, QuantityDirective, AlphabetDirective ],
	imports: [ CommonModule ],
	exports: [ CurrencyDirective, QuantityDirective, AlphabetDirective ]
})
export class SharedModule {}
