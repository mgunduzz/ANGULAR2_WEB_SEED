import { NgbModal, NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppModule } from './../../../app.module';
import { SharedModule } from './../../shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExporterModalComponent } from './exporter-modal.component';

describe('ExporterModalComponent', () => {
  let component: ExporterModalComponent;
  let fixture: ComponentFixture<ExporterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(), SharedModule, AppModule, NgbModule.forRoot(),
      ],
      declarations: [],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExporterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 