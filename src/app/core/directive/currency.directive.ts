import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
	selector: '[appCurrency]'
})
export class CurrencyDirective {
	// Allow decimal numbers and negative values
	private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
	// Allow key codes for special events. Reflect :
	// Backspace, tab, end, home
	private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ];

	constructor(private el: ElementRef) {}
	@HostListener('keydown', [ '$event' ])
	onKeyDown(event: KeyboardEvent) {
		// Allow Backspace, tab, end, home and arrow keys
		if (this.specialKeys.indexOf(event.key) !== -1) {
			console.log(this.specialKeys.indexOf(event.key));
			return;
		}
		let current: string = this.el.nativeElement.value;
		let next: string = current.concat(event.key);
		if (next && !String(next).match(this.regex)) {
			event.preventDefault();
		}
	}
}
