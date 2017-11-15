import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocBasketModalComponent } from './doc-basket-modal/doc-basket-modal.component';
import { BasketManagerService } from './services/basket-manager.service'
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//import {ConfirmationPopoverModule} from 'angular-confirmation-popover';

import { BlockUIModule } from 'ng-block-ui';
import { DocBasketListComponent } from './doc-basket-list/doc-basket-list.component';
import { ConfirmationPopoverModule  } from '../angular-confirmation-popover/confirmationPopover.module'

import {  Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [NgbModule.forRoot(),
    CommonModule, FormsModule, BlockUIModule, ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }), TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    })
  ],
  exports: [DocBasketModalComponent, DocBasketListComponent],
  declarations: [DocBasketModalComponent, DocBasketListComponent],
  providers: [BasketManagerService],
  entryComponents: [DocBasketModalComponent]
})
export class DocBasketModule { }
