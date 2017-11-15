import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule ,Http} from '@angular/http';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar';
import { HomeComponent } from './home';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './core/auth/login/login.component';
import { LoginModalComponent } from './core/auth/login/login-modal/login-modal.component';
 
import { TranslateModule,  TranslateLoader,TranslateService }from "@ngx-translate/core";

import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { CoreModule } from './core/core.module';

import { DocumentNavBarComponent } from './documents/components/document-nav-bar/document-nav-bar.component';
 import { NewsNavBarComponent } from './documents/news/news-nav-bar/news-nav-bar.component';
import { NewsMainComponent } from './documents/news/news-main/news-main.component';
import { DocumentMainComponent } from './documents/document-main/document-main.component';
import { AdvertsMainComponent } from './documents/adverts/adverts-main/adverts-main.component';

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule, } from '@angular/router/testing';

 
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import {APP_BASE_HREF} from '@angular/common';
import { AgendaModule } from './shared/agenda/agenda.module';
import { CustomerPressModule } from './shared/customer-press/customer-press.module'
import { BasketModule } from './documents/basket/basket.module';
import { DocumentArchiveModule } from './documents/document-archive/document-archive.module';
import { DocumentAnalysisModule } from './documents/document-analysis/document-analysis.module';
import {ToastyModule} from 'ng2-toasty';
import { SharedModule } from './shared/shared.module';
import { BlockUIModule } from 'ng-block-ui';
import { DocumentsModule } from './documents/documents.module';
import { LoginModule } from './core/auth/login/login.module';
import { SessionService } from './core/auth/session.service';
import { AuthService } from './core/auth/auth.service';
import { DataService } from './core/services/data.service'; 


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
    BrowserModule,
    FormsModule,ReactiveFormsModule,
    HttpModule,TranslateModule.forRoot(),
        AppRoutingModule, NgbModule.forRoot(), ToastyModule,
        AgendaModule, CustomerPressModule, BasketModule, DocumentArchiveModule, DocumentAnalysisModule, SharedModule,
        BlockUIModule, DocumentsModule, LoginModule


      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, AuthService, DataService, SessionService],

      declarations: [
        AppComponent, HomeComponent
        ]

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));

 /* it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));*/
/*
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));*/
});
 