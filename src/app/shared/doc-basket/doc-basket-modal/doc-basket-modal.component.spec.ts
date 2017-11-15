import { CategoryListerService } from './../../category-lister/services/category-lister.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocBasketModalComponent } from './doc-basket-modal.component';
import { DocumentsModule } from './../../../documents/documents.module';
import { ColumnistsModule } from './../../../documents/columnists/columnists.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastyModule } from 'ng2-toasty';
import { SessionService } from './../../../core/auth/session.service';
import { DataService } from './../../../core/services/data.service';
import { AuthService } from './../../../core/auth/auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';
import { LoginModule } from './../../../core/auth/login/login.module';
import { HomeComponent } from './../../../home/home.component';
import { TranslateModule } from '@ngx-translate/core';

describe('DocBasketModalComponent', () => {
  let component: DocBasketModalComponent;
  let fixture: ComponentFixture<DocBasketModalComponent>; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        TranslateModule.forRoot(),NgbModule.forRoot(), 
        ColumnistsModule,DocumentsModule,LoginModule,SharedModule,RouterModule,ToastyModule
      ],
      declarations: [ HomeComponent ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, DataService, SessionService,NgbActiveModal,CategoryListerService],

    })
    .compileComponents(); 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocBasketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
