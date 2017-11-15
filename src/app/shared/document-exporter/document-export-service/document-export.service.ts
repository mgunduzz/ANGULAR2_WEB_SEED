import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { DataService } from '../../../core/services/data.service'
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExporterModalComponent } from '../exporter-modal/exporter-modal.component'
import { environment } from "../../../../environments/environment"
import {CategoryListerService  } from  "../../category-lister/services/category-lister.service"

@Injectable()
export class DocumentExportService implements OnInit {
  isDocumentSelected: boolean = false;
  beforeRequest: EventEmitter<any> = new EventEmitter<any>();
  afterRequest: EventEmitter<any> = new EventEmitter<any>();
  getfiles: EventEmitter<any> = new EventEmitter<any>();
  url: EventEmitter<string> = new EventEmitter<string>();
  exportName: string;
  exportType: number;
  selectedCats:any={};
  constructor(private dataService: DataService, private modalService: NgbModal,
    private  categoryListerService: CategoryListerService) {

    this.categoryListerService.selectedCategories.subscribe(data => {
      this.selectedCats = {};
      if (data.selectedCats.length == 0) {

      } else {
        let selecCat: any = [];
        let parentCats: any = [];
        let tempId: number = 0;
        data.selectedCats.forEach(cat => {
          tempId = 0;
          let index = parentCats.findIndex(parId => parId === cat.parentCat);
          if (index === -1) {
            parentCats.push(cat.parentCat);
          }
        });
        this.selectedCats = {};

        parentCats.forEach(parentCatId => {
          selecCat = [];
          data.selectedCats.forEach(cat => {

            if (cat.parentCat == parentCatId) {
              selecCat.push(cat.key)
            }
          })
          this.selectedCats[parentCatId] = selecCat;
        });
      }
    });

  }
  private apiUrl: string;
  private streamaApiUrl: string = environment.STREAM_API_URL;

  ngOnInit() {


  }


  analysisExcelExport(searchModel) {
    const modalRef = this.modalService.open(ExporterModalComponent, { size: "sm", windowClass: "exporter-modal" });
    modalRef.componentInstance.model = searchModel;
    modalRef.componentInstance.exportType = "analysisExcel";
    modalRef.result.then((response) => {
      this.beforeRequest.next();
      this.getAnalysisExcelFile(response);
    });

  }

  getAnalysisExcelFile(model) {
    model.selectedCategories = this.selectedCats;
    model.saveNameFormat = 3;
    this.dataService.post(model, "api/analysis/export").subscribe(data => {
      let isiOSDevice = navigator.userAgent.match(/ipad|iphone/i);
        if (isiOSDevice) {
          window.open(data.fileUrl);
        } else {
          this.url.next(data.fileUrl);
        }
        this.afterRequest.next();
    },
      err => {
        this.afterRequest.next();
      }
    );
  }



  exportSelectedDocument(items, selectedExportType: string,otherSetting=null) {
    let exportType: number;
    let model = {};
    this.apiUrl = "api/export/ExecuteTask";
    this.exportName = selectedExportType;
    if (selectedExportType === "pdf" || selectedExportType === "docViewerPdf" || selectedExportType === "mizanpaj" || selectedExportType === "ppt" || selectedExportType === "word") {


      const modalRef = this.modalService.open(ExporterModalComponent, { size: "sm", windowClass: "exporter-modal" });
      if (selectedExportType === "pdf" || selectedExportType === "docViewerPdf" )
      { this.exportType = 1 }
      else if (selectedExportType === "mizanpaj")
      { this.exportType = 17; }
      else if (selectedExportType === "word")
      { this.exportType = 5; }     
      else
      { this.exportType = 7; }
      model = { results: items, exportTypes: this.exportType }
      modalRef.componentInstance.model = model;
      modalRef.componentInstance.exportType = selectedExportType;
      modalRef.componentInstance.otherSetting = otherSetting;

      modalRef.result.then((response) => {
        this.getFile(response);
      });


    }
    else {
      this.beforeRequest.next();

      switch (selectedExportType) {
        case "xls":
          model = { results: items, exportTypes: 3 }
          break;
        case "xlsMecra":
          model = { results: items, exportTypes: 23 }
          break;
        case "snapshot":
          model = { results: items, exportTypes: 19, internetSnapShotPdf: true }
          break;
        case "xml":
          model = { results: items, exportTypes: 9 }
          break;
        case "html":
          model = { results: items, exportTypes: 11 }
          break;
        case "downloadFile":
          model = { results: items, exportTypes: 13 }
          break;
        case "interview":
          model = { results: items, exportTypes: 15 }
          break;
        case "downloadNewsPage":
          this.apiUrl="api/document/GenerateDocumentParentPageUrl";
          model = {
            Ids: items, currentIndex: otherSetting, DocumentTypeId: [{ key: "2" }], fieldList:["Id"]}
          break;
        case "jpeg":
          model = { results: items, exportTypes: 21, isMarked: otherSetting.isMarked, isAddKunye: otherSetting.isAddKunye, downloadPressFileIndex: otherSetting.downloadPressFileIndex, size:otherSetting.size  }          
          break;
        default:
          break;
      }
      this.getFile(model);
    }
  }



  getFile(model) {
    this.beforeRequest.next();
    model.saveNameFormat = 3;
    model.selectedCategories = this.selectedCats;
    this.dataService.post(model, this.apiUrl).subscribe(data => {

        let isiOSDevice = navigator.userAgent.match(/ipad|iphone/i);
        if (isiOSDevice) {
          window.open(data.fileUrl);
        }
        else
        {
          if (this.exportName === "docViewerPdf" || this.exportName === "mizanpaj") {
            let str = data.fileUrl;
            let res = str.split("&cd=true", 1);
            window.open(res);

          }
          else if (this.exportName === "downloadNewsPage") {
            let stringUrl: string = this.streamaApiUrl + "streamfile.ashx?uuid=" + data.value + "&cd=true";
            this.url.next(stringUrl);

          }

          else {
            this.url.next(data.fileUrl);
          }

        }

      this.afterRequest.next();
    }, err => {
      this.afterRequest.next();
    }
    );

  }


}
