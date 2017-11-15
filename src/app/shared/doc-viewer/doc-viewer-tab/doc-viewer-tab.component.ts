import { TranslateService } from '@ngx-translate/core';
import { AuthGuard } from './../../../core/auth/auth.guard';
import { AuthService } from './../../../core/auth/auth.service';
import { SessionService } from './../../../core/auth/session.service';
import { DocumentSearchOptions } from './../../../core/model/document-search-options';
import { DocumentHelperService } from './../../../documents/services/helpers/document-helper.service';
import { DocumentListerService } from './../../document-lister/document-lister.service';
import { Location } from '@angular/common';
import { DocumentModel } from './../entity/document.model';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input, ViewEncapsulation, HostListener } from '@angular/core';
import { DocstromcontainerComponent } from "../doc-strem-container/doc-strem-container.component";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NewsService } from "../../../documents/news/news-service.service"
import { DocViewerServiceService } from "../doc-viewer-service.service"
declare var moment: any;

@Component({
  selector: 'doc-viewer-tab',
  templateUrl: './doc-viewer-tab.component.html',
  encapsulation: ViewEncapsulation.None,

  styleUrls: ['./doc-viewer-tab.component.scss']
})
export class DocViewerTabComponent implements OnInit, OnDestroy {

  currentDocument: DocumentModel = new DocumentModel();

  currentPage: number = 1;
  currentPageViewCount: number = 20;
  documents: DocumentModel[] = [];
  documentIndex: number = 0;
  isTextView: boolean = false;
  searchModal: any;
  showMultipleDocument: boolean = true;
  publicView: boolean = false;
  documentSearchForMultipleDocumentsSubscription: Subscription;
  documentSearchForMultipleWhenSearchModelUndefinedDocumentsSubscription: Subscription;
  documentSearchForSingleDocumentsSubscription: Subscription;
  uuid: string;
  docId: number;
  docTypeId: number;
  isTranslate: boolean = false;
  options: DocumentSearchOptions;

  constructor(private activatedRoute: ActivatedRoute,
    private newsService: NewsService,
    private docViewerServiceService: DocViewerServiceService,
    private titleService: Title,
    private location: Location,
    private documentListerService: DocumentListerService,
    private documentHelperService: DocumentHelperService,
    private sessionService: SessionService,
    private authGuard: AuthGuard,
    private translate: TranslateService
  ) {

    /**
     * route paramtre listesinden d�k�man id'sini e�er varsa searchmodeli �eker 
     */
    this.activatedRoute.params.subscribe((params: Params) => {
      this.docId = params['id'];
      this.docTypeId = params['docTypeId'];
      let docUUID = params['docUUID'];
      let custoUUID = params['custoUUID'];
      let listType = params['listType'];

      this.searchModal = this.newsService.documentSearchModel;

      if (typeof window.parent.appData !== 'undefined') {
        this.isTranslate = window.parent.appData.isTranslate;
        if (this.isTranslate) { this.showMultipleDocument = false; }
        window.parent.appData.setReaded(this.docId);
      }
      if (typeof listType != 'undefined') {
        if (listType === 'archive') {
          this.newsService.searchApi = 'archive';
          this.newsService.documentSearchModel.documentTypes = [{ key: this.docTypeId }];
        } else if (listType === 'columnists') {
          this.newsService.searchApi = 'Columnists';
          this.newsService.searchApiFuncName = 'SearchDocuments';
          this.newsService.documentSearchModel.documentTypes = [{ key: this.docTypeId }];
        }
      }

      //eğer docUUId ve custoUUId undefined değilse bu link public linktir. önceki ve sonraki haber özelliği pasiftir
      if (typeof docUUID != 'undefined' && typeof custoUUID != 'undefined') {
        let requestDoc: DocumentModel = {
          uuid: docUUID,
          custoUUID: custoUUID
        };

        this.publicView = true;
        this.showMultipleDocument = false;
        this.newsService.searchApiFuncName = 'View';

        this.documentSearchForSingleDocumentsSubscription = this.docViewerServiceService
          .loadDocumentFieldsForStream(requestDoc, true, undefined, true).subscribe(doc => {
            doc.streams = this.docViewerServiceService.getDocumentStreams(doc);

            this.documents = [doc];
            this.currentDocument = doc;
            this.setTabTitle(this.currentDocument);
          });

      } else {


        if (params['uuid']) {
          //eğer uuid undefined değilse local storagedan uuid id kullanılarak searchModel çekilir
          this.uuid = params['uuid'];
          let options = JSON.parse(this.documentListerService.getSearchModelFromLocalStorage(this.uuid));
          this.options = options;

          this.isTextView = this.options.isTextView;
          this.showMultipleDocument = this.options.showMultipleDocument;

          if (options.searchModel != null) {
            let searchModel = options.searchModel;
            searchModel.startDateTime = moment(searchModel.startDateTime)._d;
            searchModel.endDateTime = moment(searchModel.endDateTime)._d;
            this.newsService.documentSearchModel = searchModel;
            this.searchModal = searchModel;

            //eğer window.parent.appData undefined değilse direkt appData içindeki documents ve total count verileri kullanılır.
            if (typeof window.parent.appData !== 'undefined') {
              if (typeof window.parent.appData.documents !== 'undefined') {
                this.documents = window.parent.appData.documents;
                this.newsService.totalCount = window.parent.appData.options.totalCount;

                this.documentIndex = this.documents.findIndex(item =>
                  item.id == this.docId
                );

                this.currentDocument = this.documents[this.documentIndex];

                this.docViewerServiceService.loadDocumentFieldsForStream(this.currentDocument, true).subscribe(doc => {
                  doc.streams = this.docViewerServiceService.getDocumentStreams(doc);

                  this.documents[this.documentIndex] = doc;
                  this.currentDocument = doc;
                  this.setTabTitle(this.currentDocument);
                });
              }
            } else {
              //eğer window.parent.appData undefined ise localStoragedan çekilen searchModel kullanılar veriler tekrardan çekilir

              this.newsService.searchDocumentByApiOptions(this.searchModal, this.options.apiName, this.options.apiFunctionName).subscribe(response => {
                let responseDocuments = (this.options.apiName === "basket" ? response : response.results.documents);
                if (this.options.apiName === "basket") {
                  responseDocuments.forEach((doc, index) => {
                    let newDoc = this.documentHelperService.convertBasketDocumentToDefaultDocument(doc, index);
                    this.documents.push(newDoc);
                  });

                  this.newsService.totalCount = responseDocuments.length;
                } else {
                  this.newsService.totalCount = response.totalCount;
                  this.documents = responseDocuments;
                }

                this.documentIndex = this.documents.findIndex(item =>
                  item.id == this.docId
                );

                this.currentDocument = this.documents[this.documentIndex];

                this.docViewerServiceService.loadDocumentFieldsForStream(this.currentDocument, true).subscribe(doc => {
                  doc.streams = this.docViewerServiceService.getDocumentStreams(doc);
                   
                  this.documents[this.documentIndex] = doc;
                  this.currentDocument = doc;
                  this.setTabTitle(this.currentDocument);
                }); 
              });

            }


          } else {
            //localStoragedan search model çekilemez ise döküman tek başına görüntülenir.önceki ve sonraki haber özelliği pasif olunur.
            this.loadForSingleDocument();
          }

        } else {
          //eğer uuid undefined ise  döküman tek başına görüntülenir.önceki ve sonraki haber özelliği pasif olunur.

          this.loadForSingleDocument();
        }



      }

      if (!this.publicView) {
        if (this.sessionService.isLoggedIn) {
          if (this.translate.currentLang != this.sessionService.session.user.lang.lang) {

             this.translate.setDefaultLang(this.sessionService.session.user.lang.lang);
             this.translate.use(this.sessionService.session.user.lang.lang);
           moment.lang(this.sessionService.session.user.lang.lang);
         }

         return true;
     }
      }

    });
  }


  setTabTitle(doc: DocumentModel) {
    this.titleService.setTitle('Interweb - ' + this.currentDocument.title);
  }


  changeCurrentDoc(response) {

    if (typeof window.parent.appData !== 'undefined') {
      window.parent.appData.setReaded(response.docId);


      if (response.pageChanged !== false) {
        window.parent.appData.newTabPageChanged.emit(response.searchModel.currentPage);
      }
    }


    if (response.pageChanged !== false) {
      this.documentListerService.removeSearchModelFromLocalStorage(this.uuid);

      this.uuid = this.documentListerService.setSearchModelToLocalStorage(this.options);

      let hashArray = window.location.hash.split('/');
      hashArray[6] = this.uuid;
      hashArray.splice(0, 1);
      this.location.go('/' + hashArray.join('/'));
    }



    let hashArray = window.location.hash.split('/');
    hashArray[4] = response.docId.toString();
    hashArray.splice(0, 1);
    hashArray[5] = this.uuid;

    this.location.go('/' + hashArray.join('/'));
  }

  ngOnInit() {

    this.sessionService.showFooter.next(false);

  }

  ngOnDestroy() {
    if (this.documentSearchForMultipleDocumentsSubscription)
      this.documentSearchForMultipleDocumentsSubscription.unsubscribe();

    if (this.documentSearchForMultipleWhenSearchModelUndefinedDocumentsSubscription)
      this.documentSearchForMultipleWhenSearchModelUndefinedDocumentsSubscription.unsubscribe();

    if (this.documentSearchForSingleDocumentsSubscription)
      this.documentSearchForSingleDocumentsSubscription.unsubscribe();

  }

  loadForSingleDocument() {
    this.showMultipleDocument = false;

    let requestDoc: DocumentModel = { id: this.docId, documentTypeId: this.docTypeId };
    this.docViewerServiceService.loadDocumentFieldsForStream(requestDoc, true).subscribe(doc => {
      doc.streams = this.docViewerServiceService.getDocumentStreams(doc);

      this.documents = [doc];
      this.currentDocument = doc;
      this.setTabTitle(this.currentDocument);
    });
  }
}
