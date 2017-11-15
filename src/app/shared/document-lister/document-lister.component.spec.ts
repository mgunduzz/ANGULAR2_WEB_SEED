import { DOCUMENTS } from './../../../assets/mock-data/documents-mock';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppModule } from './../../app.module';
import { SharedModule } from './../shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListerComponent } from './document-lister.component';

describe('DocumentListerComponent', () => {
  let component: DocumentListerComponent;
  let fixture: ComponentFixture<DocumentListerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(), SharedModule, AppModule, NgbModule.forRoot(), 
      ],
      declarations: [],
      providers: [ ] 
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentListerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 
});
