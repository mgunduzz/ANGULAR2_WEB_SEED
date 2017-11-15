import { Injectable, EventEmitter } from '@angular/core';

import { DataService } from "../../../core"
import { DocumentHelperService } from "../../../documents/services/helpers/document-helper.service"
import { DocumentModel } from '../../doc-viewer/entity/document.model'
import {Observable } from 'rxjs'

@Injectable()
export class FeedbackService {
  constructor(private dataService: DataService, private documentHelperService: DocumentHelperService) { }

  onFeedbackSended: EventEmitter<boolean> = new EventEmitter();


  sendFeedback(customerName: string, userName: string, senderName: string, errorTypes: string[], note: string, email: string, doc: DocumentModel) : Observable<any> {
    doc.documentType = this.documentHelperService.getDocumentTypeByDocTypeId(doc.documentTypeId);
    let data = {
      customerName: customerName,
      userName: userName,
      senderName: senderName,
      errorTypes: errorTypes,
      note: note,
      email: email,
      document : doc
    };
    return this.dataService.post(data, "api/feedback/Send");
  }



}
 