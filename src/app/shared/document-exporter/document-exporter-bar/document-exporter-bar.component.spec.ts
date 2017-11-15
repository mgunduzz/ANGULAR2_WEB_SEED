import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppModule } from './../../../app.module';
import { SharedModule } from './../../shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentExporterBarComponent } from './document-exporter-bar.component';

describe('DocumentExporterBarComponent', () => {
  let component: DocumentExporterBarComponent;
  let fixture: ComponentFixture<DocumentExporterBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(), SharedModule, AppModule, NgbModule.forRoot(),
      ],
      declarations: [],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentExporterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
