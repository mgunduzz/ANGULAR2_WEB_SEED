import { Component, OnInit, OnChanges, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs'

import { DocumentModel } from '../entity/document.model';
import { StreamModel } from '../entity/stream.model';
import { DocViewerServiceService } from "../doc-viewer-service.service";

@Component({
  selector: 'app-doc-meta-data',
  templateUrl: './doc-meta-data.component.html',
  styleUrls: ['./doc-meta-data.component.scss']
})
export class DocmetadataComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Doc datalar geliyor
   */
  @Input() document: DocumentModel;
  currentStream: StreamModel;
  documentStreamIndexSubscription: Subscription;
  documentChangedSubscription: Subscription;
  videoDuration: any;
  documentPage: number = 0;
  constructor(private docViewerServiceService: DocViewerServiceService) {
    this.documentStreamIndexSubscription = this.docViewerServiceService.documentStreamIndexChangedStream$.subscribe(index => {
      this.currentStream = this.document.streams[index];
      if (this.document.documentTypeId === 2 && this.document.extendedType !== "Künye")
        if (typeof this.document.fileDetails !== "undefined")
          this.documentPage = this.document.fileDetails[index].virtualpage;

    });
  }

  calcDuration(millis) {

    let minutes: number = Math.floor(millis / 60000);
    let seconds: any = ((millis % 60000) / 1000).toFixed(0);
    this.videoDuration = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

  }




  ngOnInit() {
    this.documentChangedSubscription = this.docViewerServiceService.documentChangedStream$.subscribe(doc => {
      this.document = doc;
      this.calcDuration(this.document.duration);
      if (this.document.documentTypeId === 2 && this.document.extendedType !== "Künye")
        if (typeof this.document.pageNumber !== "undefined")
          this.documentPage = this.document.pageNumber;

    });

    this.calcDuration(this.document.duration);

    this.orderMetaDataFields();
    if (this.document.documentTypeId === 2 && this.document.extendedType !== "Künye")
      if (typeof this.document.fileDetails !== "undefined")
        this.documentPage = this.document.fileDetails[0].virtualpage;
  }

  ngOnChanges(changes: Object): void {
    if (this.document.streams.length > 0) {
      this.currentStream = this.document.streams[0];
    }
  }

  ngOnDestroy(): void {
    this.documentStreamIndexSubscription.unsubscribe();
    this.documentChangedSubscription.unsubscribe();
  }

  orderMetaDataFields() {

  }
}
