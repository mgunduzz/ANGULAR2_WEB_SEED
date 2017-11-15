import { Injectable ,EventEmitter} from '@angular/core';
import { SessionService } from "../../../core/auth/session.service"

@Injectable()
export class ReadedDocumentsService {


  newReadedDocument: EventEmitter<number> = new EventEmitter < number >();


  constructor(private sessionService: SessionService) { }

 



  setReaded(document) {


    let index: number = -1;
    if (this.sessionService.readedDocs != undefined) {
      if (this.sessionService.readedDocs.readedDocuments.length === 0) {
        this.sessionService.readedDocs.readedDocuments.push(document.id);
        this.sessionService.readedDocs.expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        this.sessionService.setReadedDocuments(this.sessionService.readedDocs);
        this.newReadedDocument.emit(document.id);

      } else {
        index = this.sessionService.readedDocs.readedDocuments.findIndex(readedDocumentId => document.id === readedDocumentId);
        if (index === -1) {
          this.sessionService.readedDocs.readedDocuments.push(document.id);
          this.sessionService.readedDocs.expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
          this.sessionService.setReadedDocuments(this.sessionService.readedDocs);
          this.newReadedDocument.emit(document.id);
        }
      }
    }
   
  }

  isReadedDocuments(docId): boolean {
    if (this.sessionService.readedDocs.readedDocuments.length > 0) {
      let index: number = -1;
      index = this.sessionService.readedDocs.readedDocuments.findIndex(readedDocumentId => docId === readedDocumentId);

      if (index > -1) {
        return true;
      } else {
        return false;
      }
    }
    else {
      return false;
    }
  }



}
