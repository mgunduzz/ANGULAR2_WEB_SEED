import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DocumentExportService} from '../document-export-service/document-export.service'

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'exporter-modal',
  templateUrl: './exporter-modal.component.html',
  styleUrls: ['./exporter-modal.component.scss']
})
export class ExporterModalComponent implements OnInit {

  @Input() exportType: string;
  @Input() model: any;
  @Input() otherSetting: any;

  dataModal: any = {}

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.dataModal.isCover = false;
    this.dataModal.reportTag = "";
    this.dataModal.highlight = true;
    this.dataModal.isAddDocuments = false;
    this.dataModal.IsDownloadDocumentPdfFile = false;
    this.dataModal.allPage = true;


  }

  exportClick(dataModal) {

    if (this.exportType === 'pdf') {
      if (this.dataModal.IsDownloadDocumentPdfFile) {
        this.model.IsDownloadDocumentPdfFile = this.dataModal.IsDownloadDocumentPdfFile;
      } else {
        if (dataModal.isCover) {
          this.model.Title = dataModal.reportTag;
        }
      }      
      this.model.IsMarked = dataModal.highlight;
    } else if (this.exportType === 'mizanpaj') {
      this.model.Title = dataModal.reportTag;
    } else if (this.exportType === 'word' || this.exportType === 'ppt'){
      this.model.IsMarked = dataModal.highlight;
    } else if (this.exportType === 'analysisExcel') {
      this.model.isAddDocumentsSheet = dataModal.isAddDocuments;
    } else if (this.exportType === 'docViewerPdf') {
      if (this.dataModal.allPage == false)
      {
        this.model.downloadPressFileIndex= this.otherSetting;                   
      }
      this.model.IsMarked = dataModal.highlight;
    } 

    this.activeModal.close(this.model);
  }



}
