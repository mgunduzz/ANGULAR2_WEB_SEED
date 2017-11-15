import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShareButtonsModule } from '../social-share/ngx-sharebuttons'
import { SocialShareComponent} from '../social-share/social-share.component'
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, ShareButtonsModule.forRoot(), FormsModule
  ],
  declarations: [SocialShareComponent],
  exports: [SocialShareComponent],
  providers: [],
  entryComponents: []
})
export class SocialShareModule { }
