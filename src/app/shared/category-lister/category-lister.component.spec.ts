import { SessionService } from './../../core/auth/session.service';
import { DataService } from './../../core/services/data.service';
import { AuthService } from './../../core/auth/auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './../../home/home.component';
import { ToastyModule } from 'ng2-toasty';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared.module';
import { LoginModule } from './../../core/auth/login/login.module';
import { DocumentsModule } from './../../documents/documents.module';
import { ColumnistsModule } from './../../documents/columnists/columnists.module';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { Category, SubCategory } from './entity/category';
import { CategoryListComponent } from './category-lister.component';
import { CategoryListerService } from './services/category-lister.service';

describe('Category Lister', () => { 
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;

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
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const categoryList = fixture.componentInstance.categories;

    expect(categoryList).toBeTruthy();
  }));
  /*
   it('should create the app', async(() => {
      const fixture = TestBed.createComponent(CategoryListComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      console.log(compiled);
      debugger; 
          expect(compiled.querySelector('button').textContent).toContain('Toggle');
  
    }));
  
  
   */
});





