import { OnePageHeaderModule } from './../one-page-header/one-page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaDetailsComponent } from './agenda-details/agenda-details.component';
import { AgendaModalComponent } from './agenda-modal/agenda-modal.component';
import { AgendaListComponent } from './agenda-modal/agenda-list/agenda-list.component';
import {AgendaService} from './services/agenda.service'
import { Daterangepicker } from 'ng2-daterangepicker';
import { HttpModule, Http } from '@angular/http';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { BlockUIModule } from 'ng-block-ui';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  imports: [
    CommonModule, Daterangepicker, BlockUIModule, NgbModule, OnePageHeaderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  declarations: [AgendaDetailsComponent, AgendaModalComponent, AgendaListComponent],
  providers: [AgendaService],
  entryComponents: [AgendaModalComponent],
  exports: [AgendaDetailsComponent]  
})
export class AgendaModule { }
