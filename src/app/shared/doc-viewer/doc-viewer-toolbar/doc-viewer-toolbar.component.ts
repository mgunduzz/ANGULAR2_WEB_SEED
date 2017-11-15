import { MailSenderModalComponent } from './../../mailing/mail-sender-modal/mail-sender-modal.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, Input, ViewChild, HostListener, ElementRef, EventEmitter, Output } from '@angular/core';

import { DocViewerServiceService } from '../doc-viewer-service.service';
import { DocumentListerService } from '../../document-lister/document-lister.service';
import { NewsService } from '../../../documents/news/news-service.service';
import { DocumentModel } from '../entity/document.model';
import { StreamModel } from '../entity/stream.model';
import { DocumentExportService } from '../../document-exporter/document-export-service/document-export.service'
import { PopoverContent } from "ngx-popover";
import { FeedbackService } from '../../feedback/services/feedback.service'
import { FeedbackModalComponent } from '../../feedback/feedback-modal/feedback-modal.component'

import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Subscription } from 'rxjs';
import { SlimLoadingBarService, SlimLoadingBarComponent } from 'ng2-slim-loading-bar';
import { ReadedDocumentsService } from '../readedDocuments/readed-documents.service'
import { MailingService } from '../../mailing/mailing.service'
import { ShareLinkGeneratorService } from "../../social-share/link-generator-service/share-link-generator.service"
import { Location } from '@angular/common';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'doc-viewer-toolbar',
  templateUrl: './doc-viewer-toolbar.component.html',
  styleUrls: ['./doc-viewer-toolbar.component.scss'],
  providers: [SlimLoadingBarComponent, ShareLinkGeneratorService]
})
export class DocViewerToolbarComponent implements OnInit {
  //döküman listesi
  @Input() documents: DocumentModel[];
  //seçili dökümanın listedi indeksi
  @Input() docIndex: number;
  //eğer true ise dökümanın text içeriği görüntülenir
  @Input() isTextView?: boolean = false;
  //döküman arama için kullanılan model
  @Input() searchModal?: any;
  //eğer false ise bir önceki veya sonraki dökümana gitme pasif olur
  @Input() showMultipleDocument: boolean = true;
  //eğer false ise bir önceki veya sonraki sayfa yüklenmez
  @Input() loadOtherPages: boolean = true;
  //eğer true ise bazı döküman listesi fonksiyonları pasif olur
  @Input() isDocumentListSimpleList: boolean = false;
  //toolbarda gösterilememsi istenenlerin listesi
  @Input() toolbarNotAllowedButtons: any = {};
  //haber listesi mevcut sayfa
  @Input() currentPage: number = 1;
  //haber listesi sayfadaki  mevcut haber say�s�
  @Input() currentPageViewCount: number = 20;
  @Input() publicView: boolean = false;
  myUrl: string = "";
  @Output() changeCurrentDoc?: EventEmitter<any> = new EventEmitter<any>();
  jpegDownloadModel: any = {};

  //dropdownlar
  @ViewChild('basketDropDown') basketDropDown: NgbDropdown;
  @ViewChild('diaDropDown') diaDropDown: NgbDropdown;
  @ViewChild('feedbackDropDown') feedbackDropDown: NgbDropdown;
  @ViewChild('sendMailDropDown') sendMailDropDown: NgbDropdown;
  @ViewChild('shareDropDown') shareDropDown: NgbDropdown;
  @ViewChild('downloadJpegDropDown') downloadJpegDropDown: NgbDropdown;
  @ViewChild('zoomButtonDropDown') zoomButtonDropDown: NgbDropdown;

  //@ViewChild('printDropDown') printDropDown: NgbDropdown;



  //dropdown toggleları
  @ViewChild('sendMailDropDownToggle') sendMailDropDownToggle: ElementRef;
  @ViewChild('feedbackDropDownToggle') feedbackDropDownToggle: ElementRef;
  //@ViewChild('printDropDownToggle') printDropDownToggle: ElementRef;
  @ViewChild('basketDropDownToggle') basketDropDownToggle: ElementRef;
  @ViewChild('shareDropDownToggle') shareDropDownToggle: ElementRef;
  @ViewChild('downloadJpegDropDownToggle') downloadJpegDropDownToggle: ElementRef;
  @ViewChild('zoomButtonDropDownToggle') zoomButtonDropDownToggle: ElementRef;



  @HostListener('document:click', ['$event'])
  clickout(event) {

    if (this.zoomButtonDropDownToggle)
      if (this.controlDropDownForOutsideClik(event, 'zoomButtons', this.zoomButtonDropDownToggle))
        this.closeZoomButtonDropDown();

    if (!this.publicView && this.downloadJpegDropDownToggle)
      if (this.controlDropDownForOutsideClik(event, 'saveASJpeg', this.downloadJpegDropDownToggle))
        this.closeDownloadJpegDropDown();

    if (!this.publicView && this.sendMailDropDownToggle)
      if (this.controlDropDownForOutsideClik(event, 'MAIL-SENDER-COMPONENT', this.sendMailDropDownToggle))
        this.closeSendMailDropDown();

    if (!this.publicView && this.feedbackDropDownToggle)
      if (this.controlDropDownForOutsideClik(event, 'FEEDBACK', this.feedbackDropDownToggle))
        this.closeFeedbackDropDown();

    //if (!this.publicView)
    //  if (this.controlDropDownForOutsideClik(event, 'print', this.printDropDownToggle))
    //    this.closePrintDropDown();


    if (!this.publicView && this.basketDropDownToggle)
      if (this.controlDropDownForOutsideClik(event, 'DOC-BASKET-LIST', this.basketDropDownToggle))
        this.closeBasketDropDown();

    if (this.shareDropDownToggle)
      if (this.controlDropDownForOutsideClik(event, 'SOCIAL-SHARE', this.shareDropDownToggle))
        this.closeShareDropDown();
  }

  isLastPage: boolean = false;

  controlDropDownForOutsideClik(event, nodeName: string, toggleEl: ElementRef): boolean {
    let index = event.path.findIndex(p => p.id === nodeName);
    return (index < 0 && event.target !== toggleEl.nativeElement);
  }



  documentIndex: number = 0;
  currentStream: StreamModel;
  currentDocument: DocumentModel;
  isGoNextDocumentActive: boolean = true;
  isGoPreviousDocumentActive: boolean = false;
  isFeedbackPopoverShowed: boolean = false;
  documentStreamIndexSubscription: Subscription;
  feedbackSendedSubscription: Subscription;
  mailSendedSubscription: Subscription;
  currentPageChangedSubscription: Subscription;
  showMobileExtraRow: boolean;

  streamIndex: number = 0;
  constructor(
    private modalService: NgbModal,
    private shareLinkGeneratorService: ShareLinkGeneratorService,
    private slimLoadingBarComponent: SlimLoadingBarComponent,
    private slimLoadingBarService: SlimLoadingBarService,
    private feedbackService: FeedbackService,
    private docViewerServiceService: DocViewerServiceService,
    private newsService: NewsService,
    private documentListerService: DocumentListerService,
    private documentExportService: DocumentExportService,
    private mailingService: MailingService,
    private readedDocumentsService: ReadedDocumentsService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  //eğer dropdown undefined değilse dropdown'ı kapatır



  //toolbardaki işlemleri emit eden fonksiyon
  runToolBoxProcess(zoomType: string) {
    this.docViewerServiceService.docViewerToolBoxProcessChangedSource.next(zoomType);
  }

  downloadDocumentPdf() {
    let doc: DocumentModel = <DocumentModel>JSON.parse(JSON.stringify(this.documents[this.documentIndex]));
    this.documentExportService.exportSelectedDocument([{ key: doc.id }], "pdf", "fromDocView");

  }

  downloadDocumentPdfAdvenced() {
    let doc: DocumentModel = <DocumentModel>JSON.parse(JSON.stringify(this.documents[this.documentIndex]));
    this.documentExportService.exportSelectedDocument([{ key: doc.id }], "docViewerPdf", this.streamIndex);

  }

  downloadDocumentMizanpaj() {
    let doc: DocumentModel = <DocumentModel>JSON.parse(JSON.stringify(this.documents[this.documentIndex]));
    this.documentExportService.exportSelectedDocument([{ key: doc.id }], "mizanpaj");
  }

  openFeedback() {

    const modalRef = this.modalService.open(FeedbackModalComponent, { size: "sm" });
    modalRef.componentInstance.document = this.currentDocument;

  }

  downloadJpeg() {
    this.jpegDownloadModel.downloadPressFileIndex = this.streamIndex;
    let doc: DocumentModel = <DocumentModel>JSON.parse(JSON.stringify(this.documents[this.documentIndex]));
    this.documentExportService.exportSelectedDocument([{ key: doc.id }], "jpeg", this.jpegDownloadModel);
    this.closeJepgDownload();
  }

  closeThisTab() {
    window.top.close();
  }

  getNewsText() {
    this.currentStream.mimeType = (this.currentStream.mimeType === 2 ? 3 : 2);
  }

  goDocumentByIndex(pageChanged: boolean = false) {

    if (this.showMultipleDocument) {
      this.isGoPreviousDocumentActive = true;
      this.isGoNextDocumentActive = true;

      this.checkGoNextDocumentActive();
      this.checkGoPreviousDocumentActive();
    }


    this.docViewerServiceService.loadDocumentFieldsForStream(this.documents[this.documentIndex], true).subscribe(doc => {
      this.currentDocument = doc;
      this.currentDocument.streams = this.docViewerServiceService.getDocumentStreams(doc);
      this.streamIndex = 0;
      this.currentStream = this.currentDocument.streams[0];
      this.readedDocumentsService.setReaded(this.currentDocument);
      this.changeCurrentDoc.emit({ docId: this.currentDocument.id, searchModel: this.searchModal, pageChanged: pageChanged });
      this.docViewerServiceService.documentChangedSource.next(this.currentDocument);


    });
  }



  goNextDocument() {

    this.startLoaderBar();
    if (this.documentIndex < this.documents.length - 1) {
      this.documentIndex++;
      this.goDocumentByIndex();
    } else {
      let searchModel: any = <any>JSON.parse(JSON.stringify(this.newsService.documentSearchModel));;

      this.isGoNextDocumentActive = false;
      searchModel.currentPage = this.searchModal.currentPage + 1;
      searchModel.fieldList = [
        "DocumentTypeId", "PublishDate", "MediaName", "Title", "RowIndex", "MediaNameId", "Id"
      ];


      this.newsService.searchDocument(searchModel).subscribe(response => {
        this.isGoNextDocumentActive = true;



        let responseDocs: DocumentModel[] = <DocumentModel[]>response.results.documents;
        if (responseDocs.length > 0) {
          this.searchModal.currentPage += 1;

          this.documents = responseDocs;
          this.documentIndex = 0;
          this.goDocumentByIndex(true);
          this.documentListerService.newListComponentChangePage.next(searchModel.currentPage);



        } else {
          this.isGoNextDocumentActive = false;
        }
      });

    }
  }



  private startLoaderBar() {
    this.slimLoadingBarService.progress = 10;
    this.slimLoadingBarService.start();
  }
  goPreviousDocument() {
    this.startLoaderBar();
    if (this.documentIndex > 0) {
      this.documentIndex--;
      this.goDocumentByIndex();
    } else {

      if (this.searchModal.currentPage > 1) {
        let searchModel: any = <any>JSON.parse(JSON.stringify(this.newsService.documentSearchModel));;

        this.isGoPreviousDocumentActive = false;
        searchModel.currentPage = this.searchModal.currentPage - 1;
        searchModel.fieldList = [
          "DocumentTypeId", "PublishDate", "MediaName", "Title", "RowIndex", "MediaNameId", "Id"
        ];

        this.newsService.searchDocument(searchModel).subscribe(response => {
          this.isGoPreviousDocumentActive = true;



          let responseDocs: DocumentModel[] = <DocumentModel[]>response.results.documents;
          if (responseDocs.length > 0) {
            this.searchModal.currentPage -= 1;
            this.documents = responseDocs;
            this.documentIndex = searchModel.pageViewCount - 1;
            this.goDocumentByIndex(true);
            this.documentListerService.newListComponentChangePage.next(searchModel.currentPage);
            this.checkGoPreviousDocumentActive();


          } else {
            this.isGoPreviousDocumentActive = false;
          }
        });
      } else {
        this.checkGoPreviousDocumentActive();
      }
    }

  }


  goFirstMedia() {
    this.startLoaderBar();
    this.streamIndex = 0;
    this.changeStreamByIndex(this.streamIndex);
    this.slimLoadingBarService.complete();
  }

  goPreviousMedia() {
    this.startLoaderBar();
    if (this.streamIndex > 0) {
      this.streamIndex--;
      this.changeStreamByIndex(this.streamIndex);
    }
    this.slimLoadingBarService.complete();

  }

  goNextMedia() {
    this.startLoaderBar();
    if (this.streamIndex < this.currentDocument.streams.length - 1) {
      this.streamIndex++;
      this.changeStreamByIndex(this.streamIndex);
    }
    this.slimLoadingBarService.complete();

  }

  goLastMedia() {
    this.startLoaderBar();
    this.streamIndex = this.currentDocument.streams.length - 1;
    this.changeStreamByIndex(this.streamIndex);
    this.slimLoadingBarService.complete();
  }

  changeStreamByIndex(newStreamIndex) {
    this.currentStream = this.currentDocument.streams[newStreamIndex];

    this.docViewerServiceService.documentStreamIndexChangedSource.next(this.streamIndex);
  }

  getMyUrl() {
    this.myUrl = this.shareLinkGeneratorService.createUrl(this.currentDocument);
  }

  checkIsLastPage() {
    let pageCount = Math.ceil(this.newsService.totalCount / this.searchModal.pageViewCount);

    this.isLastPage = this.searchModal.currentPage >= pageCount;
  }

  checkGoNextDocumentActive() {
    this.checkIsLastPage();

    if (!this.loadOtherPages)
      this.isGoNextDocumentActive = false;

    if (this.isLastPage && this.documentIndex >= this.documents.length - 1)
      this.isGoNextDocumentActive = false;

    if (!this.showMultipleDocument)
      this.isGoNextDocumentActive = false;
  }

  checkGoPreviousDocumentActive() {
    this.isGoPreviousDocumentActive = false;

    if (this.documentIndex > 0 || this.searchModal.currentPage > 1)
      this.isGoPreviousDocumentActive = true;

    if (!this.showMultipleDocument)
      this.isGoPreviousDocumentActive = false;
  }

  setDeafultJpegModel() {
    this.jpegDownloadModel.isMarked = true;
    this.jpegDownloadModel.downloadPressFileIndex = 0;
    this.jpegDownloadModel.size = 1;
    this.jpegDownloadModel.isAddKunye = false;
  }

  openMailSenderModal() {
    const modalRef = this.modalService.open(MailSenderModalComponent, { size: "sm", windowClass: "mail-sender-modal" });
    modalRef.componentInstance.documents = this.documents;
  }


  ngOnInit() {
    this.setDeafultJpegModel();



    //mail gönderildiğinde tetiklenir
    this.mailSendedSubscription = this.mailingService.onMailSend.subscribe(isSended => {
      this.sendMailDropDown.close();
    });

    //feedback gönderildiğinde tetiklenir
    this.feedbackSendedSubscription = this.feedbackService.onFeedbackSended.subscribe(isSended => {
      this.feedbackDropDown.close();
    });

    this.currentPageChangedSubscription = this.documentListerService._newListComponentChangePage.subscribe(page => {
      this.currentPage = page;
    });

    //d�k�man streami de�i�ti�inde tetiklenir
    this.documentStreamIndexSubscription = this.docViewerServiceService.documentStreamIndexChangedStream$.subscribe(index => {

      this.streamIndex = index;

    });

    if (this.docIndex >= 0) {
      this.documentIndex = this.docIndex;
    }

    this.currentPage = this.newsService.documentSearchModel.currentPage;

    this.currentDocument = this.documents[this.documentIndex];
    this.currentStream = this.currentDocument.streams[0];
    this.isTextView ? this.currentStream.mimeType = 3 : '';
    this.docViewerServiceService.documentChangedSource.next(this.currentDocument);

    if (this.documentIndex > 0 || this.searchModal.currentPage > 1)
      this.isGoPreviousDocumentActive = true;

    this.checkGoNextDocumentActive();
    this.checkGoPreviousDocumentActive();



    this.readedDocumentsService.setReaded(this.currentDocument);
    this.getMyUrl();
  }

  ngOnDestroy(): void {
    this.documentStreamIndexSubscription.unsubscribe();
    this.mailSendedSubscription.unsubscribe();
    this.feedbackSendedSubscription.unsubscribe();
    this.currentPageChangedSubscription.unsubscribe();
  }


  closeBasketDropDown() {
    if (this.basketDropDown)
      this.basketDropDown.close();
  }

  closeDiaDropDown() {
    if (this.diaDropDown)
      this.diaDropDown.close();
  }

  closeFeedbackDropDown() {
    if (this.feedbackDropDown)
      this.feedbackDropDown.close();
  }

  //closePrintDropDown() {
  //  if (this.printDropDown)
  //    this.printDropDown.close();
  //}

  closeSendMailDropDown() {
    if (this.sendMailDropDown)
      this.sendMailDropDown.close();
  }

  closeZoomButtonDropDown() {
    if (this.zoomButtonDropDown)
      this.zoomButtonDropDown.close();
  }

  closeDownloadJpegDropDown() {
    if (this.downloadJpegDropDown)
      this.downloadJpegDropDown.close();
  }

  closeShareDropDown() {
    if (this.shareDropDown)
      this.shareDropDown.close();
  }


  //diğer dropdownları kapatır
  basketDropDownClick() {
    this.closeDiaDropDown();
    this.closeFeedbackDropDown();
    this.closeSendMailDropDown();

  }

  diaDropDownClick() {
    this.closeBasketDropDown();
    this.closeFeedbackDropDown();
    this.closeSendMailDropDown();

  }

  feedbackDropDownClick() {
    this.closeDiaDropDown();
    this.closeBasketDropDown();
    this.closeSendMailDropDown();
    this.closeDownloadJpegDropDown();

  }

  sendMailDropDownClick() {
    this.closeDiaDropDown();
    this.closeBasketDropDown();
    this.closeFeedbackDropDown();
  }

  printDropDownClick() {
    this.closeDiaDropDown();
    this.closeBasketDropDown();
    this.closeFeedbackDropDown();
    this.closeSendMailDropDown();
  }


  closeJepgDownload() {
    this.downloadJpegDropDown.close();
  }

}
