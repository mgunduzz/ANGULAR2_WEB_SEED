import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from "../../../core"
import { Observable } from 'rxjs'

@Injectable()
export class HelpBubbleService {

  changeSuggestionMode: EventEmitter<boolean> = new EventEmitter();

  constructor(private dataService: DataService) { }

  sendFeedback(
    customerName: string, userName: string, senderName: string,
     errorTypes: string[], note: string, email: string): Observable<any> {
    let data = {
      customerName: customerName,
      userName: userName,
      senderName: senderName,
      errorTypes: errorTypes,
      note: note,
      email: email
    };
    return this.dataService.post(data, "api/feedback/Send");
  }


}
