import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppModule } from './../../../app.module';
import { SharedModule } from './../../shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSenderModalComponent } from './mail-sender-modal.component';

describe('MailSenderModalComponent', () => {
  let component: MailSenderModalComponent;
  let fixture: ComponentFixture<MailSenderModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(), SharedModule, AppModule
      ],
      declarations: [],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailSenderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 