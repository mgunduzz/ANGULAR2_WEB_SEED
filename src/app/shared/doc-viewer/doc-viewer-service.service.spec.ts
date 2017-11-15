import { DocumentModel } from './entity/document.model';
import { PRESS_DOCUMENT, TV_DOCUMENT, INTERNET_DOCUMENT, SOCIAL_MEDIA_DOCUMENT, RADIO_DOCUMENT, NEWS_AGENCY_DOCUMENT, SIMPLE_NEWS_AGENCY_DOCUMENT } from './../../../assets/mock-data/documents-mock';
import { StreamModel } from './entity/stream.model';
import { NewsService } from './../../documents/news/news-service.service';
import { LoginModule } from './../../core/auth/login/login.module';
import { DocumentsModule } from './../../documents/documents.module';
import { SharedModule } from './../shared.module';
import { AppRoutingModule } from './../../app-routing.module';
import { AuthService } from './../../core/auth/auth.service';
import { SessionService } from './../../core/auth/session.service';
import { ColumnistsService } from './../../documents/columnists/services/columnists.service';
import { DataService } from './../../core/services/data.service';
import { HomeComponent } from './../../home/home.component';
import { TestBed, inject } from '@angular/core/testing';
import { ToastyModule } from 'ng2-toasty';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { DocViewerServiceService } from './doc-viewer-service.service';

describe('DocViewerServiceService', () => {

  let subject: DocViewerServiceService = null;
  let backend: MockBackend = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SlimLoadingBarModule, RouterModule, AppRoutingModule, SharedModule, DocumentsModule, LoginModule, ToastyModule
      ],
      declarations: [
        HomeComponent
      ],
      providers: [
        ColumnistsService, DataService, SessionService, AuthService, NewsService,
        MockBackend,
        BaseRequestOptions,
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }]
    }).compileComponents();
  });

  beforeEach(inject([DocViewerServiceService, MockBackend], (docViewerServiceService: DocViewerServiceService, mockBackend: MockBackend) => {
    subject = docViewerServiceService;
    backend = mockBackend;
  }));

  it('should DocViewerServiceService Created', inject([DocViewerServiceService], (service: DocViewerServiceService) => {
    expect(service).toBeTruthy();
  }));

  it('should Gets Press Document Streams', inject([DocViewerServiceService], (service: DocViewerServiceService) => {
    let doc: DocumentModel = PRESS_DOCUMENT;
    doc.streams = [];
    let streams: StreamModel[] = service.getDocumentStreams(doc);
    expect(streams.length).toBeGreaterThan(0);
  }));

  it('should Gets TV Document Streams', inject([DocViewerServiceService], (service: DocViewerServiceService) => {
    let doc: DocumentModel = TV_DOCUMENT;
    doc.streams = [];
    let streams: StreamModel[] = service.getDocumentStreams(doc);
    expect(streams.length).toBeGreaterThan(0);
  }));

  it('should Gets INTERNET Document Streams', inject([DocViewerServiceService], (service: DocViewerServiceService) => {
    let doc: DocumentModel = INTERNET_DOCUMENT;
    doc.streams = [];
    let streams: StreamModel[] = service.getDocumentStreams(doc);
    expect(streams.length).toBeGreaterThan(0);
  }));

  it('should Gets SOCIAL_MEDIA Document Streams', inject([DocViewerServiceService], (service: DocViewerServiceService) => {
    let doc: DocumentModel = SOCIAL_MEDIA_DOCUMENT;
    doc.streams = [];
    let streams: StreamModel[] = service.getDocumentStreams(doc);
    expect(streams.length).toBeGreaterThan(0);
  }));

  it('should Gets RADIO Document Streams', inject([DocViewerServiceService], (service: DocViewerServiceService) => {
    let doc: DocumentModel = RADIO_DOCUMENT;
    doc.streams = [];
    let streams: StreamModel[] = service.getDocumentStreams(doc);
    expect(streams.length).toBeGreaterThan(0);
  }));

  it('should Gets NEWS_AGENCY Document Streams', inject([DocViewerServiceService], (service: DocViewerServiceService) => {
    let doc: DocumentModel = NEWS_AGENCY_DOCUMENT;
    doc.streams = [];
    let streams: StreamModel[] = service.getDocumentStreams(doc);
    expect(streams.length).toBeGreaterThan(0);
  }));

});
