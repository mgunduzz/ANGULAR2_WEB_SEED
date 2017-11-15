import { CategoryListerService } from './../../category-lister/services/category-lister.service';
import { TestBed, inject } from '@angular/core/testing';

import { BasketManagerService } from './basket-manager.service';
import { DocumentsModule } from './../../../documents/documents.module';
import { ColumnistsService } from './../../../documents/columnists/services/columnists.service';
import { ToastyModule } from 'ng2-toasty';
import { AuthService } from './../../../core/auth/auth.service';
import { SessionService } from './../../../core/auth/session.service';
import { APP_BASE_HREF } from '@angular/common';
import { LoginModule } from './../../../core/auth/login/login.module';
import { LoginModalComponent } from './../../../core/auth/login/login-modal/login-modal.component';
import { HomeComponent } from './../../../home/home.component';
import { SharedModule } from './../../../shared/shared.module';
import { AppRoutingModule } from './../../../app-routing.module';
import { RouterModule } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { DataService } from './../../../core/services/data.service';
  
describe('BasketManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        SlimLoadingBarModule,RouterModule,AppRoutingModule,SharedModule,DocumentsModule,LoginModule,ToastyModule
      ],
      declarations:[
        HomeComponent 
    ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' },ColumnistsService, DataService,SessionService,AuthService,CategoryListerService,
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

  it('should ...', inject([BasketManagerService], (service: BasketManagerService) => {
    expect(service).toBeTruthy();
  }));
});
