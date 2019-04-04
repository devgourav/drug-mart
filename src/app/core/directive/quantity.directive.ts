import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[appQuantity]'
})
export class QuantityDirective {
	constructor(private el: ElementRef) {}

	// Allow decimal numbers and negative values
	private regex: RegExp = new RegExp(/^[0-9]*$/g);
	private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight' ];

	@HostListener('keydown', [ '$event' ])
	onKeyDown(event: KeyboardEvent) {
		console.log(this.el.nativeElement.value);
		// Allow Backspace, tab, end, and home keys
		if (this.specialKeys.indexOf(event.key) !== -1) {
			return;
		}
		let current: string = this.el.nativeElement.value;
		let next: string = current.concat(event.key);
		if (next && !String(next).match(this.regex)) {
			event.preventDefault();
		}
	}
}
