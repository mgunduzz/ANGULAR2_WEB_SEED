import { HighlightTextModule } from './../../../highlight-text/highlight-text.module';
import { DOCUMENTS, INTERNET_DOCUMENT } from './../../../../../assets/mock-data/documents-mock';
 import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
 import { ToastyModule } from 'ng2-toasty';
 import { RouterModule } from '@angular/router'; 
 import { APP_BASE_HREF } from '@angular/common'; 
 import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
 import { TranslateModule } from '@ngx-translate/core';
 import { TextviewerComponent } from './text-viewer.component';
 
 describe('TextviewerComponent', () => {
   let component: TextviewerComponent;
   let fixture: ComponentFixture<TextviewerComponent>;
    
   beforeEach(async(() => {
     TestBed.configureTestingModule({
       imports: [
         TranslateModule.forRoot(), NgbModule.forRoot(),
         ColumnistsModule, DocumentsModule, LoginModule, SharedModule, RouterModule, ToastyModule,SlimLoadingBarModule,HighlightTextModule
       ],
       declarations: [HomeComponent],
       providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, DataService, SessionService, NgbActiveModal,DocViewerServiceService,SlimLoadingBarService],

     })
       .compileComponents();
   }));

   beforeEach(() => {
     fixture = TestBed.createComponent(TextviewerComponent);
     component = fixture.componentInstance;
     component.document = DOCUMENTS[0];
     component.stream = component.document.streams[0];

     fixture.detectChanges();
   });

   it('should create', () => { 
     expect(component).toBeTruthy();
   });

   it('should generate highlight word list', () => { 
     component.document = INTERNET_DOCUMENT;
     
     expect(component.highlightWordList.length).toEqual(1);
   });
 });
