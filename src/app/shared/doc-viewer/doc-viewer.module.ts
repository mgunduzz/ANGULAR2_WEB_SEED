import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { SocialShareModule} from '../social-share/social-share.module'


import { DocViewerComponent } from './doc-viewer.component';
import { ImageviewerComponent } from './doc-strem-container/image-viewer/image-viewer.component';
import { IframeviewerComponent } from './doc-strem-container/iframe-viewer/iframe-viewer.component';

import { VideoviewerComponent } from './doc-strem-container/video-viewer/video-viewer.component';
import { TextviewerComponent } from './doc-strem-container/text-viewer/text-viewer.component';
import { ArrowsComponent } from './arrows/arrows.component';
import { DocmetadataComponent } from './doc-meta-data/doc-meta-data.component';
import { DocstromcontainerComponent } from './doc-strem-container/doc-strem-container.component';

import { DocViewerServiceService } from "./doc-viewer-service.service";
import {PopoverModule} from "ngx-popover";
import { DocViewerTabComponent } from './doc-viewer-tab/doc-viewer-tab.component';
import { DocViewerToolbarComponent } from './doc-viewer-toolbar/doc-viewer-toolbar.component';
import { ReadedDocumentsService } from './readedDocuments/readed-documents.service';

import {  Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { DocBasketModule } from '../doc-basket/doc-basket.module';
import {  HighlightTextModule } from '../highlight-text/highlight-text.module'
import {  HighlightTextDirective } from '../highlight-text/highlight-text.directive'
import { FeedbackModule } from '../feedback/feedback.module';
import { MailingModule } from '../mailing/mailing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { PinchZoomDirective } from 'ngx-pinch-zoom/components';

import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    DocViewerComponent,
    ImageviewerComponent,
    VideoviewerComponent,
    TextviewerComponent,
    DocmetadataComponent, IframeviewerComponent,
    DocstromcontainerComponent,
    ArrowsComponent,
    DocViewerTabComponent,
    DocViewerToolbarComponent,
    PinchZoomDirective
  ],
  imports: [

    BrowserModule,
    FormsModule,
    HttpModule,
    SocialShareModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    PopoverModule,
    HighlightTextModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    NgbModule.forRoot(),
    DocBasketModule,
    FeedbackModule, 
    MailingModule, SlimLoadingBarModule.forRoot(), BlockUIModule

  ],
  providers: [DocViewerServiceService, ReadedDocumentsService, Title],
  exports: [
    DocViewerComponent,
    ImageviewerComponent,
    VideoviewerComponent,
    TextviewerComponent,
    DocmetadataComponent,
    DocstromcontainerComponent,
    ArrowsComponent,
    DocViewerToolbarComponent,
    SlimLoadingBarModule

  ],

})
export class DocViewerModule { }
