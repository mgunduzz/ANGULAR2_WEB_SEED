import { Injectable, EventEmitter } from '@angular/core';
import { BasketManagerService } from '../../doc-basket/services/basket-manager.service';
import { DocumentExportService } from '../../document-exporter/document-export-service/document-export.service';
import { DocumentListerService } from '../../document-lister/document-lister.service';
import {AgendaService} from '../../agenda/services/agenda.service';
import {AgendaModalComponent}  from "../../agenda/agenda-modal/agenda-modal.component";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RightsService} from "../../../documents/services/rights/rights.service";

@Injectable()
export class OurServicesService {

  requestSended: EventEmitter<boolean> = new EventEmitter();
  columinists: EventEmitter<boolean> = new EventEmitter();
  rightsForTvOrPressArchive: EventEmitter<string> = new EventEmitter();


  constructor(private basketManagerService: BasketManagerService, private modalService: NgbModal, private rightsService: RightsService,
    private agendaService: AgendaService, private documentExportService: DocumentExportService, private documentListerService: DocumentListerService) { }

  /**
   * selected documentlar ve seçilen hizmete göre yapýlak iþlemler burada ayrýlýr.
   * @param serviceItem
   * @param selectedDocument
   */
  serviceClick(serviceItem, selectedDocument) {
    let isHaveRight: boolean = false;
    let url = "";
    switch (serviceItem) {
      case "basket":
        this.basketManagerService.onOpenDocBasket.emit({ documentList: [] });
        break;
      case "pdf":
        this.documentExportService.exportSelectedDocument([{ key: selectedDocument.id }], serviceItem);
        break;
      case "download":
        this.documentExportService.exportSelectedDocument([{ key: selectedDocument.id }], "downloadFile");
        break;
      case "text":
        this.documentListerService.onOpenDocument.emit({ documentIndex: 0, documentList: [selectedDocument], isTextView: true });
        break;
      case "mizanpaj":
        this.documentExportService.exportSelectedDocument([{ key: selectedDocument.id }], "mizanpaj");
        break;
      case "agenda":
        const modalRef = this.modalService.open(AgendaModalComponent, { size: "lg" });
        break;
      case "tvArchive":

        isHaveRight = this.rightsService.checkUserRight("tvArchive");

        if (isHaveRight) {
          url = "#/app/archive/tv";
          window.open(url, '_blank').focus();
        }
        break;
      case "pressArchive":
        isHaveRight = this.rightsService.checkUserRight("pressArchive");
        if (isHaveRight) {
          url = "#/app/archive/press";
          window.open(url, '_blank').focus();
        }

        break;
      case "analysis":
        url = "#/app/analysis";
        window.open(url, '_blank').focus();
        break;
      case "columnist":
        this.documentListerService.onOpenColuminists.emit();
      default:
    }
    this.requestSended.emit(true);

  }

}
