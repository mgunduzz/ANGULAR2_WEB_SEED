import { BasketListComponent } from './../../../documents/basket/basket-list/basket-list.component';
import { CategoryListerService } from './../../category-lister/services/category-lister.service';
import { SessionService } from './../../../core/auth/session.service';
import { DataService } from './../../../core/services/data.service';
import { AuthService } from './../../../core/auth/auth.service';
import { ToastyModule } from 'ng2-toasty';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared.module';
import { LoginModule } from './../../../core/auth/login/login.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentsModule } from './../../../documents/documents.module';
import { APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './../../../home/home.component';
import { ColumnistsModule } from './../../../documents/columnists/columnists.module';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPressWizardComponent } from './customer-press-wizard.component';

describe('CustomerPressWizardComponent', () => {
  let component: CustomerPressWizardComponent;
  let fixture: ComponentFixture<CustomerPressWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(), NgbModule.forRoot(),SharedModule,DocumentsModule,LoginModule,RouterModule,ToastyModule
      ],
      declarations: [HomeComponent],  
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, DataService, SessionService, NgbActiveModal],
      
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPressWizardComponent);
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
