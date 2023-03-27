import { AfterContentInit, Directive, ElementRef, Input, Renderer2, Optional } from "@angular/core";
import { MatInput } from '@angular/material/input'

@Directive({
  selector: "[autoFocusAT]"
})
export class AutofocusDirective implements AfterContentInit {
  @Input() public appAutoFocus: boolean = true;

  constructor(@Optional() private matInput: MatInput, private el: ElementRef, private renderer: Renderer2) {  }

  public ngAfterContentInit() {
    setTimeout(() => {
      this.matInput.focus();
    }, 100);
  }
}
