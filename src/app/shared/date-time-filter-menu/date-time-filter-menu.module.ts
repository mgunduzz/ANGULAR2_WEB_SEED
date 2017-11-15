import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimeMenuComponent } from './date-time-menu/date-time-menu.component';
import { DateTimeMenuService,NgbdDatepickerI18n,CustomDatepickerI18n} from './services/date-time-menu.service';
import { Daterangepicker } from 'ng2-daterangepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {  Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@
NgModule({
  imports: [
    CommonModule, Daterangepicker, NgbModule, FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
  ],
  declarations: [DateTimeMenuComponent, NgbdDatepickerI18n],
  providers: [DateTimeMenuService],
  exports: [DateTimeMenuComponent]
})
export class DateTimeFilterMenuModule { }
