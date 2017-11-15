// From Style guide item 4-11
// https://angular.io/docs/ts/latest/guide/style-guide.html#04-11
// which is newer than
// https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-module

import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
 
 
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
 
import { SharedModule } from '../shared/shared.module';
 


import { Config } from './utils/index';
import { AuthModule } from './auth/auth.module';
import { BlockUIModule } from 'ng-block-ui';

interface ICoreModuleOptions {
  window?: any;
  console?: any;
}
 
 
 
@NgModule({
  imports: [
    CommonModule,
 
      BlockUIModule,
    SharedModule,
    AuthModule 
  ],
  declarations: [
   
  ],
  exports: [
    
    CommonModule,
    FormsModule,
    RouterModule,
    HttpModule,
 
  ],
  providers: [
    
  ]

})
export class CoreModule {
  // configuredProviders: *required to configure WindowService and ConsoleService per platform
  static forRoot(configuredProviders: Array<any>): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: configuredProviders
    };
  }
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
