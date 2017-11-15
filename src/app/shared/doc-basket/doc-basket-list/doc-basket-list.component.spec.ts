import { PRESS_DOCUMENT, DOCUMENTS } from './../../../../assets/mock-data/documents-mock';
import { Observable } from 'rxjs';
import { BasketManagerService } from './../services/basket-manager.service';
import { AppModule } from './../../../app.module';
import { DocumentListerService } from './../../document-lister/document-lister.service';
import { DocumentService } from './../../../documents/services/document/document.service';
import { ColumnistsService } from './../../../documents/columnists/services/columnists.service';
import { AppRoutingModule } from './../../../app-routing.module';
import { PaginationBarComponent } from './../../document-lister/document-list/pagination-bar/pagination-bar.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { CategoryListerService } from './../../category-lister/services/category-lister.service';
import { DocumentsModule } from './../../../documents/documents.module';
import { ColumnistsModule } from './../../../documents/columnists/columnists.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastyModule } from 'ng2-toasty';
import { SessionService } from './../../../core/auth/session.service';
import { DataService } from './../../../core/services/data.service';
import { AuthService } from './../../../core/auth/auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from './../../../shared/shared.module';
import { LoginModule } from './../../../core/auth/login/login.module';
import { HomeComponent } from './../../../home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { DocBasketListComponent } from './doc-basket-list.component';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions, Jsonp } from '@angular/http';

describe('DocBasketListComponent', () => {
  let component: DocBasketListComponent; 
  let fixture: ComponentFixture<DocBasketListComponent>;
  let subject : BasketManagerService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ 
        imports: [
           TranslateModule.forRoot(), SharedModule, AppModule
        ],
      declarations: [  ]
    }) 
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocBasketListComponent);
    component = fixture.componentInstance;
    component.baskets = JSON.parse('[{"sepetNo":0,"sepetAdi":"Sepetim","haberSayisi":0,"sortType":0,"sortDirection":0},{"sepetNo":1,"sepetAdi":"aa","haberSayisi":0,"sortType":0,"sortDirection":0}]');
    component.baskets[0].isSelected = true;
    component.baskets[0].documents = [];
    component.documents = JSON.parse('[{"id":1124394476,"documentTypeId":8,"publishDate":"2017-09-13T10:45:10","title":"Futbol Resitali Başlıyor","mediaName":"GUNDEM.ME","mediaNameId":97276,"rowIndex":2,"checked":true}]');

    fixture.detectChanges();
  });

  beforeEach(inject([BasketManagerService], (basketManagerService: BasketManagerService) => {
    subject = basketManagerService;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new basket', fakeAsync(() => {
    const spy = spyOn(subject, 'addNewBasket').and.returnValue(
      Observable.create(observer => {
        observer.next(JSON.parse('[{"sepetNo":0,"sepetAdi":"Sepetim","haberSayisi":10,"sortType":0,"sortDirection":0},{"sepetNo":2,"sepetAdi":"deneme","haberSayisi":0,"sortType":0,"sortDirection":0}]'))
      })
    );

    component.newBasketTitle = 'deneme';
    component.addNewBasket();
    
    expect(component.baskets.length).toEqual(2);
    expect(spy.calls.any()).toEqual(true);
  }));

  it('should add documents to selected basket', fakeAsync(() => {
    const spy = spyOn(subject, 'addDocsToBasket').and.returnValue(
      Observable.create(observer => {
        observer.next(JSON.parse('[{"sepetNo":0,"sepetAdi":"Sepetim","haberSayisi":0,"sortType":0,"sortDirection":0}]'));
      })
    );

    component.addDocsToBasket();
    
    expect(component.baskets[0].documents.length).toEqual(1);
    expect(spy.calls.any()).toEqual(true);
  }));

  it('should empty selected basket', fakeAsync(() => {
    const spy = spyOn(subject, 'emptyBasket').and.returnValue(
      Observable.create(observer => {
        observer.next(JSON.parse('[{"sepetNo":0,"sepetAdi":"Sepetim","haberSayisi":0,"sortType":0,"sortDirection":0}]'));
      })
    );

    component.baskets[0].documents = JSON.parse('[{"haberTuru":2,"id":1124394476,"baslik":"Futbol Resitali Başlıyor","yayinTarihi":"2017-09-13T10:45:10","medyaAdi":"GUNDEM.ME","internetLink":null,"tvDosyaVar":false,"mizanpajPdfVar":false,"textVar":false,"internetPdfVar":false,"ceviriVar":false,"siraNo":0,"alanId":0,"selectedUstAlanId":0,"selectedAlanId":0}]');
    component.baskets[0].haberSayisi = 1;
    component.emptyBasket();
    
    expect(component.baskets[0].haberSayisi).toEqual(0);
    expect(spy.calls.any()).toEqual(true);
  }));

  it('should delete selected basket', fakeAsync(() => {
    const spy = spyOn(subject, 'deleteBasket').and.returnValue(
      Observable.create(observer => {
        observer.next(JSON.parse('[{"sepetNo":0,"sepetAdi":"Sepetim","haberSayisi":0,"sortType":0,"sortDirection":0}]'));
      })
    );

    component.baskets[0].isSelected = false;
    component.baskets[1].isSelected = true;
    component.deleteBasket();
    
    expect(component.baskets.length).toEqual(1);
    expect(spy.calls.any()).toEqual(true);
  }));
});
