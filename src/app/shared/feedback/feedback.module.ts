import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback/feedback.component';
import {  FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { FeedbackService } from './services/feedback.service'
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import { BlockUIModule } from 'ng-block-ui';


import { ConfirmationPopoverModule  } from '../angular-confirmation-popover/confirmationPopover.module'

@NgModule({
    imports: [
        ReactiveFormsModule, CommonModule, BrowserModule, FormsModule, TranslateModule, BlockUIModule, ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger' // set defaults here
        })
    ],
    exports: [FeedbackModalComponent, FeedbackComponent   ],
    declarations: [FeedbackComponent, FeedbackModalComponent],
    providers: [FeedbackService],
    entryComponents: [FeedbackComponent, FeedbackModalComponent]
})
export class FeedbackModule { }
