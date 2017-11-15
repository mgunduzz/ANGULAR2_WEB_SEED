import { Component } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {TranslateService} from '@ngx-translate/core';

import {
  Router,
  NavigationExtras,
} from '@angular/router';
import { SessionService } from '../session.service';
import { AuthService } from '../auth.service';

@Component({
  template: `
     <div *blockUI="'login-loader'" >
    <login-modal  (onSubmit)="login($event)"    >
</login-modal></div>
  `
})
export class LoginComponent {
  message: string;
  @BlockUI('login-loader') blockUI: NgBlockUI;

  constructor(public sessionService: SessionService, public authService: AuthService, public router: Router, private translateService: TranslateService) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.sessionService.isLoggedIn ? 'in' : 'out');
  }
  private stringLoadMsg: string;
   
  login(credentials: any) {
    this.translateService.get("GENERAL.loading").subscribe((msg) => {
      this.stringLoadMsg = msg;
    }
    );
    this.blockUI.start(this.stringLoadMsg);

    if (credentials.uenc) {
      this.sessionService.addHttpHeader("uEnc", credentials.uenc);
      this.sessionService.addHttpHeader("mEnc", credentials.menc);
    }


    this.authService.login(credentials.username, credentials.password, credentials.lang).subscribe(() => {

      this.sessionService.deleteHttpHeader("uEnc");
      this.sessionService.deleteHttpHeader("mEnc");

      this.blockUI.stop();
      this.setMessage();
      if (this.sessionService.isLoggedIn) {

        let redirect = this.sessionService.redirectUrl ? this.sessionService.redirectUrl : '';


        let navigationExtras: NavigationExtras = {
          preserveQueryParams: true,
          preserveFragment: true
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);

      }
    }, () => {
      this.blockUI.stop();
      this.sessionService.deleteHttpHeader("uEnc");
      this.sessionService.deleteHttpHeader("mEnc");
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/