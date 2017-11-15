import { Response } from '@angular/http';
import { DocumentSearchOptions } from './../../../core/model/document-search-options';
import { Component, ChangeDetectionStrategy, OnInit, Input, ViewChild, animate, style, state, transition, trigger, EventEmitter, Output, OnDestroy, QueryList, ViewChildren, HostListener, ElementRef } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { ResponseData } from '.././entity/responseData.model';
import { Document } from '.././entity/document.model';
import { Order } from "../../../core/model"
import { DocumentListerService } from '../document-lister.service'
import { PaginationBarComponent } from "./pagination-bar/pagination-bar.component";
import { SelectedDocumentsService } from "./selected-documents.service";
import { BasketManagerService } from '../../doc-basket/services/basket-manager.service'
import { DragulaService } from 'ng2-dragula';
import { PopoverContent } from "ngx-popover";
import { SessionService } from "../../../core/auth/session.service"

import { BasketModel } from '../../doc-basket/entity/basket.model'
import { FeedbackService } from '../../feedback/services/feedback.service'
import { FeedbackModalComponent } from '../../feedback/feedback-modal/feedback-modal.component'

import { OurServicesService } from "../../our-services/services/our-services.service"
import { NewsService } from '../../../documents/news/news-service.service'
import { DocumentModel } from "../../../shared/doc-viewer/entity/document.model";
import { ReadedDocumentsService } from "../../../shared/doc-viewer/readedDocuments/readed-documents.service";
import { UUID } from 'angular2-uuid';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


declare var $: any;
declare var moment: any;

/** 
 * documentların listelendiği ve document işlemlerinin yapıldığı componenttir. 
 */
@Component({
  selector: 'document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss'],
  animations: [
    trigger("fadeInOut", [
      state("open", style({ opacity: 1 })),
      state("closed", style({ opacity: 0 })),
      transition("open <=> closed", animate("300ms"))
    ])
  ],
  providers: [PopoverContent],
  entryComponents: [FeedbackModalComponent]
})
export class DocumentListComponent implements OnInit, OnDestroy {


  @Input() isColuminst?: boolean = false;
  @Input() basketData?: any = { sepetAdi: null };
  @Input() basketCategories?: Array<any>;
  @Input() isBasket?: boolean = false;
  @Input() documentData: ResponseData = new ResponseData();
  @Input() currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  @Input() isSimpleList: boolean = false;
  @Input() listType: string = '';
  listName: string = "list";
  newTabPageChanged: EventEmitter<number> = new EventEmitter();
  isShowDocumentList: boolean = true;


  selectedItems: any = 0;
  defaultSortField: string = "";
  defaultSortAsc: boolean = true;
  sortFieldList: Array<any> = [];
  sorting: any = {}
  isSelected = false;
  subscription;
  sortDirection: number = 1;
  exporterItems: string[] = ["xls", "html", "doc", "ppt", "xml", "interview", "downloadFile"];
  unSortedDocuments: Array<any>;
  documentList: Array<Document> = [];
  selectedDocforBasket: Document = new Document;
  selectedDocForFeedBack: Document = new Document;
  onDocumentHover: boolean = false;
  dateTimeFormat: string = 'dd/MM/yyyy hh:mm';
  showBasketList: boolean = false;
  subs: Subscription;
  documentTypeStatics: Array<any> = new Array();
  selectedSingleDocType: string = "";

  @ViewChild(PaginationBarComponent) paginationComponent: PaginationBarComponent;
  @ViewChild('feedBackPopover') feedbackPopover: PopoverContent;
  @ViewChild('exportPopover') exportPopover: PopoverContent;



  @ViewChildren('basketDropDown') basketDropDowns: QueryList<NgbDropdown>;
  @ViewChild('basketDropDownToggle') basketDropDownToggle: ElementRef;

  @ViewChildren('feedbackDropDown') feedbackDropDowns: QueryList<NgbDropdown>;
  @ViewChild('feedbackDropDownToggle') feedbackDropDownToggle: ElementRef;

  lastOpenedFeedbackDropDown: NgbDropdown;

  loopBreaker = true;

  ourServicesItems: string[] = ["text"];

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.feedbackDropDownToggle)
      if (this.controlDropDownForOutsideClik(event, 'FEEDBACK', this.feedbackDropDownToggle))
        this.feedbackDropDowns.toArray()[0].close();

    if (this.basketDropDownToggle)
      if (this.controlDropDownForOutsideClik(event, 'DOC-BASKET-LIST', this.basketDropDownToggle))
        this.basketDropDowns.toArray()[0].close();
  }

  controlDropDownForOutsideClik(event, nodeName: string, toggleEl: ElementRef): boolean {
    let index = event.path.findIndex(p => p.nodeName === nodeName);
    return (index < 0 && event.target !== toggleEl.nativeElement);
  }

  constructor(private documentListerService: DocumentListerService,
    private dragulaService: DragulaService,
    private selectedDocumentsService: SelectedDocumentsService,
    private feedbackService: FeedbackService,
    private popoverContent: PopoverContent,
    private basketManagerService: BasketManagerService,
    private ourServicesService: OurServicesService,
    private newsService: NewsService,
    private readedDocumentsService: ReadedDocumentsService,
    private modalService: NgbModal
  ) {

    this.documentData.documents = new BehaviorSubject<Array<Document>>([]);
    this.documentData.totalCount = new BehaviorSubject<number>(-1);
    this.documentData.currentPage = -1;
    this.documentData.pageViewCount = -1;

    this.documentListerService.onToggleInfoGraphic.subscribe(isShowInfo => {
      this.isShowDocumentList = !isShowInfo;
      this.newsService.isShowInfoGraphic = isShowInfo;
      if (!isShowInfo)
        this.newsService.initSearchModel();
    });







    this.readedDocumentsService.newReadedDocument.subscribe(readedDocumentId => {
      this.setReadedDoc(readedDocumentId);
    });

  }


  setDaragulaOptions() {

  }

  closeFeedbackDropdowns() {
    this.feedbackDropDowns.toArray().forEach(fbDD => {
      fbDD.close();
    });
  }

  trackById(index, item) {
    return item.id;
  }

  isAnyDropDownItemOpened(dropdowns: QueryList<NgbDropdown>): boolean {
    let opened = false;

    dropdowns.toArray().forEach(item => {
      if (item.isOpen())
        opened = true;
    });

    return opened;
  }

  isAnyDropDownOpened(): boolean {
    let anyFeedbackDdOpened = this.isAnyDropDownItemOpened(this.feedbackDropDowns);
    let anyBasketDdOpened = this.isAnyDropDownItemOpened(this.basketDropDowns);


    return (anyBasketDdOpened || anyFeedbackDdOpened);
  }

  docMouseEnter(doc) {
    let open = this.isAnyDropDownOpened();

    if (open) {

    } else {
      this.documentData.documents.value.forEach(item => item.onDocumentHover = false);
      doc.onDocumentHover = true;
    }
  }

  docMouseLeave(doc) {
    if (!this.isAnyDropDownOpened()) {
      this.documentData.documents.value.forEach(item => item.onDocumentHover = false);
    }
  }

  basketDropDownClick(doc: Document, index) {
    this.feedbackDropDowns.toArray().forEach(fbDD => {
      fbDD.close();
    });

    this.selectedDocforBasket = doc;

    this.showBasketList = this.isAnyDropDownItemOpened(this.basketDropDowns);
  }

  feedbackDropDownClick(doc: Document, index) {

    const modalRef = this.modalService.open(FeedbackModalComponent, { size: "sm" });
    modalRef.componentInstance.document = doc;


  }


  documentFeatureClick() {
    this.feedbackDropDowns.toArray().forEach(fbDD => {
      fbDD.close();
    });
    this.basketDropDowns.toArray().forEach(bDD => {
      bDD.close();
    });
  }


  /**
   * drag an drop bittikten sonra row indexleri ayarlar.
   */
  sortDocs() {
    let i = 1;
    let tempDocs = this.documentData.documents.value;
    tempDocs.forEach((data, index) => {
      if (data.rowIndex > 0) {
        data.rowIndex = i;
        i++;
      }
    });
    this.documentData.documents.next(tempDocs);
  }

  toggleFeedback(doc: Document) {
    this.feedbackPopover.show();

    setTimeout(() => {
      this.selectedDocForFeedBack = doc;
    }, 1);

  }
  toggleExport(doc: Document) {
    this.exportPopover.show();

    setTimeout(() => {
      this.selectedDocForFeedBack = doc;
    }, 1);

  }

  closeFeedbackDropdown(index: number, isAll: boolean = false) {
    if (isAll)
      this.feedbackDropDowns.toArray().forEach(item => item.close());
    else
      this.feedbackDropDowns.toArray()[index].close();
  }

  checkInfoGraphicIsVisible() {
    this.isShowDocumentList = !this.newsService.isShowInfoGraphic;
    this.documentListerService.onToggleInfoGraphic.next(this.newsService.isShowInfoGraphic);
  }

  ngOnInit() {
    this.subs = this.documentData.totalCount.subscribe(response => {
      this.documentTypeStatics = response.documentTypeStatics;
    });



    this.isColuminst ? this.listName = "columinst" : '';

    this.newTabPageChanged.subscribe(page => {
      this.documentListerService.changePageClickService(page);
    });

    let this_ = this;
    this.dragulaService.setOptions(this.listName,
      {
        moves: function () {
          return this_.isBasket ? true : false;
        }
      });
    ;

    this.documentListerService.isSimpleList.emit(this.isSimpleList);



    // sorting inital
    this.sorting.field = this.newsService.docTypeSortFields[0].field;
    this.sorting.asc = this.newsService.docTypeSortFields[0].asc;
    this.sortFieldList[0] = this.sorting;
    this.defaultSortAsc = this.sorting.asc;
    this.defaultSortField = this.sorting.field;



    this.feedbackService.onFeedbackSended.subscribe(isSended => {

      setTimeout(() => {
        this.closeFeedbackDropdown(0, true);
      });

      //this.documentData.documents.value.forEach(item => item.onDocumentHover = false);

      this.selectedDocForFeedBack = undefined;
    });

    this.ourServicesService.requestSended.subscribe(isSended => {
      //this.exportPopover.hideFromPopover();
      setTimeout(() => {
        this.selectedDocForFeedBack = undefined;
      }, 1);
    });

    /**
     * sepet görünümünde haberler sürükle bırak ile taşındığında taşıma işlemi biter bitmez bu fonksiyon devreye girer ve rowIndexleri ayarlayan fonksiyonu çağırır.
     */
    this.dragulaService.dragend.subscribe(data => {
      this.sortDocs();
    });


    this.subscription = this.documentData.documents.subscribe(data => {

      this.selectedSingleDocType = "";
      let selectedDocTypes = this.newsService.documentSearchModel.documentTypes;

      if (selectedDocTypes.length === 1 && selectedDocTypes[0].key === 2) {
        this.selectedSingleDocType = "press";
      }

      this.documentList = JSON.parse(JSON.stringify(data));
      this.isSelected = false;
      let selectedItems = this.selectedDocumentsService.selectedItems.getValue();
      if (selectedItems.length > 0) {
        data.forEach(item => {
          let index = -1;
          index = selectedItems.findIndex(selectedItem =>
            item.id == selectedItem.key
          );
          if (index >= 0) {
            item.checked = true;
          }
        });
      }
      data.forEach((doc, index) => {
        this.documentData.documents.value[index].isReaded = this.readedDocumentsService.isReadedDocuments(doc.id);
        //doc.isReaded = this.readedDocumentsService.isReadedDocuments(doc.id);
      });
    });

    this.selectedDocumentsService.removeAllItem.subscribe(data => {
      this.isSelected = false;
      this.selectAllDocumentsChange(false);

    });




  }

  setReadedDoc(readedDocumentId) {


    let index: number = -1;
    index = this.documentData.documents.value.findIndex(document => document.id == readedDocumentId);
    if (index > -1) {
      this.documentData.documents.value[index].isReaded = true;
    }
  }

  openDocInNewTab(doc: Document, isTranslate: boolean = false, isTextView: boolean = false, showMultipleDocument: boolean = true) {

    let tempDoc: Document = JSON.parse(JSON.stringify(doc));
    let tempDocDataDocuments = JSON.parse(JSON.stringify(this.documentData.documents.value));

    let searchModel = this.newsService.documentSearchModel;
    let options: DocumentSearchOptions = {
      isTextView: isTextView,
      showMultipleDocument: showMultipleDocument,
      apiName: this.newsService.searchApi,
      apiFunctionName: this.newsService.searchApiFuncName,
      searchModel: searchModel,
      totalCount: this.newsService.totalCount,
      pageViewCount: this.newsService.documentSearchModel.pageViewCount
    };

    switch (this.listType) {
      case 'columnists':
        options = this.newsService.columnistDocumentSearchOptions;
        break;
      case 'basket':
        options = this.newsService.basketDocumentSearchOptions;
        break;
      case 'archive':
        options = this.newsService.archiveDocumentSearchOptions;
        break;
      
      default:
        break;
    }

    let link: string = `#/app/document/detail/${doc.id}/${doc.documentTypeId}`;
    let uuid = this.documentListerService.setSearchModelToLocalStorage(options);




    link += '/' + uuid;

    if (this.listType === 'archive')
      link += '/archive';
    else if (this.listType === 'columnists')
      link += '/columnists';




    var newWindow: any = window.open(link, "_blank", "");
    newWindow.document.title = 'Interweb -' + tempDoc.title;
    newWindow.appData = {
      document: tempDoc,
      setReaded: this.setReadedDoc,
      documentData: this.documentData,
      documents: tempDocDataDocuments,
      isKunye: false,
      isTranslate: isTranslate,
      newTabPageChanged: this.newTabPageChanged,
      options: options

    };


  }

  openDocInNewTabKunye(doc: Document) {

    this.getSelectedMediaProfileClick(doc);


    //  let link: string = `#/app/document/detail/${doc.id}/${doc.documentTypeId}`;

    //  if (this.listType === 'archive')
    //    link += '/archive';


    //  this.readedDocumentsService.setReaded(doc);
    //  var newWindow: any = window.open(link, "_blank", "");
    //  newWindow.document.title = 'Interweb -' + doc.title;
    //  newWindow.appData = {
    //    document: doc,
    //    documentSearchModel: this.newsService.documentSearchModel,
    //    setReaded: this.setReadedDoc,
    //    documentData: this.documentData,
    //    totalCount: this.newsService.totalCount,
    //    isKunye: true,
    //    docMediaNameId: doc.mediaNameId

    //};


  }



  createNewBasket(doc: Document, documentIndex: number) {
    this.basketManagerService.onOpenDocBasket.emit({ documentList: [doc] });
  }

  addDocToBasket(doc: Document) {
  }

  /** 
  *pagination componenttaki sayfadaki document görüntüleme işlemi EventEmitter ile bu fonksiyona gelir ve data üzerinde onPageViewCount datasını günceller.
  */

  onDocumetViewClick(document: Document, documentIndex: number = 0) {
    this.documentListerService.onOpenDocument.emit({ documentIndex: documentIndex, documentList: this.documentList, isSimpleList: this.isSimpleList });
  }

  changePageViewClick(pageViewCount) {
    this.documentData.pageViewCount = pageViewCount;
  }


  /**
   * haberlerin medya adına tıklandıldığında eğer haber basın haberi ise bu fonksiyon devreye girer ve seçilen haberin künyesi getirmesi için documentlisterdaki fonsiyonu çağır.
   * @param doc
   */
  getSelectedMediaProfileClick(doc: Document) {
    if (!this.isBasket) {
      if (doc.documentTypeId === 2)
        this.documentListerService.getSelectedMediaProfileClick(doc.mediaNameId);
    } else {
      this.documentListerService.getMediaProfileForBasket.emit(doc.id);
    }

  }



  /**
   * sepet görünümdeki manuel sıralama yapılmak istenildiğinde çalışan fonksiyondur.
   * @param selectedDocId sırası değiştirlmek istenen itemin idsi
   * @param newRowIndex yeni sırası
   * @param oldRowIndex eski eski sırasi
   * @param isFromChange
   *girilen sayının 0dan küçükmü ve sepetin toplam itemlerinden büyükmü diye kontrol yapılır.
   * değiştirilmek istenen item tüm listeden splice edilir.
   * daha sonra kalan itemler döngüye sokularak yeni sırasına göre eklenir bu işlemden sonra row indexler yeniden hesaplanır.
   */

  documentIndexChange(selectedDocId, newRowIndex, oldRowIndex, isFromChange) {

    if (newRowIndex !== oldRowIndex) {
      this.loopBreaker = false;
      let tempDocs = [];
      let selectedRowIndex: number = 1;
      let selectedRow: any;
      let index: number = 1;
      let i: number = 1;
      let replaceRowIndex: number = null;
      let isOutOfLimit: boolean = false;
      tempDocs = JSON.parse(JSON.stringify(this.documentData.documents.value));

      if (newRowIndex == null) {
        selectedRowIndex = tempDocs.findIndex(data => {
          if (data.id == selectedDocId) {
            data.rowIndex = oldRowIndex;
            return true;
          }
        });
        this.documentData.documents.next(tempDocs);

      } else {
        if (typeof newRowIndex == 'number') {
          selectedRowIndex = tempDocs.findIndex(data => {
            if (data.rowIndex == newRowIndex && data.id == selectedDocId) {
              return true;
            }
          });
          selectedRow = tempDocs[selectedRowIndex];
          if (newRowIndex <= 0) {
            newRowIndex = 1;
            isOutOfLimit = true;
          } else if (newRowIndex > tempDocs.length) {
            newRowIndex = tempDocs.length;
            isOutOfLimit = true;
          }
          if (isOutOfLimit) {
            selectedRow.rowIndex = newRowIndex;
          }
          tempDocs.splice(selectedRowIndex, 1);

          replaceRowIndex = tempDocs.findIndex(data => {
            if (data.rowIndex == newRowIndex && data.id !== selectedDocId) {
              return true;
            }
          });


          replaceRowIndex >= selectedRowIndex ? replaceRowIndex = replaceRowIndex + 1 : '';
          tempDocs.splice(replaceRowIndex, 0, selectedRow);
          tempDocs.forEach((data, index) => {
            if (data.rowIndex > 0) {
              data.rowIndex = i;
              i++;
            }
          });
          this.documentData.documents.next(tempDocs);
        }
      }
    }
  }


  /**
   * Tüm documentları seçme işlemi buradan yönetilir.
   */
  selectAllDocumentsChange(isSelected) {
    this.selectedItems = 0;


    this.documentData.documents.value.forEach(doc => {
      if (!doc.checked === isSelected) {
        doc.checked = isSelected;
        isSelected
          ? this.selectedDocumentsService.addSelectedItem(doc.id)
          : this.selectedDocumentsService.removeSelectedItem(doc.id);
      }

      if (isSelected && doc.checked)
        this.selectedItems++;
    });
  }

  /**
   *Document seçme işlemi bu fonksiyondan yönetilir
   */
  documentSelectionChange(document, isSelected) {


    if (isSelected) {
      this.selectedItems++;
      this.selectedDocumentsService.addSelectedItem(document.id);
    }
    else if (!isSelected) {
      this.selectedDocumentsService.removeSelectedItem(document.id);
      this.selectedItems--;
    }
  }
  /**
   * 
   * @param selectedSorField listede seçilen sıralama istekleri DocumentListerService ile api gönderilir ve yeni liste response olarak döner
   * 
   */
  sortByClick(selectedSorField: string) {
    if (this.isBasket) {
      this.sortDirection == 1 ? this.sortDirection = 0 : this.sortDirection = 1;
      this.documentListerService.sortBasket.emit({ selectedSorField: selectedSorField, sortDirection: this.sortDirection });
    } else {


      if (this.defaultSortField === selectedSorField) {
        this.defaultSortAsc = !this.defaultSortAsc;
        this.sortFieldList[0].asc = this.defaultSortAsc;

      } else {
        this.defaultSortField = selectedSorField;
        this.sorting.field = selectedSorField;
        this.sorting.asc = this.defaultSortAsc;
        this.sortFieldList[0] = this.sorting;
      }
      let sortinglist = this.newsService.publishDateSortFields;
      switch (selectedSorField) {
        case "MediaName":
          sortinglist = this.newsService.mediaNameSortFields;
          break;
        case "Title":
          sortinglist = this.newsService.titleSortFields;
          break;
        case "DocumentTypeId":
          sortinglist = this.newsService.docTypeSortFields;
          break;
        case "Sales":
          sortinglist = this.newsService.salesSortFields;
          break;
        case "PageNumber":
          sortinglist = this.newsService.pageNumberSortFields;
          break;

      }

      sortinglist[0].asc = this.sorting.asc;
      this.paginationComponent.calcPage(1);
      this.documentListerService.changeSortField(sortinglist);
      this.paginationComponent.selectedPage = 1;
    }
  }

  /**
   * satırlara hover edildiğinde çıkan quick menuden seçilen işlemlere tıklanıldığında çalışan fonksiyondur.
   * eğer metini göster seçeneği seçilmeş ise doc viewerla isTextView değeri true olarak gönderilir.
   * @param exportType
   * @param doc
   */
  exportFileClick(exportType, doc) {
    if (exportType === "text") {
      this.openDocInNewTab(doc, undefined, true, false);
      //this.documentListerService.onOpenDocument.emit({ documentIndex: 0, documentList: [doc], isTextView: true });
    }
    else if (exportType === "translate") {
      this.openDocInNewTab(doc, true);
    }
    else {
      this.selectedDocumentsService.exportFileClick(exportType, doc.id);
    }
  }

  ngOnDestroy() {
    this.dragulaService.destroy(this.listName);

  }

}

