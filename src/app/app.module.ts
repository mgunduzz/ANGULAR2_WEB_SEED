import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared';
import { DocumentsModule } from './documents';
import { HomeComponent } from './home';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './core/auth/auth.guard';
import { AuthService } from './core/auth/auth.service';

import { SessionService } from './core/auth/session.service';
import { LoginModule } from './core/auth/login/login.module';
import { LoginModalComponent } from './core/auth/login/login-modal/login-modal.component';
import { TranslateModule, TranslateLoader, } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CoreModule } from './core/core.module';
import { DocumentListerService } from './shared/document-lister/document-lister.service';
import { DropDownModalSelection, DropDownModalToggler} from './shared/directives/drop-down-modal-selection.directive';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import { CategoryListerService } from './shared/category-lister/services/category-lister.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './core/services/data.service';
import { LogService } from './core/services/log.service';

import {ToastyModule} from 'ng2-toasty';

import {enableProdMode, ErrorHandler} from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import  { ExceptionHandler }     from './core/services/exception-handler';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}
enableProdMode();

@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
 
  imports: [BrowserModule, SharedModule, BrowserAnimationsModule,
    FormsModule, LoginModule,
    HttpModule, CoreModule, SlimLoadingBarModule.forRoot(), DocumentsModule,
    AppRoutingModule, NgbModule.forRoot(),
    ToastyModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })

  ],
  providers: [AuthGuard, DataService,LogService,AuthService, DocumentListerService, CategoryListerService, SessionService, { provide: LocationStrategy, useClass: HashLocationStrategy }, { provide: ErrorHandler, useClass: ExceptionHandler }],

  bootstrap: [AppComponent]
})
export class AppModule { }
