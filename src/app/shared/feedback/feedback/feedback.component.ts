import { Component, OnInit, Input } from '@angular/core';

import { FeedbackService } from '../services/feedback.service'
import { DocumentModel } from '../../doc-viewer/entity/document.model'
import { FeedbackViewModel, ErrorType } from '../entity/feedback-view.model'
import { FormGroup, FormControl, FormBuilder, Validators,Validator } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackForm = new FormGroup({
    sendername: new FormControl('', Validators.required),
    note: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  @BlockUI('feedback-loader') blockUI: NgBlockUI;
  loadingMessage:string;

  @Input() document: DocumentModel;
  feedBackViewModel: FeedbackViewModel;
  atLeastOneErrorTypeSelected : boolean = false;

  constructor(private feedbackService: FeedbackService, public activeModal: NgbActiveModal,private builder: FormBuilder, private translateService: TranslateService, private toastyService: ToastyService) {}

  /**
   * feedback gönderir
   */
  sendFeedBack() { 
    let customerName = "Akbank";
    let userName = "akbnk124";
    let email = "mazlumgunduz@interpress.com";

    let selectedErrorTypes: string[] = [];
    this.feedBackViewModel.errorTypes.forEach(errorType => {
      if (errorType.isSelected) {
        selectedErrorTypes.push(errorType.name);
      }
    });

    this.blockUI.start();
    this.feedbackService.sendFeedback(customerName, userName, this.feedBackViewModel.senderName, selectedErrorTypes, this.feedBackViewModel.note, email, this.document)
      .subscribe(response => {
        this.blockUI.stop();
        this.toastyService.success("Hatalı / Eksik Giriş Bildirimi Gönderildi");
        this.feedbackService.onFeedbackSended.emit(true);
      },err => {
        this.blockUI.stop();

      });

    this.activeModal.dismiss('Cross click');
  }

  /**
   * seçili hata tiplerini çeker ve enaz bir tanesinin seçili olup olmadığını kontrol eder.
   * @param errorType
   */
  errorTypeChecked(errorType : ErrorType) {
    let selectedErrorTypes: ErrorType[] = this.feedBackViewModel.errorTypes.filter(err => err.isSelected);
    this.atLeastOneErrorTypeSelected = selectedErrorTypes.length > 0;
  }

  ngOnInit() {
    this.translateService.get("GENERAL.loading").subscribe((msg) => {
      this.loadingMessage = msg;
      }
    );

    this.feedBackViewModel = new FeedbackViewModel();

    let errorTypes: string[] = ["İsim / Anahtar Kelime Benzerliği", "İlgisiz Haber", "Haber Atlama", "Anahtar Kelimemi Göremiyorum", "Tekrar Eden Haber"];

    errorTypes.forEach(errorType => {
      let errorTypeModel: ErrorType = { name: errorType, isSelected: false };
      this.feedBackViewModel.errorTypes.push(errorTypeModel);
    });

  }

}
