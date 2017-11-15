import { Document } from './../../documents/basket/entity/document-model';
import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DocumentModel } from './entity/document.model';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs'
import {DocumentExportService} from '../document-exporter/document-export-service/document-export.service'
import { DomSanitizer} from '@angular/platform-browser';

import { NewsService } from '../../documents/news/news-service.service'
import { DocViewerServiceService  } from "../doc-viewer/doc-viewer-service.service";
import {SlimLoadingBarService, SlimLoadingBarComponent } from 'ng2-slim-loading-bar';


@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.scss']  

})
export class DocViewerComponent implements OnInit, OnDestroy {
  @Input('document') currentDocument: DocumentModel;
  @Input() isControlledByToolbar: boolean = false;
  @Input() isTranslate: boolean=false;
  @Input() isKunye: boolean = false;

  documentChangeSubscription: Subscription;
  passData: boolean = false;
  securedAgendaLink: any;
  isIframeShow: boolean = false;
  constructor(private documentExportService: DocumentExportService, private sanitizer: DomSanitizer ,private activatedRoute: ActivatedRoute, private newsService: NewsService, private docViewerServiceService: DocViewerServiceService, private slimLoadingBarService: SlimLoadingBarService) {

    this.documentExportService.url.subscribe(data => {
      
      this.securedAgendaLink = this.sanitizer.bypassSecurityTrustResourceUrl(data);
      this.isIframeShow = true;
    });
  }

  ngOnInit() { 
    this.isIframeShow = false;

    if (!this.isControlledByToolbar)
      this.fillDocumentFields();

    this.documentChangeSubscription = this.docViewerServiceService.documentChangedStream$.subscribe(doc => {
      //this.currentDocument.streams = undefined;
      this.passData = false;
      this.currentDocument = doc;
      this.passData = true;

    });
  }

  /**
   * e�er d�k�man stream'e sahip de�ilse, stream'i olu�turulur.
   */
  fillDocumentFields() {
    if (this.currentDocument.streams) {
      this.passData = true;
    } else {
      this.docViewerServiceService.loadDocumentFieldsForStream(this.currentDocument, true).subscribe(doc => {
        doc.streams = this.docViewerServiceService.getDocumentStreams(doc);
        this.currentDocument = doc;
        this.passData = true;
      });
    }
  }

  ngOnDestroy(): void {
    this.documentChangeSubscription.unsubscribe();
  }
}
