import { Document } from './../../../document-lister/entity/document.model';
import { DOCUMENTS, PRESS_DOCUMENT } from './../../../../../assets/mock-data/documents-mock';
import { DocumentHelperService } from './../../../../documents/services/helpers/document-helper.service';
import { SlimLoadingBarModule, SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DocViewerServiceService } from './../../doc-viewer-service.service';
import { SessionService } from './../../../../core/auth/session.service';
import { DataService } from './../../../../core/services/data.service';
import { AuthService } from './../../../../core/auth/auth.service';
import { SharedModule } from './../../../shared.module';
import { LoginModule } from './../../../../core/auth/login/login.module';
import { DocumentsModule } from './../../../../documents/documents.module';
import { HomeComponent } from './../../../../home/home.component';
import { ColumnistsModule } from './../../../../documents/columnists/columnists.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastyModule } from 'ng2-toasty';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ImageviewerComponent } from './image-viewer.component';

describe('ImageviewerComponent', () => {
  let component: ImageviewerComponent;
  let fixture: ComponentFixture<ImageviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(), NgbModule.forRoot(),
        ColumnistsModule, DocumentsModule, LoginModule, SharedModule, RouterModule, ToastyModule, SlimLoadingBarModule
      ],
      declarations: [HomeComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, DataService, SessionService, NgbActiveModal, DocViewerServiceService, SlimLoadingBarService, DocumentHelperService],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageviewerComponent);
    component = fixture.componentInstance;
    component.document = DOCUMENTS[0];
    component.stream = component.document.streams[0];
    component.streamIndex = 0;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate keyword highlights', () => {
    let doc : Document = PRESS_DOCUMENT;
    component.document = doc;
    component.calculateRegions();
    expect(component.highLights.length).toEqual(2);
  });

  

});
