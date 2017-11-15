import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, Validator } from '@angular/forms';

import { MailGroup, Mail } from '../models/mail-group'
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { MailingService } from '../mailing.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'mail-sender-modal',
  templateUrl: './mail-sender-modal.component.html',
  styleUrls: ['./mail-sender-modal.component.scss']
})
export class MailSenderModalComponent  { 

  constructor(public activeModal: NgbActiveModal) { }

  @Input()
  documents: Array<any> = new Array();

}
 