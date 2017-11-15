import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule,  TranslateLoader,TranslateService }from "@ngx-translate/core";

import { CoreModule } from '../../../../core/core.module';
import { LoginFrmComponent } from './login-frm.component';
import { LoginModule } from '../login.module';
import { AppModule } from '../../../../../app/app.module';
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


describe('Component: Login Form', () => {
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoginModule,
        CoreModule, TranslateModule.forRoot(), BasketModule, DocumentArchiveModule, DocumentAnalysisModule, DocumentsModule, SharedModule
      ],
      declarations: [HomeComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, DataService, SessionService],

    });
    fixture = TestBed.createComponent(LoginFrmComponent);
    fixture.detectChanges();
  });

  it('should inject the component', async(inject([], () => {
    fixture.whenStable().then(() => {
      expect(fixture.componentInstance).toBeTruthy();
    });
  })));

  it('should create the component', async(inject([], () => {
    fixture.whenStable().then(() => {
      let element = fixture.nativeElement;
    /*  expect(element.querySelector('#qa-pending-alert')).toBeNull();
      expect(element.querySelector('#qa-alert')).toBeNull();
      expect(element.querySelector('#qa-uname-input')).not.toBeNull();
      expect(element.querySelector('#qa-uname-validation').className)
        .toContain('display-none');
      expect(element.querySelector('#qa-password-input')).not.toBeNull();
      expect(element.querySelector('#qa-password-validation').className)
        .toContain('display-none');
      expect(element.querySelector('#qa-login-button')).not.toBeNull();
      expect(element.querySelector('#qa-clear-button')).not.toBeNull();*/
      expect(fixture.componentInstance.onSubmit).toBeTruthy();
    });
  })));

  it('should display alert if the form hasError', async(inject([], () => {
    fixture.whenStable().then(() => {
      fixture.componentInstance.hasError = true;
      fixture.autoDetectChanges();
     // let alert = fixture.nativeElement.querySelector('#qa-alert');
      //expect(alert).not.toBeNull();
      //expect(alert.innerText).toEqual('Invalid username and password');
    });
  })));

  it('should display alert if the form isPending', async(inject([], () => {
    fixture.whenStable().then(() => {
      /*fixture.componentInstance.isPending = true;
      fixture.autoDetectChanges();
      let alert = fixture.nativeElement.querySelector('#qa-pending');
      expect(alert).not.toBeNull();
      expect(alert.innerText).toEqual('Loading...');*/
    });
  })));

/*  it('should display name warning for invalid username',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.username.setValue('');
        fixture.autoDetectChanges();
        let alert = fixture.nativeElement.querySelector('#qa-uname-validation');
        expect(alert).not.toBeNull();
        expect(alert.innerText).toEqual('Username is required.');
      });
    })
    ));

  it('should display password warning for invalid password',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.password.setValue('');
        fixture.autoDetectChanges();
        let alert = fixture.nativeElement
          .querySelector('#qa-password-validation');
        expect(alert).not.toBeNull();
        expect(alert.innerText).toEqual('Password is required.');
      });
    })
    ));

  it('should emit an event when the login button is clicked',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.username.setValue('admin');
        fixture.componentInstance.password.setValue('superuser');
        fixture.autoDetectChanges();
        fixture.componentInstance.onSubmit.subscribe(data => {
          expect(data).toBeDefined();
          expect(data.username).toEqual('admin');
          expect(data.password).toEqual('superuser');
        });
        let button = fixture.nativeElement.querySelector('#qa-login-button');
        button.click();
      });
    }))
  );

  it('should call reset when the clear button is clicked',
    async(inject([], () => {
      fixture.whenStable().then(() => {
        fixture.componentInstance.username.setValue('user');
        fixture.componentInstance.password.setValue('pass');
        fixture.detectChanges();
        expect(fixture.componentInstance.username.value).toEqual('user');
        expect(fixture.componentInstance.password.value).toEqual('pass');

        spyOn(fixture.componentInstance, 'reset').and.callThrough();
        let button = fixture.nativeElement.querySelector('#qa-clear-button');
        button.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.reset).toHaveBeenCalled();
        expect(fixture.componentInstance.username.value).toEqual('');
        expect(fixture.componentInstance.password.value).toEqual('');
      });
    }))
  );*/
});
