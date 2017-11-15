import { transition } from '@angular/animations';
import { DocViewerServiceService } from './doc-viewer-service.service';
import { Subscription, Observable } from 'rxjs';
import { DOCUMENTS, PRESS_DOCUMENT } from './../../../assets/mock-data/documents-mock';
import { SessionService } from './../../core/auth/session.service';
import { DataService } from './../../core/services/data.service';
import { AuthService } from './../../core/auth/auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './../../home/home.component';
import { ToastyModule } from 'ng2-toasty';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared.module';
import { LoginModule } from './../../core/auth/login/login.module';
import { DocumentsModule } from './../../documents/documents.module';
import { ColumnistsModule } from './../../documents/columnists/columnists.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { fakeAsync, async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DocViewerComponent } from './doc-viewer.component';

describe('DocViewerComponent', () => {
  let component: DocViewerComponent;
  let fixture: ComponentFixture<DocViewerComponent>;
  let subject: DocViewerServiceService = null;

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

  beforeEach(inject([DocViewerServiceService], (docViewerServiceService: DocViewerServiceService) => {
    subject = docViewerServiceService;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocViewerComponent);
    component = fixture.componentInstance;
    component.currentDocument = DOCUMENTS[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run successfully fillDocumentFields when stream already existed ', async(() => {
    let subscription: Subscription = subject.documentStreamIndexChangedStream$.subscribe(streamIndex => {
      subscription.unsubscribe();
    });

    component.currentDocument = PRESS_DOCUMENT;
    component.fillDocumentFields();
    expect(component.passData).toEqual(true);
  }));

  it('should run successfully fillDocumentFields when stream null ', fakeAsync(() => {
    const spy = spyOn(subject, 'loadDocumentFieldsForStream').and.returnValue(
      Observable.create(observer => {
        observer.next(PRESS_DOCUMENT)
      })
    );

    component.currentDocument = <Document>JSON.parse(JSON.stringify(PRESS_DOCUMENT)); 
    component.currentDocument.streams = null;

    component.fillDocumentFields();

    expect(component.passData).toEqual(true);
    expect(component.currentDocument.streams).toBeTruthy();
    expect(spy.calls.any()).toEqual(true);
  }));

  it('should run successfully fillDocumentFields when isControlledByToolbar false ', fakeAsync(() => {
    const spy = spyOn(subject, 'loadDocumentFieldsForStream').and.returnValue(
      Observable.create(observer => {
        observer.next(PRESS_DOCUMENT)
      })
    );

    component.currentDocument = <Document>JSON.parse(JSON.stringify(PRESS_DOCUMENT)); 
    component.currentDocument.streams = null;
    component.isControlledByToolbar = false;
    component.ngOnInit();

    expect(component.passData).toEqual(true);
    expect(component.currentDocument.streams).toBeTruthy();
    expect(spy.calls.any()).toEqual(true);
  }));

});
