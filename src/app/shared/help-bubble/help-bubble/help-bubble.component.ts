import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, Validator } from '@angular/forms';
import { FeedbackViewModel, ErrorType } from '../entity/feedback-view.model'
import { HelpBubbleService } from '../services/help-bubble.service'
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import { Subscription } from 'rxjs';

@Component({
  selector: 'help-bubble',
  templateUrl: './help-bubble.component.html',
  styleUrls: ['./help-bubble.component.scss']
})
export class HelpBubbleComponent implements OnInit, OnDestroy {
  isClicked: boolean = false;
  helpBubbleViewModel: FeedbackViewModel = new FeedbackViewModel();
  changeSuggestionModeSubscription: Subscription;
  isSuggestionMode: boolean = true;

  helpBubbleForm = new FormGroup({
    sendername: new FormControl('', Validators.required),
    note: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });
  constructor(
    private helpBubbleService: HelpBubbleService,
    private toastyService: ToastyService) { }


  sendFeedBack() {
    let customerName = "Akbank";
    let userName = "akbnk124";
    let email = "mazlumgunduz@interpress.com";

    let selectedErrorTypes: string[] = [];
    this.helpBubbleViewModel.errorTypes.forEach(errorType => {
      if (errorType.isSelected) {
        selectedErrorTypes.push(errorType.name);
      }
    });


    this.helpBubbleService.sendFeedback(customerName, userName, this.helpBubbleViewModel.senderName, selectedErrorTypes, this.helpBubbleViewModel.note, email)
      .subscribe(response => {
        this.toastyService.success("Yard�m Maili G�nderildi");
      }, err => {
        this.toastyService.success("Hata !!!");
      });
    this.helpBubbleViewModel = new FeedbackViewModel();


    this.isClicked = false;
  }

  goUp() {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this.changeSuggestionModeSubscription = this.helpBubbleService.changeSuggestionMode.subscribe(isSuggestion => {
      this.isSuggestionMode = isSuggestion;
    });
  }

  ngOnDestroy(): void {
    this.changeSuggestionModeSubscription.unsubscribe();
  }
}
