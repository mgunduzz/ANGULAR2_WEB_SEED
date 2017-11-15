//import { Document } from './../entity/document.model';
//import { Subscription } from 'rxjs';
//import { DOCUMENTS } from './../../../../assets/mock-data/documents-mock';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { AppModule } from './../../../app.module';
//import { SharedModule } from './../../shared.module';
//import { TranslateModule } from '@ngx-translate/core';
//import { async, ComponentFixture, TestBed } from '@angular/core/testing';

//import { DocumentListComponent } from './document-list.component';

//describe('DocumentListComponent', () => {
//  let component: DocumentListComponent;
//  let fixture: ComponentFixture<DocumentListComponent>;


//  beforeEach(async(() => {
//    TestBed.configureTestingModule({
//      imports: [
//        TranslateModule.forRoot(), SharedModule, AppModule, NgbModule.forRoot(),
//      ],
//      declarations: [],
//      providers: []
//    })
//      .compileComponents();
//  }));

//  beforeEach(() => {
//    fixture = TestBed.createComponent(DocumentListComponent);
//    component = fixture.componentInstance;
//    component.documentData.documents.next(DOCUMENTS);

//    fixture.detectChanges();
//  });

//  it('should create', () => {
//    expect(component).toBeTruthy();
//  });

//  it('should select all documents', () => {
//    let documents = <Array<Document>>JSON.parse(JSON.stringify(DOCUMENTS));
//    component.selectAllDocumentsChange(documents, true);

//    expect(component.selectedItems).toEqual(documents.length);
//  });

//  it('should unselect all documents', () => {
//    let documents = <Array<Document>>JSON.parse(JSON.stringify(DOCUMENTS));
//    documents.forEach(doc => doc.checked = true);
//    component.selectAllDocumentsChange(documents, false);

//    expect(component.selectedItems).toEqual(0);
//  });

//  it('should select all documents when already few doc selected', () => {
//    let documents = <Array<Document>>JSON.parse(JSON.stringify(DOCUMENTS));
//    documents[0].checked = true;
//    documents[2].checked = true;

//    component.selectAllDocumentsChange(documents, true);

//    expect(component.selectedItems).toEqual(documents.length);
//  });

//  it('should unselect all documents when already few doc selected', () => {
//    let documents = <Array<Document>>JSON.parse(JSON.stringify(DOCUMENTS));
//    documents[0].checked = true;
//    documents[2].checked = true;

//    component.selectAllDocumentsChange(documents, false);

//    expect(component.selectedItems).toEqual(0);
//  });

//  it('should select document', () => {
//    let documents = <Array<Document>>JSON.parse(JSON.stringify(DOCUMENTS));

//    component.documentSelectionChange(documents[0], true);

//    expect(component.selectedItems).toEqual(1);
//  });

//  it('should select document when already few doc selected', () => {
//    let documents = <Array<Document>>JSON.parse(JSON.stringify(DOCUMENTS));
//    documents[0].checked = true;
//    documents[1].checked = true;
//    component.selectedItems = 2;

//    component.documentSelectionChange(documents[2], true);

//    expect(component.selectedItems).toEqual(3);
//  });
  

//  it('should unselect document when all documents selected', () => {
//    let documents = <Array<Document>>JSON.parse(JSON.stringify(DOCUMENTS));
//    component.selectAllDocumentsChange(documents,true);

//    component.documentSelectionChange(documents[0], false);

//    expect(component.selectedItems).toEqual(documents.length-1);
//  });

  

//  it('should unselect, selected document when already few doc selected', () => {
//    let documents = <Array<Document>>JSON.parse(JSON.stringify(DOCUMENTS));
//    documents[0].checked = true;
//    documents[1].checked = true;
//    component.selectedItems = 2;

//    component.documentSelectionChange(documents[1], false);

//    expect(component.selectedItems).toEqual(1);
//  });

   

//  it('should change index document 1 to 2 ', async(() => {
//    let documents = <Array<Document>>JSON.parse(JSON.stringify(DOCUMENTS));
//    let changedDoc: Document = documents[0];
//    let changed: boolean = false;
//    documents[0].rowIndex = 2;
//    documents[1].rowIndex = 2;
//    component.documentData.documents.next(documents);

//    let subscription: Subscription = component.documentData.documents.subscribe(docs => {
//      if (changed) {
//        let index = docs.findIndex(doc => {
//          return doc.id === changedDoc.id;
//        });
//        expect(index).toEqual(1);

//        subscription.unsubscribe();
//      }
//    });


//    changed = true;

//    component.documentIndexChange(changedDoc.id, 2, 1, false);

//  }));
//});
