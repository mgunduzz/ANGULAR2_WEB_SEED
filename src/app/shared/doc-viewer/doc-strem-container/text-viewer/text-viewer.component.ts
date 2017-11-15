import { Component, Input, OnDestroy, OnInit, OnChanges } from '@angular/core';
import {Subscription} from 'rxjs'

import { DocumentModel } from '../../entity/document.model';
import { StreamModel } from '../../entity/stream.model';
import { DocViewerServiceService } from '../../doc-viewer-service.service';
import { DocumentHelperService } from '../../../../documents/services/helpers/document-helper.service';
import {SlimLoadingBarService, SlimLoadingBarComponent } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-textviewer',
  templateUrl: './text-viewer.component.html',
  styleUrls: ['./text-viewer.component.scss',]
})
export class TextviewerComponent implements OnDestroy, OnInit, OnChanges {
  /**
   * Stream videolu linkini taşıyan modeldir.
   */
  @Input() stream: StreamModel;
  @Input() document: DocumentModel;

  /**
 * Butonlara basıldığında texte zoomin,zoomout yapılabilmesi için size tanımladık
 */
  isContentExist: boolean=true;
  size: number = 13;
  color: string;
  docViewerToolBoxProcessSubscription: Subscription;
  sizeIncreaseValue: number = 2;
  highlightWordList: any[] = [];
  keywordCheckedChangeSubscription: Subscription;
  keywords: Array<any> = new Array();
  refresh: boolean = true;

  constructor(private docViewerServiceService: DocViewerServiceService, private slimLoadingBarService: SlimLoadingBarService, private documentHelperService: DocumentHelperService) {
    this.docViewerToolBoxProcessSubscription = this.docViewerServiceService.docViewerToolBoxProcessChangedStream$.subscribe(zoomProcessType => {
      switch (zoomProcessType) {
        case 'zoomIn':
          this.increaseTextSize();
          break;
        case 'zoomOut':
          this.lowerTextSize();
          break;
        default:
          break;
      }
    });

    this.keywordCheckedChangeSubscription = this.docViewerServiceService.keywordCheckedChangeStream$.subscribe(checkedIndexList => {
      this.showHighlightByKeywordIndexList(checkedIndexList);
    });

  }

  showHighlightByKeywordIndexList(checkedIndexList) {
    this.refresh = false;

    this.highlightWordList = [];

    checkedIndexList.forEach(index => {
      let keyword = this.keywords[index.index];
      this.highlightWordList = this.highlightWordList.concat(keyword.highlights);
    });

    setTimeout(() => {
      this.refresh = true;
    });
  }


  increaseTextSize() {
    this.size = this.size + this.sizeIncreaseValue;
  }

  lowerTextSize() {
    this.size = this.size - this.sizeIncreaseValue;
  }

  ngOnDestroy() {
    this.docViewerToolBoxProcessSubscription.unsubscribe();
  }

  ngOnInit(): void {

      if (typeof this.stream.text === 'undefined')
      {
          this.isContentExist = false;
      }

    this.slimLoadingBarService.progress = 90;
    setTimeout(() => {
      this.slimLoadingBarService.complete();

    }, 100);

    if (this.document.contentDetail) {
      if (this.document.contentDetail["tr"]) {
        let colors = this.documentHelperService.getColorPalette();
        let colorIndex: number = -1;
        this.keywords = [];
        this.document.contentDetail["tr"].layoutRows.forEach(detail => {

          let foundedKeywords = this.keywords.filter(item => item.keyword === detail.keyword);
          if (foundedKeywords.length === 0) {
            this.keywords.push({ keyword: detail.keyword, highlights: [] });
            colorIndex++;
            if (colorIndex >= colors.length)
              colorIndex = 0;
          }

          let index = this.keywords.map(e => e.keyword).indexOf(detail.keyword);
          this.keywords[index].highlights.push({ highWord: detail.highWord, color: colors[colorIndex] });


          this.highlightWordList.push({ highWord: detail.highWord, color: colors[colorIndex] });
        });
      }
    }
  }

  ngOnChanges(changes: Object): void {

  }
}
