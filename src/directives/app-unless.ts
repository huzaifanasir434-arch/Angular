import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPhoneFormat]',
  standalone: true
})
export class PhoneFormatDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let value = this.el.nativeElement.value.replace(/[^0-9]/g, ''); // keep only numbers

    // Add hyphen after 4 digits → 03XX-
    if (value.length > 4) {
      value = value.slice(0, 4) + '-' + value.slice(4);
    }

    // Max length = 12 characters → "03XX-XXXXXXX"
    if (value.length > 12) {
      value = value.slice(0, 12);
    }

    this.el.nativeElement.value = value;
  }
}

// export class insuranceNumberValidator {

// }
