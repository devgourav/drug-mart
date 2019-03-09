import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAlphabet]'
})
export class AlphabetDirective {

  constructor(private el: ElementRef) { }

  // Allow decimal numbers and negative values
  private regex: RegExp = new RegExp(/^[A-Za-z\s]*$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  @HostListener('keydown', ['$event'])
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
