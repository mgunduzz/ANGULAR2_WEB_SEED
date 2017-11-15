import { HelpBubbleService } from './shared/help-bubble/services/help-bubble.service';
import { Subscription } from 'rxjs';
import { SessionService } from './core/auth/session.service';
import { Component, HostListener, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from "./core/auth/auth.service"

import { Observable } from 'rxjs/Observable';
import { Router, NavigationExtras } from '@angular/router';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';
import * as moment from 'moment';
import { DOCUMENT } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostListener("window:scroll", ['$event'])
  onWindowScroll(event) {
    let src = event.srcElement.scrollingElement;

    if (window.pageYOffset > (this.document.body.scrollHeight / 100) * 15) {
      this.helpBubbleService.changeSuggestionMode.next(false);
    } else {
      this.helpBubbleService.changeSuggestionMode.next(true);
    }
  }
  showSidenav$: Observable<boolean>;
  hasError$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  firstName$: Observable<string>;
  lastName$: Observable<string>;
  isShowFooter: Boolean = true;

  showFooterSubscription: Subscription;

  constructor(
    translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private toastyConfig: ToastyConfig,
    private sessionService: SessionService,
    private helpBubbleService: HelpBubbleService,
    @Inject(DOCUMENT) private document: Document
  ) {

    translate.addLangs(["en", "tr"]);

    translate.setDefaultLang('tr');

    translate.use('tr');
    moment.lang('tr');

    this.toastyConfig.theme = 'bootstrap';

    this.showFooterSubscription = this.sessionService.showFooter.subscribe(isShow => {
      this.isShowFooter = isShow;
    });

  }




}
