import {Directive, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
  selector: '[myAutoFocus]'
})
export class MyAutoFocusDirective {
  constructor(private el: ElementRef) {
  }
  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}