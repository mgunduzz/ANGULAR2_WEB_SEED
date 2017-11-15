import { Directive, OnInit, AfterViewInit, Input, ElementRef, Renderer } from '@angular/core';

import {  DocumentHelperService} from '../../documents/services/helpers/document-helper.service';


@Directive({
  selector: '[highlightText]'
})
export class HighlightTextDirective implements OnInit, AfterViewInit {

  @Input() highlightWordList: any[];
  colors: string[] = [];
  colorIndex: number = 0;
  keywordColorList: any = {}

  constructor(private el: ElementRef,private renderer: Renderer,private documentHelperService: DocumentHelperService) {}


  ngOnInit() {
  }

  replace(txt: string, search: string) {
    let searchRgx = new RegExp(this.highlightWordList.map(item => {
      return item.highWord;
    }).join("|"), 'gi');

    let _this = this;

    return txt.replace(searchRgx, function (match, offset, string) {
      let foundedKeyword = _this.highlightWordList.filter(item => {
        return item.highWord.toLowerCase() === match.toLowerCase();
      })[0];

      if (foundedKeyword == undefined) {
        foundedKeyword = {};
        foundedKeyword.color = 'white';
      }


      return `<span style='background-color:${foundedKeyword.color};' >${match}</span>`;
    });
  }

  escapeStringRegexp(str: string) {
    let matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

    if (typeof str !== 'string') {
      throw new TypeError('Expected a string');
    }

    return str.replace(matchOperatorsRe, '\\$&');
  }

  ngAfterViewInit() {
    let newText: string = this.replace(this.el.nativeElement.innerText, '');
    this.renderer.setElementProperty(this.el.nativeElement, 'innerHTML', newText);
  }
}
