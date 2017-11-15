import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment.prod';
import { SessionService } from './../../../core/auth/session.service';
import { DocumentModel } from './../../doc-viewer/entity/document.model';
import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Injectable()
export class ShareLinkGeneratorService {

  constructor(private sessionService: SessionService) {
    this.url = window.location.origin;
  }

  url: string;

  createUrl(doc: DocumentModel): any {
    let adress = this.url;
    return `${adress}/#/app/document/viewer/${doc.uuid}/${this.sessionService.session.user.customerIdEnc}`;
  }

}
