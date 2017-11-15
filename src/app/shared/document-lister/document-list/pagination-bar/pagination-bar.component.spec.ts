import { AppModule } from './../../../../app.module';
import { SharedModule } from './../../../shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationBarComponent } from './pagination-bar.component';

describe('PaginationBarComponent', () => {
  let component: PaginationBarComponent;
  let fixture: ComponentFixture<PaginationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(), SharedModule, AppModule
      ],
      declarations: []
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationBarComponent);
    component = fixture.componentInstance;
    component.totalCount.next(192);
    component.pageViewCount = 20;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate pagination pages correctly', () => {
    component.pageArray = [];
    component.pageCount = 10;

    component.calcPage(1);
    let pageArray = [{ value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }];
    expect(component.pageArray).toEqual(pageArray);

    component.calcPage(10);
    pageArray = [{ value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }];
    expect(component.pageArray).toEqual(pageArray);

    component.calcPage(5);
    pageArray = [{ value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }];
    expect(component.pageArray).toEqual(pageArray);
  });

  it('should find page count', () => { 
    
    component.findPageCount();


    expect(component.pageCount).toEqual(10);
  });
});
