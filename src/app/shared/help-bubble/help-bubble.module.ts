import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpBubbleComponent } from './help-bubble/help-bubble.component';
import { HelpBubbleService } from './services/help-bubble.service';
import { BlockUIModule } from 'ng-block-ui';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';




export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  imports: [CommonModule, FormsModule, NgbModule, BlockUIModule, ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })],
  exports: [HelpBubbleComponent],
  declarations: [HelpBubbleComponent],
  providers: [HelpBubbleService]
  
})
export class HelpBubbleModule { }
