import { DocumentListerService } from './../document-lister/document-lister.service';
import { CategoryListerService } from './../category-lister/services/category-lister.service';
import { ToastyModule } from 'ng2-toasty';
import { SessionService } from './../../core/auth/session.service';
import { LoginModule } from './../../core/auth/login/login.module';
import { DocumentsModule } from './../../documents/documents.module';
import { HomeComponent } from './../../home/home.component';
import { SharedModule } from './../shared.module';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../core/auth/auth.service';
import { NavBarComponent } from '../nav-bar';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { DataService } from '../../core/services/data.service';
import { HttpModule, Http } from '@angular/http';

describe('NavBarComponent', () => {
  let comp: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

   

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule.forRoot(), TranslateModule.forRoot(), HttpModule, SharedModule, DocumentsModule, LoginModule,ToastyModule,
        RouterTestingModule, FormsModule
      ],
      providers: [AuthService, DataService, SessionService,CategoryListerService,DocumentListerService],
      declarations: [
        HomeComponent
      ],

    }).compileComponents();
  }));
  // synchronous beforeEach
  beforeEach(() => {

    fixture = TestBed.createComponent(NavBarComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding
  });

  it('should create the NavBarcomponent', async(() => {
    fixture.detectChanges();
    expect(fixture).toBeTruthy;
  }));


  /** it('Navbar Title Hello to Hamza', async(() => {
     comp.title="Hamza";
     fixture.detectChanges();
     let elm : HTMLDivElement
     elm=  fixture.nativeElement.querySelector('div');
  
     expect(elm.innerText).toEqual("Hamza")
   }));
 */
});

