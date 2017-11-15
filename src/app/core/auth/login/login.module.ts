import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

import { LoginFormComponent } from './login-form/login-form.component';
import { LoginFrmComponent } from './login-frm/login-frm.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared/shared.module';
 import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { BlockUIModule } from 'ng-block-ui';


@NgModule({
  imports: [
    SharedModule,
      ReactiveFormsModule, FormsModule, BlockUIModule,
    CommonModule,
    HttpModule,HttpModule,       TranslateModule ,
  ],
  declarations: [
    LoginModalComponent,
    LoginFormComponent,
    LoginFrmComponent,
    LoginComponent
  ],
  exports: [
    LoginModalComponent
  ],
  providers: [
    
  ]
})
export class LoginModule { }