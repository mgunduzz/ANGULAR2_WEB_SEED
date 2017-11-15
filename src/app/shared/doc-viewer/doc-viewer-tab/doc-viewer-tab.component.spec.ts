import { AppModule } from './../../../app.module';
import { SharedModule } from './../../shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocViewerTabComponent } from './doc-viewer-tab.component';

describe('DocViewerTabComponent', () => {
  let component: DocViewerTabComponent;
  let fixture: ComponentFixture<DocViewerTabComponent>;

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
    fixture = TestBed.createComponent(DocViewerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 