import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss']
})
export class SocialShareComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private document: any) { }

  @Input() url: any;
  @Input() title: any = "";
  @Input() description: any = "";
  @Input() image: any = "";
  @Input() tags: any = "";


  @ViewChild('urlInput') urlInput: ElementRef;

  copyUrl() {

    let isiOSDevice = navigator.userAgent.match(/ipad|iphone/i);

    this.urlInput.nativeElement.focus();

    if (isiOSDevice) {

      var editable = this.urlInput.nativeElement.contentEditable;
      var readOnly = this.urlInput.nativeElement.readOnly;

      this.urlInput.nativeElement.contentEditable = true;
      this.urlInput.nativeElement.readOnly = false;

      var range = document.createRange();
      range.selectNodeContents(this.urlInput.nativeElement);

      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      this.urlInput.nativeElement.setSelectionRange(0, 999999);
      this.urlInput.nativeElement.contentEditable = editable;
      this.urlInput.nativeElement.readOnly = readOnly;

    } else {
      this.urlInput.nativeElement.select();
    }
    this.document.execCommand('copy');
  }

  ngOnInit() {
  }

}
