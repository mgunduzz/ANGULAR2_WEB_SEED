import { AppModule } from './../../../app.module';
import { SharedModule } from './../../shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentInfoComponent } from './document-info.component';

describe('DocumentInfoComponent', () => {
  let component: DocumentInfoComponent;
  let fixture: ComponentFixture<DocumentInfoComponent>;

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
    fixture = TestBed.createComponent(DocumentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); 
  });
});
