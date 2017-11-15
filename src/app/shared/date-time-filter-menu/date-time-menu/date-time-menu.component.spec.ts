import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeMenuComponent } from './date-time-menu.component';

describe('DateTimeMenuComponent', () => {
  let component: DateTimeMenuComponent;
  let fixture: ComponentFixture<DateTimeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
