import { DOCUMENTS } from './../../../../../assets/mock-data/documents-mock';
import { DOCUMENT } from '@angular/platform-browser';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgControlsModule } from 'videogular2/controls';
import { VgCoreModule, VgAPI } from 'videogular2/core';
import { SocialShareModule } from './../../../social-share/social-share.module';
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
import { VideoviewerComponent } from './video-viewer.component';

describe('VideoviewerComponent', () => {
  let component: VideoviewerComponent;
  let fixture: ComponentFixture<VideoviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(), NgbModule.forRoot(),
        ColumnistsModule, DocumentsModule, LoginModule, SharedModule, RouterModule, ToastyModule, SlimLoadingBarModule,
        SocialShareModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
      ],
      declarations: [HomeComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, DataService, SessionService, NgbActiveModal, DocViewerServiceService, SlimLoadingBarService, VgAPI],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoviewerComponent);
    component = fixture.componentInstance;
    component.stream = DOCUMENTS[0].streams[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should currentTime equal to 29 after duration click', () => {
    component.startClick(29,0);
    expect(component.api.currentTime).toEqual(29);
  });


});
