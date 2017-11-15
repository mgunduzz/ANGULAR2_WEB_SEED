import { DocumentInfoGraphicModule } from './../documents/document-info-graphic/document-info-graphic.module';
import { OnePageHeaderModule } from './one-page-header/one-page-header.module';

import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
 
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {DocViewerModule} from "./doc-viewer/doc-viewer.module";

import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {DocumentListerComponent} from "./document-lister/document-lister.component"
import {DocumentListComponent} from "./document-lister/document-list/document-list.component"
import {CustomDatePipePipe} from "./document-lister/document-list/custom-date-pipe.pipe"

import {SelectedDocumentsService} from "./document-lister/document-list/selected-documents.service"
import {DocumentInfoComponent} from "./document-lister/document-info/document-info.component"
import {PaginationBarComponent} from "./document-lister/document-list/pagination-bar/pagination-bar.component"; 

import {CategoryListComponent} from "./category-lister/category-lister.component";
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { MultiselectDropdownModule } from './dropdownSelect/dropdown.module';
import {DocumentExporterModule} from'./document-exporter/document-exporter.module'
import {CategorySearchPipe} from "./category-lister/pipe/category-search.pipe";
import {PopoverModule, PopoverContent} from "ngx-popover";
import { BlockUIModule } from 'ng-block-ui';
import { DocBasketModule } from '../shared/doc-basket/doc-basket.module'
import { ConfirmationPopoverModule  } from './angular-confirmation-popover/confirmationPopover.module'

import { DragulaModule } from 'ng2-dragula'; 
import { FeedbackModule } from './feedback/feedback.module';
import {  AgendaModule} from './agenda/agenda.module'; 
import { CustomerPressModule } from './customer-press/customer-press.module'; 
 

import { OurServicesComponent } from './our-services/our-services.component';
import { OurServicesService } from './our-services/services/our-services.service';
import {  HighlightTextModule } from './highlight-text/highlight-text.module'
import { MailingModule } from './mailing/mailing.module'         

import { HelpBubbleModule } from './help-bubble/help-bubble.module'         


export const components = [ 
   
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}
/**
 * Sayfa içerisinde  bütün modullerde kullanılma olasılığı olan componenetlar burada olacaktır.
 */
@NgModule({
  imports: [MailingModule, AgendaModule, CommonModule, FormsModule, DragulaModule, CustomerPressModule, AppRoutingModule, NgbModule.forRoot(),
     DocBasketModule, DocViewerModule, PopoverModule, BlockUIModule, MultiselectDropdownModule, HighlightTextModule, ConfirmationPopoverModule, 
    DocumentExporterModule, FeedbackModule, DocumentInfoGraphicModule, HelpBubbleModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  declarations: [NavBarComponent, DocumentListerComponent, DocumentListComponent, DocumentInfoComponent, PaginationBarComponent,
    CategoryListComponent, CategorySearchPipe, OurServicesComponent, CustomDatePipePipe
  ],
  exports: [
    NavBarComponent, DocumentListerComponent, DocumentListComponent, DocumentInfoComponent, PaginationBarComponent,
    CategoryListComponent, DocViewerModule, MultiselectDropdownModule, DocumentExporterModule, HelpBubbleModule
  ],
  providers: [SelectedDocumentsService, OurServicesService]
})
export class SharedModule { }