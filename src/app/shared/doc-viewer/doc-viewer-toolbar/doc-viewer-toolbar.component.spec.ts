import { Subject, Subscription } from 'rxjs';
import { DocViewerServiceService } from './../doc-viewer-service.service';
import { SEARCH_MODEL } from './../../../../assets/mock-data/document-search-model-mock';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AppModule } from './../../../app.module';
import { SharedModule } from './../../shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { DocViewerToolbarComponent } from './doc-viewer-toolbar.component';
import { DOCUMENTS } from '../../../../assets/mock-data/documents-mock'

describe('DocViewerToolbarComponent', () => {
    let component: DocViewerToolbarComponent;
    let fixture: ComponentFixture<DocViewerToolbarComponent>;
    let subject: DocViewerServiceService = null;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(), SharedModule, AppModule, SlimLoadingBarModule
            ],
            declarations: [],
            providers: [DocViewerServiceService]
        })
            .compileComponents();
    }));

    beforeEach(inject([DocViewerServiceService], (docViewerServiceService: DocViewerServiceService) => {
        subject = docViewerServiceService;
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DocViewerToolbarComponent);
        component = fixture.componentInstance;

        component.documentIndex = 0;
        component.documents = DOCUMENTS;
        component.searchModal = SEARCH_MODEL


        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should run zoomIn Process', async(() => {
        let subscription: Subscription = subject.docViewerToolBoxProcessChangedStream$.subscribe(process => {
            expect(process).toBeTruthy();
            subscription.unsubscribe();
        });

        let button = fixture.nativeElement.querySelector('#process-zoom-in');
        button.click();
    }));

    it('should go next document', () => {
        component.documentIndex = 0;
        component.goNextDocument();

        expect(component.documentIndex).toEqual(1);
    });

    it('should go previous document', () => {
        component.documentIndex = 1;
        component.goPreviousDocument();

        expect(component.documentIndex).toEqual(0);
    });

    it('should change stream by index', async(() => {
        let subscription: Subscription = subject.documentStreamIndexChangedStream$.subscribe(streamIndex => {
            expect(component.currentStream).toEqual(component.currentDocument.streams[1]);
            subscription.unsubscribe();
        });

        component.streamIndex = 0;
        component.currentStream = component.documents[component.documentIndex].streams[0];

        component.changeStreamByIndex(1);

    }));

    it('should go next media', async(() => {
        let subscription: Subscription = subject.documentStreamIndexChangedStream$.subscribe(streamIndex => {
            expect(component.currentStream).toEqual(component.currentDocument.streams[1]);
            subscription.unsubscribe();
        });

        component.streamIndex = 0;
        component.currentStream = component.documents[component.documentIndex].streams[0];

        component.goNextMedia();

    }));

    it('should go previous media', async(() => {
        let subscription: Subscription = subject.documentStreamIndexChangedStream$.subscribe(streamIndex => {
            expect(component.currentStream).toEqual(component.currentDocument.streams[0]);
            subscription.unsubscribe();
        });

        component.streamIndex = 1;
        component.currentStream = component.documents[component.documentIndex].streams[1];

        component.goPreviousMedia();

    }));
});
