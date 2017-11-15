import { CategoryListerService } from './../../category-lister/services/category-lister.service';
import { SessionService } from './../../../core/auth/session.service';
import { DataService } from './../../../core/services/data.service';
import { AuthService } from './../../../core/auth/auth.service';
import { SharedModule } from './../../shared.module';
import { HomeComponent } from './../../../home/home.component';
import { ColumnistsModule } from './../../../documents/columnists/columnists.module';
import { LoginModule } from './../../../core/auth/login/login.module';
import { DocumentsModule } from './../../../documents/documents.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastyModule } from 'ng2-toasty';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerPressModalComponent } from './customer-press-modal.component';

describe('CustomerPressModalComponent', () => {
  let component: CustomerPressModalComponent;
  let fixture: ComponentFixture<CustomerPressModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(), NgbModule.forRoot(),
        ColumnistsModule, DocumentsModule, LoginModule, SharedModule, RouterModule, ToastyModule
      ],
      declarations: [HomeComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, DataService, SessionService, NgbActiveModal,CategoryListerService],

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPressModalComponent);
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
