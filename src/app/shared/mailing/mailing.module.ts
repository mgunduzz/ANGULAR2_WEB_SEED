import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailSenderModalComponent } from './mail-sender-modal/mail-sender-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MailingService } from './mailing.service'
import { BlockUIModule } from 'ng-block-ui';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import { MailSenderComponentComponent } from './mail-sender-component/mail-sender-component.component';
import { ConfirmationPopoverModule  } from '../angular-confirmation-popover/confirmationPopover.module';
import { MailSearchPipe } from './pipe/mail-search.pipe'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    BlockUIModule,
    TranslateModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  exports: [
    MailSenderComponentComponent
  ],
  entryComponents: [MailSenderModalComponent],
  declarations: [MailSenderModalComponent, MailSenderComponentComponent, MailSearchPipe],
  providers: [MailingService]
})
export class MailingModule { }
 