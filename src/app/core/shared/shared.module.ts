import { NgModule } from '@angular/core';
import { CurrencyDirective } from '../directive/currency.directive';
import { QuantityDirective } from '../directive/quantity.directive';
import { AlphabetDirective } from '../directive/alphabet.directive';

// const material = [ MatSidenavModule ];

@NgModule({
	declarations: [ CurrencyDirective, QuantityDirective, AlphabetDirective ],
	exports: [ CurrencyDirective, QuantityDirective, AlphabetDirective ]
})
export class SharedModule {}
