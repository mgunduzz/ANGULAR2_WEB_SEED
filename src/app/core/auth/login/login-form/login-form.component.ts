import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

import * as moment from 'moment';

import {
  FormBuilder,
  
  Validators
} from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',

  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
 

  loginForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),
    lang: new FormControl('')
   
  });
  selectedLang: any;

  langs: Array<any>;

  @Output() onSubmit: EventEmitter<Object> = new EventEmitter();

  constructor(private builder: FormBuilder, private translate: TranslateService ) {
      this.langs = new Array<any>();
      this.langs.push({ lang: "tr", name: 'Türkçe' })
      this.langs.push({ lang: "en", name: 'English' })
      this.selectedLang = this.langs[0];
  }


  changeLang(event) {
      this.selectedLang = event;

      this.translate.setDefaultLang(this.selectedLang.lang);
      this.translate.use(this.selectedLang.lang);
      moment.lang(this.selectedLang.lang);
  }
  submitted = false;
  onSubmitForm() { 
      this.submitted = true;
      this.onSubmit.emit({ username: this.loginForm.value.username, password: this.loginForm.value.password, lang: this.selectedLang });

  }
 
   
};
 