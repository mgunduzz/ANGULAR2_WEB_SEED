import { MultiselectDropdown } from './dropdown.component';
import { MultiSelectSearchFilter } from './search-filter.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MyAutoFocusDirective } from "./my-auto-focus.directive"


export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [Http]
    }
  })],
  exports: [MultiselectDropdown, MultiSelectSearchFilter],
  declarations: [MultiselectDropdown, MultiSelectSearchFilter, MyAutoFocusDirective]
})
export class MultiselectDropdownModule { }
