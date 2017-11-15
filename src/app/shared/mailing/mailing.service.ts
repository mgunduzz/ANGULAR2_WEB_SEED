import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs'

import { MailGroup, Mail } from './models/mail-group'
import { DataService } from "../../core"

@Injectable()
export class MailingService {

  constructor(private dataService: DataService) { }

  public onOpenMailSenderModal: EventEmitter<any> = new EventEmitter();
  public onMailSend: EventEmitter<any> = new EventEmitter();

  //Mail 

  public sendMail(model, documents, selectedCategories): Observable<any> {
    let data: any = {};
    data.isAttachment = model.isAttachment;
    data.isBody = model.isBody;
    data.isLink = model.isLink;
    data.isSubcategoryShow = model.isSubcategoryShow;
    data.isDocumentsShow = model.isDocumentsShow;
    data.isDocumentMediasShow = model.isDocumentsMediasShow;
    data.senderName = model.senderName;
    data.subject = model.subject;
    data.documents = documents;
    data.mailToList = model.mailTo;
    data.categories = selectedCategories;

    return this.dataService.post(data, "api/customer/mail/SendMail");
  }

  public searchMails(): Observable<Mail[]> { 
    return this.dataService.post({}, "api/customer/mail/Search"); 
  }

  public saveMail(data: any): Observable<any> {
    return this.dataService.post(data, "api/customer/mail/Save");
  }

  public addNewMail(mail : Mail): Observable<any> {
    let data: any = {};
    data.isActive = true;
    data.userMail = mail;

    return this.saveMail(data);
  }

  public deleteMail(mail: Mail): Observable<any> {
    let data: any = {};
    data.isActive = false;
    data.userMail = mail;

    return this.saveMail(data);
  }

  //Mail Group

  public searchMailGroups(): Observable<Array<MailGroup>> {

    return this.dataService.post({}, "api/customer/mailgroup/Search");
  }

  public saveMailGroup(data: any): Observable<any> {
    return this.dataService.post(data, "api/customer/mailgroup/Save");
  }

  public deleteMailGroup(mailGroup: MailGroup): Observable<any> {
    let data: any = {};
    data.isActive = false;
    data.userMailGroup = mailGroup;

    return this.saveMailGroup(data);
  }

  public  updateMailGroup(mailGroup: MailGroup): Observable<any> {
    let data: any = {};
    data.isActive = true;
    data.userMailGroup = mailGroup;

    return this.saveMailGroup(data);
  }
}
