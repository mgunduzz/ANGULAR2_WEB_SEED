import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

 import { LoginModule } from '../login.module';
 import { LoginComponent } from '../login.component';
 import { LoginModalComponent } from './login-modal.component';
import { CoreModule } from '../../../../core/core.module';
import { RouterTestingModule, } from '@angular/router/testing';
import { TranslateModule,  TranslateLoader,TranslateService }from "@ngx-translate/core";
import { HomeComponent } from '../../../../home/home.component'
import { BasketModule } from '../../../../documents/basket/basket.module';
import { DocumentArchiveModule } from '../../../../documents/document-archive/document-archive.module';
import { DocumentAnalysisModule } from '../../../../documents/document-analysis/document-analysis.module';
import { DocumentsModule } from '../../../../documents/documents.module';
import { SharedModule } from '../../../../shared/shared.module';
import {APP_BASE_HREF} from '@angular/common';

import { SessionService } from '../../../auth/session.service';
import { AuthService } from '../../../auth/auth.service';
import { DataService } from '../../../services/data.service'; 

describe('Component: Login Modal', () => {
  let fixture;

 beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoginModule, RouterTestingModule, CoreModule, TranslateModule.forRoot(), BasketModule, DocumentArchiveModule, DocumentAnalysisModule, DocumentsModule, SharedModule
      ],
      declarations: [HomeComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, DataService, SessionService],
    });
    fixture = TestBed.createComponent(LoginModalComponent);
    fixture.detectChanges();
  });

  it('should inject the component', async(inject([], () => {
    fixture.whenStable().then(() => {
      expect(fixture.componentInstance).toBeTruthy();
    });
  })));

  it('should create the component', async(inject([], () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let element = fixture.nativeElement;
      /*expect(element.querySelector('rio-modal-content')).not.toBeNull();
      expect(element.querySelector('h1').innerText).toEqual('Login');
      expect(element.querySelector('rio-login-form')).not.toBeNull();*/
 
      expect(fixture.componentInstance.onSubmit).toBeTruthy();
    });
  })));

  it('should emit an event when handleSubmit is called',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        let login = { username: 'user', password: 'pass' };
        fixture.componentInstance.handleSubmit(login);
        fixture.componentInstance.onSubmit.subscribe(data => {
          expect(data).toBeDefined();
          expect(data.username).toEqual('user');
          expect(data.password).toEqual('pass');
        });
      });
    }))
  );

});
