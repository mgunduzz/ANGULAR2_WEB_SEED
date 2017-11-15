import { OnePageHeaderService } from './one-page-header.service';
import { Http } from '@angular/http';
import { TranslateLoader } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockUIModule } from 'ng-block-ui';
import { Daterangepicker } from 'ng2-daterangepicker';
import { SocialShareModule } from './../social-share/social-share.module';
import { OnePageHeaderComponent } from './one-page-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule, Daterangepicker, BlockUIModule, SocialShareModule, NgbModule.forRoot()
  ],
  declarations: [ OnePageHeaderComponent ],
  providers: [ OnePageHeaderService ],
  exports : [OnePageHeaderComponent]
})
export class OnePageHeaderModule { }
   