import { AuthService } from './../../../core/auth/auth.service';
import { SessionService } from './../../../core/auth/session.service';
import { DataService } from './../../../core/services/data.service';
import { ColumnistsService } from './../../../documents/columnists/services/columnists.service';
import { APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './../../../home/home.component';
import { ToastyModule } from 'ng2-toasty';
import { LoginModule } from './../../../core/auth/login/login.module';
import { DocumentsModule } from './../../../documents/documents.module';
import { SharedModule } from './../../shared.module';
import { AppRoutingModule } from './../../../app-routing.module';
import { RouterModule } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { TestBed, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';


import { FeedbackService } from './feedback.service';

describe('FeedbackService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        SlimLoadingBarModule,RouterModule,AppRoutingModule,SharedModule,DocumentsModule,LoginModule,ToastyModule
      ],
      declarations:[
        HomeComponent
    ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' },ColumnistsService, DataService,SessionService,AuthService,
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

  it('should ...', inject([FeedbackService], (service: FeedbackService) => {
    expect(service).toBeTruthy();
  }));
});
