import { Subscription } from 'rxjs';
import { AuthService } from './../../../core/auth/auth.service';
import { SessionService } from './../../../core/auth/session.service';
import { DataService } from './../../../core/services/data.service';
import { ColumnistsService } from './../../../documents/columnists/services/columnists.service';
import { MockBackend } from '@angular/http/testing';
import { APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './../../../home/home.component';
import { ToastyModule } from 'ng2-toasty';
import { LoginModule } from './../../../core/auth/login/login.module';
import { DocumentsModule } from './../../../documents/documents.module';
import { SharedModule } from './../../shared.module';
import { AppRoutingModule } from './../../../app-routing.module';
import { RouterModule } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { BaseRequestOptions, Http } from '@angular/http';
import { TestBed, inject } from '@angular/core/testing';

import { AgendaService } from './agenda.service';

describe('AgendaService', () => {
  let subject: AgendaService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SlimLoadingBarModule, RouterModule, AppRoutingModule, SharedModule, DocumentsModule, LoginModule, ToastyModule
      ],
      declarations: [
        HomeComponent
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, ColumnistsService, DataService, SessionService, AuthService,
        MockBackend,
        BaseRequestOptions,
      {
        provide: Http,
        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backendInstance, defaultOptions);
        },
        deps: [MockBackend, BaseRequestOptions]
      },
        DataService
      ]
    });
  });

  beforeEach(inject([AgendaService], (agendaService: AgendaService) => {
    subject = agendaService;
  }));

  it('should ...', () => {
    expect(subject).toBeTruthy();
  });

  it('should run sortByDate', () => {

    let data = JSON.parse('[{"id":5769,"title":"6 EYLÜL 2017 ÇARŞAMBA GÜNDEM HABERLERİ","publishDate":"2017-09-06T00:00:00","rowIndex":1},{"id":5770,"title":"7 EYLÜL 2017 PERŞEMBE GÜNDEM HABERLERİ","publishDate":"2017-09-07T00:00:00","rowIndex":2},{"id":5771,"title":"08 EYLÜL 2017 CUMA GÜNDEM HABERLERİ","publishDate":"2017-09-08T00:00:00","rowIndex":3},{"id":5772,"title":"09 EYLÜL 2017 CUMARTESİ GÜNDEM HABERLERİ","publishDate":"2017-09-09T00:00:00","rowIndex":4},{"id":5773,"title":"10 EYLÜL 2017 PAZAR GÜNDEM HABERLERİ","publishDate":"2017-09-10T00:00:00","rowIndex":5},{"id":5774,"title":"11 EYLÜL 2017 PAZARTESİ GÜNDEM HABERLERİ","publishDate":"2017-09-11T00:00:00","rowIndex":6},{"id":5775,"title":"12 EYLÜL 2017 SALI GÜNDEM HABERLERİ","publishDate":"2017-09-12T00:00:00","rowIndex":7},{"id":5776,"title":"13 EYLÜL 2017 ÇARŞAMBA GÜNDEM HABERLERİ","publishDate":"2017-09-13T00:00:00","rowIndex":8}]');
    let subscription: Subscription = subject.agendaList.subscribe(data => {
      if (data.length > 0) {
        let sortedData = JSON.parse('[{"id":5776,"title":"13 EYLÜL 2017 ÇARŞAMBA GÜNDEM HABERLERİ","publishDate":"2017-09-13T00:00:00","rowIndex":8},{"id":5775,"title":"12 EYLÜL 2017 SALI GÜNDEM HABERLERİ","publishDate":"2017-09-12T00:00:00","rowIndex":7},{"id":5774,"title":"11 EYLÜL 2017 PAZARTESİ GÜNDEM HABERLERİ","publishDate":"2017-09-11T00:00:00","rowIndex":6},{"id":5773,"title":"10 EYLÜL 2017 PAZAR GÜNDEM HABERLERİ","publishDate":"2017-09-10T00:00:00","rowIndex":5},{"id":5772,"title":"09 EYLÜL 2017 CUMARTESİ GÜNDEM HABERLERİ","publishDate":"2017-09-09T00:00:00","rowIndex":4},{"id":5771,"title":"08 EYLÜL 2017 CUMA GÜNDEM HABERLERİ","publishDate":"2017-09-08T00:00:00","rowIndex":3},{"id":5770,"title":"7 EYLÜL 2017 PERŞEMBE GÜNDEM HABERLERİ","publishDate":"2017-09-07T00:00:00","rowIndex":2},{"id":5769,"title":"6 EYLÜL 2017 ÇARŞAMBA GÜNDEM HABERLERİ","publishDate":"2017-09-06T00:00:00","rowIndex":1}]');
        expect(data).toEqual(sortedData);
        subscription.unsubscribe();
      }
    });

    subject.sortByDate(data);

    expect(subject).toBeTruthy();
  });
});
