import { DOCUMENTS, INTERNET_DOCUMENT, PRESS_DOCUMENT } from './../../../../assets/mock-data/documents-mock';
import { SessionService } from './../../../core/auth/session.service';
import { DataService } from './../../../core/services/data.service';
import { AuthService } from './../../../core/auth/auth.service';
import { ToastyModule } from 'ng2-toasty';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared.module';
import { LoginModule } from './../../../core/auth/login/login.module';
import { DocumentsModule } from './../../../documents/documents.module';
import { APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './../../../home/home.component';
import { ColumnistsModule } from './../../../documents/columnists/columnists.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocstromcontainerComponent } from './doc-strem-container.component';

describe('DocstromcontainerComponent', () => {
  let component: DocstromcontainerComponent;
  let fixture: ComponentFixture<DocstromcontainerComponent>;

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
    fixture = TestBed.createComponent(DocstromcontainerComponent);
    component = fixture.componentInstance;
    component.document = DOCUMENTS[0];
    component.doc = component.document;
    component.currentStream = component.document.streams[0];
    component.currentStreamIndex = 0;


    fixture.detectChanges();
  });

  it('should generate text stream keywords', () => {
    component.document = INTERNET_DOCUMENT;
    component.currentStream = component.document.streams[0];
    component.currentStreamIndex = 0;

    component.currentStreamChanged();

    expect(component.keywords.length).toBeGreaterThan(0);
  });

  it('should generate stream keywords', () => {
    component.document = PRESS_DOCUMENT;
    component.currentStream = component.document.streams[0];
    component.currentStreamIndex = 0;

    component.currentStreamChanged();

    expect(component.keywords.length).toBeGreaterThan(0);
  });

  it('should go next stream works', () => {
    component.document = PRESS_DOCUMENT;
    component.currentStream = component.document.streams[0];
    component.currentStreamIndex = 0;

    component.onNext();

    expect(component.currentStreamIndex).toEqual(1);
    expect(component.currentStream).toEqual(component.document.streams[1]);
  });

  it('should go previous stream works', () => {
    component.document = PRESS_DOCUMENT;
    component.currentStream = component.document.streams[1];
    component.currentStreamIndex = 1;

    component.onPrevious();

    expect(component.currentStreamIndex).toEqual(0);
    expect(component.currentStream).toEqual(component.document.streams[0]);
  });


});
