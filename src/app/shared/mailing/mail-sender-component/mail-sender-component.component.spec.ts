import { ToastyModule } from 'ng2-toasty';
import { CategoryListerService } from './../../category-lister/services/category-lister.service';
import { DocumentListerService } from './../../document-lister/document-lister.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from './../../../core/auth/session.service';
import { DataService } from './../../../core/services/data.service';
import { AuthService } from './../../../core/auth/auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { DocumentsModule } from './../../../documents/documents.module';
import { SharedModule } from './../../shared.module';
import { HomeComponent } from './../../../home/home.component';
import { CoreModule } from './../../../core/core.module';
import { FormGroup, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSenderComponentComponent } from './mail-sender-component.component';

describe('MailSenderComponentComponent', () => {
  let component: MailSenderComponentComponent;
  let fixture: ComponentFixture<MailSenderComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule, SharedModule, DocumentsModule,ToastyModule
      ],
      declarations: [HomeComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, DataService, SessionService, NgbActiveModal, DocumentListerService, CategoryListerService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSenderComponentComponent);
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
