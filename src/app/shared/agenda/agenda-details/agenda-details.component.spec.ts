import { SessionService } from './../../../core/auth/session.service';
import { DataService } from './../../../core/services/data.service';
import { AuthService } from './../../../core/auth/auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './../../../home/home.component';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../../shared.module';
import { LoginModule } from './../../../core/auth/login/login.module';
import { DocumentsModule } from './../../../documents/documents.module';
import { ColumnistsModule } from './../../../documents/columnists/columnists.module';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaDetailsComponent } from './agenda-details.component';
import { SocialShareModule } from '../../social-share/social-share.module'
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../../app-routing.module'

describe('AgendaDetailsComponent', () => {
  let component: AgendaDetailsComponent;
  let fixture: ComponentFixture<AgendaDetailsComponent>;

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
    fixture = TestBed.createComponent(AgendaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
