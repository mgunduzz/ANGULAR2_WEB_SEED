import { DOCUMENTS } from './../../../../assets/mock-data/documents-mock';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocmetadataComponent } from './doc-meta-data.component';
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

describe('DocmetadataComponent', () => {
  let component: DocmetadataComponent;
  let fixture: ComponentFixture<DocmetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(), NgbModule.forRoot(),
        ColumnistsModule, DocumentsModule, LoginModule, SharedModule, RouterModule, ToastyModule
      ],
      declarations: [HomeComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, DataService, SessionService, NgbActiveModal],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocmetadataComponent);
    component = fixture.componentInstance;
    component.document = DOCUMENTS[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
