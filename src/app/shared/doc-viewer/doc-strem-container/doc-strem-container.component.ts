import { Component, OnInit, Input, OnChanges, OnDestroy, ViewEncapsulation,ViewChild} from '@angular/core';

import { ImageviewerComponent } from './image-viewer/image-viewer.component';
import { VideoviewerComponent } from './video-viewer/video-viewer.component';
import { TextviewerComponent } from './text-viewer/text-viewer.component';
import { DocumentModel } from '../entity/document.model';
import { StreamModel } from '../entity/stream.model';
import { Subject, Subscription } from 'rxjs';
import {  DocumentExportService} from '../../document-exporter/document-export-service/document-export.service'

import { DocViewerServiceService } from "../doc-viewer-service.service";
import { DocumentHelperService } from '../../../documents/services/helpers/document-helper.service';
import { NgbTabset, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-doc-strem-container',
  templateUrl: './doc-strem-container.component.html', encapsulation: ViewEncapsulation.None,
  styleUrls: ['./doc-strem-container.component.scss']
})
export class DocstromcontainerComponent implements OnInit, OnChanges, OnDestroy {

    @Input() document: DocumentModel;
    @Input() isTranslate: boolean = false;
    @Input() isKunye: boolean = false;

  doc: DocumentModel;
  currentStream: StreamModel;
  currentStreamIndex: number = 0;
  documentStreamIndexSubscription: Subscription;
  refreshed: boolean = false;
  showKeywordList: boolean = true;
  tempId: number = 0;
  keywords: Array<any> = new Array<any>();
  checkAllKeywords: boolean = true;
  @ViewChild('streamTabSet') streamTabSet :NgbTabset;


  constructor(private docViewerServiceService: DocViewerServiceService, private documentHelperService: DocumentHelperService, private documentExportService: DocumentExportService,
  ) {




  }

  beforeTabChange($event: NgbTabChangeEvent) {
    this.docViewerServiceService.selectedStreamTab = $event.nextId;
  };

  downloadNewsPage(i) {
    this.documentExportService.exportSelectedDocument([{ key: this.doc.id }], "downloadNewsPage", i);
  }

  checkAllKeywordsChanged(checkAllKeywords: boolean) {
    this.keywords.forEach((keyword, index) => {
      keyword.isChecked = checkAllKeywords;
    });

    this.keywordCheckedChanged();
  }

  keywordCheckedChanged() {
    let checkedIndexList: Array<any> = new Array();
    this.keywords.forEach((keyword, index) => {
      if (keyword.isChecked)
        checkedIndexList.push({ index: index, pageIndex: keyword.pageIndex, keyword: keyword.keyword });
    });

    this.docViewerServiceService.keywordCheckedChangeSource.next(checkedIndexList);
  }

  currentStreamChanged() {
      let lang = "tr";
      if (this.isTranslate) {
          lang = "eng";
          this.currentStream.mimeType = 3;
          this.currentStream.text = this.document.content.eng;
      }

    this.keywords = [];
    if (this.doc.id != this.tempId) {
      this.currentStreamIndex = 0;
      this.tempId = this.doc.id;
    }
    let itemDetailIndex = 0;
    let colors = this.documentHelperService.getColorPalette();

    //e�er stream t�r� text ise contentDetail objesinden keyword listelerini �retir.
    if (this.currentStream.mimeType === 3) {
        //console.log(this.document.contentDetail)
      if (this.document.contentDetail != undefined) {
          if (this.document.contentDetail[lang]) {
              this.document.contentDetail[lang].layoutRows.forEach(detail => {
            let foundedKeywords = this.keywords.filter(item => item.keyword === detail.keyword);

            if (foundedKeywords.length === 0) {
              this.keywords.push({ keyword: detail.keyword, isChecked: true, color: colors[itemDetailIndex], layoutData: [] });

              itemDetailIndex++;

              if (itemDetailIndex >= colors.length) {
                itemDetailIndex = 0;
              }
            }
          });
        }
      }
    } else {

      

      let keywordResponse = this.docViewerServiceService.getDocumentKeywords(this.document.fileDetails,this.currentStream.mimeType);
      this.keywords = keywordResponse.keywords;
    }


  }

  keywordClick(clickedKeyword) {
    if (clickedKeyword.pageIndex == undefined || clickedKeyword.pageIndex - 1 == this.currentStreamIndex) {
      this.docViewerServiceService.keywordClickedSource.next(clickedKeyword);
    } else {
      this.goTo(clickedKeyword);
    }
  }


  /**
 * next arrow
 */
  goTo(keyword) {
    this.docViewerServiceService.selectedPageIndex = keyword.pageIndex;
    this.docViewerServiceService.documentStreamIndexChangedSource.next(keyword.pageIndex - 1);
  }
  /**
   * next arrow
   */
  onNext() {
    this.currentStreamIndex++;
    if (this.currentStreamIndex > this.doc.streams.length)
      this.currentStreamIndex = 0;

    this.currentStream = this.doc.streams[this.currentStreamIndex];


  }
  /**
   *  prev arrow
   */
  onPrevious() {
    this.currentStreamIndex--;

    if (this.currentStreamIndex < 0)
      this.currentStreamIndex = this.doc.streams.length - 1;

    this.currentStream = this.doc.streams[this.currentStreamIndex];
  }


  pageClick(i) {
    this.currentStreamIndex = i;
    this.currentStream = this.doc.streams[i];
    this.docViewerServiceService.documentStreamIndexChangedSource.next(this.currentStreamIndex);

  }

  ngOnChanges(change) {
    this.refreshed = false;

    this.doc = this.document;
    if (this.document.streams.length > 0) {
      this.currentStream = this.document.streams[0];
      this.currentStreamChanged();
    }

    setTimeout(() => {
      this.refreshed = true;

      setTimeout(() => {
        let selectedTabId: string = this.docViewerServiceService.selectedStreamTab;
        if (selectedTabId.length > 0)
          this.streamTabSet.select(selectedTabId);
      });

    }, 10);

   
  }

  ngOnInit() {


    this.documentStreamIndexSubscription = this.docViewerServiceService.documentStreamIndexChangedStream$.subscribe(index => {
      this.refreshed = false;
      this.currentStream = this.doc.streams[index];
      this.currentStreamIndex = index;
      this.currentStreamChanged();
      setTimeout(() => this.refreshed = true, 10);
    });


    //this.doc;
    //this.currentStream;
    //this.currentStreamIndex;
    //this.refreshed;
    //this.showKeywordList;
    //this.document;
    //this.document.streams;
    //debugger;

  }

  ngOnDestroy(): void {
    this.documentStreamIndexSubscription.unsubscribe();
  }
}



