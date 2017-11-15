import { Directive, ElementRef, Input, ViewChild } from '@angular/core';
import { HostListener, HostBinding} from '@angular/core';

@Directive({
  selector: '[dropDownModalSelection]',
  exportAs: 'dropDownModalSelection',

})
export class DropDownModalSelection {
  private _toggleElement: any;

  @ViewChild('header')
  header: ElementRef;


  constructor(private el: ElementRef) {
  }

  public mouseStatus: string = "mouseenter";
  private isActive: boolean = false;


  @HostListener('mouseenter')
  onMouseEnter() {
    this.mouseStatus = "mouseenter";
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    let elm = this.el.nativeElement;
    let dd = this.header;
    if (this.mouseStatus == "mouseleave" && this.isActive == true) {
      if (targetElement.classList[0] === "month" || targetElement.classList[0] === "week" || targetElement.classList[0] === "next" || targetElement.classList[1] === "fa-chevron-left" || targetElement.classList[0] === "daterangepicker" || targetElement.classList[0] === "prev" || targetElement.classList[1] === "fa-chevron-right" || targetElement.classList[0] === "monthselect" || targetElement.classList[0] === "yearselect")
      { } else {
        this.toggle();
      }
    } else if (this.mouseStatus == "mouseenter") {

    }
  }


  set toggleElement(toggleElement: any) { this._toggleElement = toggleElement; }

  toggle(): void {
    var elm = this.el.nativeElement;

    if (this.isActive) {
      this.isActive = false;
      elm.classList.remove("active");


    } else {
      this.isActive = true;
      elm.classList.add("active");

    }

  }


  @HostListener('mouseleave', ['$event'])
  onMouseLeave($event) {
    this.mouseStatus = "mouseleave";
  }
}

@Directive({
  selector: '[dropDownModalToggler]',
  host: {

    '(click)': 'toggleOpen()'
  }
})
export class DropDownModalToggler {
  constructor(public dropdown: DropDownModalSelection, elementRef: ElementRef) {
    dropdown.toggleElement = elementRef.nativeElement;
  }

  toggleOpen() {
    this.dropdown.toggle();
  }
}
