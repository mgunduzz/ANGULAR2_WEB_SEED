import { SessionService } from './../../../../core/auth/session.service';
import { DataService } from './../../../../core/services/data.service';
import { AuthService } from './../../../../core/auth/auth.service';
import { SharedModule } from './../../../shared.module';
import { LoginModule } from './../../../../core/auth/login/login.module';
import { DocumentsModule } from './../../../../documents/documents.module';
import { HomeComponent } from './../../../../home/home.component';
import { ColumnistsModule } from './../../../../documents/columnists/columnists.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaListComponent } from './agenda-list.component';
import { APP_BASE_HREF } from '@angular/common';
import { ToastyModule } from 'ng2-toasty';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { Routes, RouterModule } from '@angular/router';

describe('AgendaListComponent', () => {
  let component: AgendaListComponent;
  let fixture: ComponentFixture<AgendaListComponent>;

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
    fixture = TestBed.createComponent(AgendaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
