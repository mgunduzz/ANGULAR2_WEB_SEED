import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  Http } from '@angular/http';

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { DocumentExporterBarComponent } from './document-exporter-bar/document-exporter-bar.component';
import { DocumentExportService } from './document-export-service/document-export.service';
import {ExporterModalComponent  } from './exporter-modal/exporter-modal.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [CommonModule, FormsModule, NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })],
  declarations: [DocumentExporterBarComponent, ExporterModalComponent],
  providers: [DocumentExportService],
  entryComponents: [ExporterModalComponent],
  exports: [DocumentExporterBarComponent, ExporterModalComponent]

})
export class DocumentExporterModule { }
