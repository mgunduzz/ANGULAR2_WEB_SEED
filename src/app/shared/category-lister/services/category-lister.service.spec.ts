import { ToastyModule } from 'ng2-toasty';
import { AuthService } from './../../../core/auth/auth.service';
import { SessionService } from './../../../core/auth/session.service';
import { ColumnistsService } from './../../../documents/columnists/services/columnists.service';
import { APP_BASE_HREF } from '@angular/common';
import { LoginModule } from './../../../core/auth/login/login.module';
import { DocumentsModule } from './../../../documents/documents.module';
import { HomeComponent } from './../../../home/home.component';
import { AppRoutingModule } from './../../../app-routing.module';
import { SharedModule } from './../../shared.module';
import { RouterModule } from '@angular/router';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { DataService } from './../../../core/services/data.service';
import { CategoryService } from './../../../documents/services/category/category.service';
import { SubCategory } from './../entity/category';
import { CATEGORIES } from './../../../../assets/mock-data/categories-mock';
import { TestBed, async, inject, } from '@angular/core/testing';
import { URLSearchParams, HttpModule, Response, Http, BaseRequestOptions, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { CategoryListerService } from './category-lister.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Category } from "../entity"

describe('CategoryListerService', () => {


  let data = [{
    "id": 1,
    "name": "Bankacılık",
    "subCategories": [{
      "id": 2,
      "name": "Garanti",
      "parentId": 1,
      "docTypeId": 2,
      "totalDocCount": 11321,
      "docCounts": [{
        "docTypeId": 2,
        "count": 26
      }]
    },
    {
      "id": 3,
      "name": "Akbank",
      "parentId": 1,
      "docTypeId": 3,
      "totalDocCount": 11,
      "docCounts": [{
        "docTypeId": 2,
        "count": 1
      },
      {
        "docTypeId": 3,
        "count": 218
      }
      ]
    },
    {
      "id": 5,
      "name": "Vakıfbank",
      "parentId": 1,
      "docTypeId": 5,
      "totalDocCount": 33,
      "docCounts": [{
        "docTypeId": 2,
        "count": 218
      },
      {
        "docTypeId": 5,
        "count": 218
      }
      ]
    }
    ]
  },
  {
    "id": 6,
    "name": "Kredi Kartı Sektörü",
    "subCategories": [{
      "id": 7,
      "name": "Bonus",
      "parentId": 6,
      "docTypeId": 0,
      "totalDocCount": 321,
      "docCounts": [{
        "docTypeId": 2,
        "count": 9
      },
      {
        "docTypeId": 1,
        "count": 218
      }
      ]
    },
    {
      "id": 8,
      "name": "Master Card",
      "parentId": 6,
      "docTypeId": 0,
      "totalDocCount": 321321,
      "docCounts": [{
        "docTypeId": 2,
        "count": 1
      }]
    }
    ]
  }
  ];

  let service: CategoryListerService = null;
  let backend: MockBackend = null;
  beforeEach(() => {



    TestBed.configureTestingModule({
      imports: [
        HttpModule, SlimLoadingBarModule, RouterModule, AppRoutingModule, SharedModule, DocumentsModule, LoginModule,
        ToastyModule
      ],
      declarations: [
        HomeComponent
      ], 
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }, ColumnistsService, DataService, SessionService, AuthService,
        CategoryListerService, BaseRequestOptions, MockBackend, CategoryService, DataService,
        {

          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions],
        }


      ]
    });
    TestBed.compileComponents();
  });

  beforeEach(inject([CategoryListerService, MockBackend], (categoryService: CategoryListerService, mockBackend: MockBackend) => {
    service = categoryService;
    backend = mockBackend;
  }));

  // it('can instantiate service when inject service',
  //   inject([CategoryListerService], (service: CategoryListerService) => {

  //     expect(service instanceof CategoryListerService).toBe(true);
  //   }));


  // it('should categories  success', (done) => {
  //   expect(service).toBeTruthy();
  //   backend.connections.subscribe((connection: MockConnection) => {
  //     let options = new ResponseOptions({
  //       body: JSON.stringify(data)
  //     });
  //     connection.mockRespond(new Response(options));
  //   });
  //   //service.loadInitialData();
  //   var items = service.categories.subscribe(function (response: any) {
  //     expect(response.length).toBe(2);
  //     done();
  //   });


  // });


  // it('should remove a parent category', (done) => {
  //   let service = TestBed.get(CategoryListerService);

  //   expect(service).toBeTruthy();
  //   backend.connections.subscribe((connection: MockConnection) => {
  //     let options = new ResponseOptions({
  //       body: JSON.stringify(data)
  //     });
  //     connection.mockRespond(new Response(options));
  //   });
  //   service.loadInitialData();

  //   service.removeCategory(1);
  //   var items = service.categories.subscribe(function (response: any) {

  //     expect(response.length).toBe(1);

  //   });

  //   done();
  // });


  // it('should add parent category', (done) => {
  //   let service = TestBed.get(CategoryListerService);

  //   expect(service).toBeTruthy();
  //   backend.connections.subscribe((connection: MockConnection) => {
  //     let options = new ResponseOptions({
  //       body: JSON.stringify(data)
  //     });
  //     connection.mockRespond(new Response(options));
  //   });
  //   service.loadInitialData();

  //   let PCat: Array<Category> = CATEGORIES;

  //   service.addCategory(PCat);
  //   var items = service.categories.subscribe(function (response: any) {

  //     expect(response.length).toBe(3);

  //   });
  //   done();

  // });


  // it('should clear categories', (done) => {
  //   let service = TestBed.get(CategoryListerService);

  //   expect(service).toBeTruthy();
  //   backend.connections.subscribe((connection: MockConnection) => {
  //     let options = new ResponseOptions({
  //       body: JSON.stringify(data)
  //     });
  //     connection.mockRespond(new Response(options));
  //   });
  //   service.loadInitialData();

  //   service.clear();
  //   var items = service.categories.subscribe(function (response: any) {

  //     expect(response.length).toBe(0);

  //   });

  //   done();


  // });

  // it('should remove sub category', (done) => {
  //   let service = TestBed.get(CategoryListerService);


  //   expect(service).toBeTruthy();
  //   backend.connections.subscribe((connection: MockConnection) => {
  //     let options = new ResponseOptions({
  //       body: JSON.stringify(data)
  //     });
  //     connection.mockRespond(new Response(options));
  //   });
  //   service.loadInitialData();

  //   service.removeCategory(2)
  //   var items = service.categories.subscribe(function (response: any) {
  //     let x = response._tail.array;
  //     expect(x[0].subCategories.length).toBe(2);

  //   });

  //   done();


  // });





  // it('should add sub category', (done) => {
  //   let service = TestBed.get(CategoryListerService);


  //   expect(service).toBeTruthy();
  //   backend.connections.subscribe((connection: MockConnection) => {
  //     let options = new ResponseOptions({
  //       body: JSON.stringify(data)
  //     });

  //     console.log('blalbalbla');
  //     connection.mockRespond(new Response(options));
  //   });
  //   service.loadInitialData();


  //   let subCat: Array<SubCategory> = CATEGORIES[0].subCategories;


  //   service.addCategory(subCat)
  //   var items = service.categories.subscribe(function (response: any) {
  //     let x = response._tail.array;
  //     expect(x[0].subCategories.length).toBe(4);

  //   });

  //   done();


  // });



});
