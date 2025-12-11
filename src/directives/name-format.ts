import { Directive, ElementRef, HostListener, inject, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { SwapCasePipe } from '../app/pipes/swap-case-pipe';

@Directive({
  selector: '[appNameFormat]',
  standalone: true,
  providers: [SwapCasePipe, Input]
})
export class NameFormatDirective {

  @Input() appNameFormat: 'swap' | 'upper' | 'lower' | 'title' = 'swap';

  private pipe = inject(SwapCasePipe);  // ✅ CORRECT WAY

  constructor(
    private el: ElementRef<HTMLInputElement>,
    @Optional() @Self() private control?: NgControl
  ) {}

  @HostListener('input')
  onInput() {
    const input = this.el.nativeElement
    let raw = input.value || '';

    // const transformed = this.pipe.transform(raw, this.appNameFormat);

     // 🔥 1. Remove all non-letter characters, allow spaces
  raw = raw.replace(/[^a-zA-Z\s]/g, '');

  // 🔥 2. Apply your custom pipe transformation
  const transformed = this.pipe.transform(raw, this.appNameFormat);

    if (raw === transformed) return;

    const pos = input.selectionStart ?? raw.length;
    const beforeEnd = raw.length - pos;

    input.value = transformed;

    this.control?.control?.setValue(transformed, { emitEvent: false });

    const newPos = Math.max(0, transformed.length - beforeEnd);
    input.setSelectionRange(newPos, newPos);
  }
}
