import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { Daterangepicker } from 'ng2-daterangepicker';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { DateTimeMenuService, NgbdDatepickerI18n} from '../services/date-time-menu.service';

declare var $: any;
declare var moment: any;
import { DropDownModalSelection, DropDownModalToggler} from '../../directives/drop-down-modal-selection.directive';

@Component({
  selector: 'date-time-menu',
  templateUrl: './date-time-menu.component.html',
  styleUrls: ['./date-time-menu.component.scss'],
  providers: [DropDownModalToggler]
})

//const I18N_VALUES = {
//  'fr': {
//    weekdays: ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'],
//    months: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
//  }
//  // other languages you would support
//};

export class DateTimeMenuComponent implements OnInit {


  @Input() startDate?: any;
  @Input() endDate?: any;
  @Output() setDateEmitter?: EventEmitter<any> = new EventEmitter<any>();
  selectedIndex: number = 0;

  startDatePicker: NgbDateStruct;
  endDatePicker: NgbDateStruct;

  @ViewChild(NgbdDatepickerI18n) ngbdDatepickerI18n;

  dateRange: Array<string> = ["today", "yesterday", "last7Day", "last1Month", "last3Month", "last6Month", "last12Month", "custom"];

  pickerOptions: any = {
    showClearBtn: false,
    showApplyBtn: false,
    showSelectDateText: false,
    showDropdowns: true,
    showWeekNumbers: true,
    timePickerIncrement: 5,
    autoApply: true,
    alwaysShowCalendars: true,
    showDaterangepicker: true

  };


  constructor(
    private dropDownModalToggler: DropDownModalToggler,
    private daterangepicker: Daterangepicker,
    private dateTimeMenuService: DateTimeMenuService) { }

  setDate(i) {
    this.selectedIndex = i;

    switch (i) {
      case 0:
        this.startDate = moment().startOf("day");
        this.endDate = moment().endOf("day");
        break;
      case 1:
        this.startDate = moment().subtract(1, 'days').startOf("day");
        this.endDate = moment().subtract(1, 'days').endOf("day");
        break;
      case 2:
        this.startDate = moment().subtract(7, 'days').startOf("day");
        this.endDate = moment().endOf("day");
        break;
      case 3:
        this.startDate = moment().subtract(1, 'month').startOf("day");
        this.endDate = moment().endOf("day");
        break;
      case 4:
        this.startDate = moment().subtract(3, 'month').startOf("day");
        this.endDate = moment().endOf("day");
        break;
      case 5:
        this.startDate = moment().subtract(6, 'month').startOf("day");
        this.endDate = moment().endOf("day");
        break;
      case 6:
        this.startDate = moment().subtract(1, 'year').startOf("day");
        this.endDate = moment().endOf("day");
        break;

      default:
    }

    this.startDatePicker =
      { year: this.startDate.year(), month: this.startDate.month() + 1, day: this.startDate.date() };
    this.endDatePicker =
      { year: this.endDate.year(), month: this.endDate.month() + 1, day: this.endDate.date() };

    this.searchSelectedDates(false);
  }

  searchSelectedDates(isCustom = false) {
    if (isCustom) {
      this.selectedIndex = 7;

      this.startDatePicker = this.ngbdDatepickerI18n.startDatePicker;
      this.endDatePicker = this.ngbdDatepickerI18n.endDatePicker;
      this.startDate = moment().set({
        'year': this.startDatePicker.year,
        'month': this.startDatePicker.month - 1,
        'date': this.startDatePicker.day
      }).startOf('day');
      this.endDate = moment().set({
        'year': this.endDatePicker.year,
        'month': this.endDatePicker.month - 1,
        'date': this.endDatePicker.day
      }).endOf('day');

    }
    this.setDateEmitter.emit({ start: this.startDate, end: this.endDate });
    this.ngbdDatepickerI18n.navigate(this.startDatePicker, this.endDatePicker);
    this.dropDownModalToggler.toggleOpen();

  }

  setDefault() {
    this.startDate = moment().startOf("day");
    this.endDate = moment().endOf("day");
    this.startDatePicker =
      { year: this.startDate.year(), month: this.startDate.month() + 1, day: this.startDate.date() };
    this.endDatePicker =
      { year: this.endDate.year(), month: this.endDate.month() + 1, day: this.endDate.date() };
    this.ngbdDatepickerI18n.navigate(this.startDatePicker, this.endDatePicker);

  }

  setDateFromMision(start,end) {

    this.startDate = start;
    this.endDate = end;
    this.startDatePicker =
      { year: this.startDate.year(), month: this.startDate.month() + 1, day: this.startDate.date() };
    this.endDatePicker =
      { year: this.endDate.year(), month: this.endDate.month() + 1, day: this.endDate.date() };
  }
  
  setDateFromMission(start, end) {
    this.selectedIndex = 7;

    this.startDate = start;
    this.endDate = end;
    this.startDatePicker =
      { year: this.startDate.year(), month: this.startDate.month() + 1, day: this.startDate.date() };
    this.endDatePicker =
      { year: this.endDate.year(), month: this.endDate.month() + 1, day: this.endDate.date() };
  }


  clearAndSetDefaultSelectedDates() {
    this.selectedIndex = 0;
    //this.startDate = moment().startOf("day");
    //this.endDate = moment().endOf("day");
    //this.startDatePicker =
    //  { year: this.startDate.year(), month: this.startDate.month() + 1, day: this.startDate.date() };
    //this.endDatePicker =
    //  { year: this.endDate.year(), month: this.endDate.month() + 1, day: this.endDate.date() };
    this.ngbdDatepickerI18n.navigate(this.startDatePicker, this.endDatePicker);
    this.dropDownModalToggler.toggleOpen();

  }

  ngOnInit() {
    this.selectedIndex = 0;
    this.startDatePicker =
      { year: this.startDate.year(), month: this.startDate.month() + 1, day: this.startDate.date() };
    this.endDatePicker =
      { year: this.endDate.year(), month: this.endDate.month() + 1, day: this.endDate.date() };

    this.ngbdDatepickerI18n.navigate(this.startDatePicker, this.endDatePicker);


  }


}
