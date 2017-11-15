import {Component, Injectable, Input, EventEmitter, ViewChild, ElementRef,OnInit, OnChanges} from '@angular/core';
import {NgbDatepickerI18n, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from "../../../core/auth/session.service"
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  tr: {
    weekdays: ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'],
   months: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
  }
};

// Define a service holding the language. You probably already have one if your app is i18ned.
@Injectable()
export class DateTimeMenuService {

  language = this.sessionService.session.user.lang.lang;

  constructor( private sessionService: SessionService) {
  }
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: DateTimeMenuService) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
}

@Component({
  selector: 'ngbd-datepicker-i18n',
  templateUrl: './datepicker-i18n.html',
  providers: [DateTimeMenuService, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }] // define custom NgbDatepickerI18n provider
})
export class NgbdDatepickerI18n implements OnInit{
  @Input() startDatePicker = {year: 1967,month: 1,day: 1};
  @Input() endDatePicker = {year: 2067,month: 12,day: 31};


  @ViewChild('startDatePickerNavigate') startDatePickerNavigate;
  @ViewChild('endDatePickerNavigate') endDatePickerNavigate;
  maxDate: NgbDateStruct = {
    year: 2067,
    month: 12,
    day: 31
  };

  minDate: NgbDateStruct = {
    year: 1967,
    month: 1,
    day: 1
  };
  constructor(private _i18n: DateTimeMenuService, private ngbDatepickerConfig:NgbDatepickerConfig ) {
   
  }

  set language(language: string) {
    this._i18n.language = language;
  }

  get language() {
    return this._i18n.language;
  }


  navigate(startDatePicker, endDatePicker) {
    this.startDatePickerNavigate.navigateTo(startDatePicker);
    this.endDatePickerNavigate.navigateTo(endDatePicker);
  }


  ngOnInit() {
 
  }

}
