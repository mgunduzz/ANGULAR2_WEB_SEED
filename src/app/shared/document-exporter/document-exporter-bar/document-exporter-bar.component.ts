import { Component, OnInit, Output, EventEmitter, OnDestroy, trigger, state, animate, transition, style, Input} from '@angular/core';
import {DocumentExportService} from '../document-export-service/document-export.service'
import { Observable, BehaviorSubject, Subscription} from 'rxjs';
import { SelectedDocumentsService } from '../../document-lister/document-list/selected-documents.service';

import { BasketManagerService } from '../../doc-basket/services/basket-manager.service'
import { DocumentModel } from '../../doc-viewer/entity/document.model'
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ExporterModalComponent} from '../exporter-modal/exporter-modal.component'
import { CustomerPressModalComponent } from '../../customer-press/customer-press-modal/customer-press-modal.component'
import { MailSenderModalComponent } from '../../mailing/mail-sender-modal/mail-sender-modal.component'
import {RightsService} from "../../../documents/services/rights/rights.service";
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'document-exporter-bar',
  templateUrl: './document-exporter-bar.component.html',
  styleUrls: ['./document-exporter-bar.component.scss'],
  animations: [
    trigger('shrinkOut', [
      state('in', style({ width: '*' })),
      transition('void => *', [
        style({ width: 0, overflow: 'hidden' }),
        animate(250, style({ width: '*' }))
      ]),
      transition('* => void', [
        style({ width: '*', overflow: 'hidden' }),
        animate(250, style({ width: 0 }))
      ])
    ])
  ]
})
export class DocumentExporterBarComponent implements OnInit, OnDestroy {

  isExporterShow: boolean = false;
  selectedDocuments: Array<any>;
  @Output() beforeRequest: EventEmitter<any> = new EventEmitter<any>();
  @Output() afterRequest: EventEmitter<any> = new EventEmitter<any>();
  @Input() isFromBasketView:boolean=false;
  securedAgendaLink:any;
  iframeShow:boolean=false;

  beforeRequestSubs: Subscription;
  afterRequestSubs: Subscription;
  exportFileFromList: Subscription;

  constructor(
    private documentExportService: DocumentExportService,
    private selectedDocumentsService: SelectedDocumentsService,
    private basketManagerService: BasketManagerService,
    private modalService: NgbModal,
    private rightsService: RightsService,
    private sanitizer: DomSanitizer
  ) {
    this.beforeRequestSubs = this.documentExportService.beforeRequest.subscribe(data => { this.beforeRequest.emit() });
    this.beforeRequestSubs = this.documentExportService.afterRequest.subscribe(data => { this.afterRequest.emit() });
    this.exportFileFromList = this.selectedDocumentsService.exportFile.subscribe(data => {
      this.documentExportService.exportSelectedDocument(data[0].documentId, data[0].exportType);
    });


    this.documentExportService.url.subscribe(data => {
      this.securedAgendaLink = this.sanitizer.bypassSecurityTrustResourceUrl(data);
      this.iframeShow = true;

    });
  }
  exporterItemsOnlyWork: any[] = [
    { m: "pdf", c: "#cc4b4c", i: "fa-file-pdf-o" },
    { m: "mizanpaj", c: "#9db717", i: "fa-file-text-o" },
    { m: "xls", c: "#91cda0", i: "fa-file-excel-o" },
    { m: "word", c: "#09c4ff", i: "fa fa-file-word-o" },
    { m: "ppt", c: "#ff0000", i: "fa-file-powerpoint-o" },
    { m: "downloadFile", c: "gray", i: "fa-download" },
    { m: "basket", c: "#ec971f", i: "fa-shopping-basket" },
    { m: "mail", c: "#5a96ff", i: "fa fa-envelope" },
    { m: "customerPress", c: "#5a96ff", i: "fa fa-newspaper-o" },
    { m: "analysis", c: "#b1681b", i:"fa fa-line-chart"}
  
  ];
  exporterItems: string[] = ["pdf", "xls", "html", "doc", "ppt", "xml", "interview", "downloadFile", "basket", "mail"];
  ngOnInit() {
    this.selectedDocumentsService.selectedItems.subscribe(data => {
      if (data.length > 0) {
        this.selectedDocuments = data; this.showDocumentExporterBar();
      }
      else { this.hideDocumentExporterBar() }
    });

  }
  showDocumentExporterBar() { this.isExporterShow = true; }
  hideDocumentExporterBar() { this.isExporterShow = false; }

  slectedDocumentsExpoertClick(selectedExportType) {
    let isHaveRight: boolean = false;

    let exportType: number;
    let model = {};
    if (selectedExportType === 'basket') {
      let selectedDocsForBasket: Array<DocumentModel> = new Array();
      this.selectedDocuments.forEach(doc => {
        selectedDocsForBasket.push({ id: doc.key });
      });
      this.basketManagerService.onOpenDocBasket.emit({ documentList: selectedDocsForBasket });
    }
    else if (selectedExportType === 'mail') {
      const modalRef = this.modalService.open(MailSenderModalComponent, { windowClass: "mail-sender-modal" });

      modalRef.componentInstance.documents = this.selectedDocuments;
    }
    else if (selectedExportType === "analysis") {
      this.beforeRequest.emit();


      this.documentExportService.getAnalysisExcelFile({ isAddDocumentsSheet: true, Ids: this.selectedDocuments, DocumentTypeId: [{ key: "2" }], fieldList: ["Id"]});

    }
    else if (selectedExportType ==='customerPress')
    {      


      isHaveRight = this.rightsService.checkUserRight("customerPress");

      if (isHaveRight) {
        const modalRef = this.modalService.open(CustomerPressModalComponent,
          { size: 'lg', windowClass: "customer-press-modal" });
        modalRef.componentInstance.documentIds = this.selectedDocuments;
      }
      //window.open("#/app/press", selectedExportType, "height=768,width=1024");
    }

    else if (((selectedExportType === 'xls') && (this.isFromBasketView))) {
      
      this.documentExportService.exportSelectedDocument(this.selectedDocuments, "xlsMecra");
    }

    else {
      this.documentExportService.exportSelectedDocument(this.selectedDocuments, selectedExportType);


    }
  }

  removeSelectedDocsClick() {
    this.selectedDocumentsService.removeAllItemClick();
  }

  createLink():string {
    let link: string = "#/app/press/";
    this.selectedDocuments.forEach(data => {
      link += "?"+data.key;
    });
    return link;
  }


  ngOnDestroy() {

  }
}
