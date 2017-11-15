import { Component, OnInit, OnDestroy } from '@angular/core';
import { Daterangepicker } from 'ng2-daterangepicker';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { SessionService } from "../../../core/auth/session.service"
import { Agenda} from '../entity/agenda'
import {AgendaService } from '../services/agenda.service';
declare var moment: any;
import { BehaviorSubject, Subscription } from 'rxjs';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'agenda-modal',
  templateUrl: './agenda-modal.component.html',
  styleUrls: ['./agenda-modal.component.scss']
})
export class AgendaModalComponent implements OnInit, OnDestroy {


  agendaList: BehaviorSubject<Agenda[]> = new BehaviorSubject<Agenda[]>([]);
  agendaSubscription: Subscription;
  stringLoadMsg: string;
  startDate = moment().startOf('day').subtract(7, 'days');
  endDate = moment().endOf('day');

  pickerOptionsStart: Object = {
    'showDropdowns': true,
    'showWeekNumbers': true,
    'timePickerIncrement': 5,
    'autoApply': true,
    singleDatePicker: true,
    startDate: this.startDate
  };
  pickerOptionsEnd: Object = {
    'showDropdowns': true,
    'showWeekNumbers': true,
    'timePickerIncrement': 5,
    'autoApply': true,
    singleDatePicker: true,
    startDate: this.endDate 
    
  };



  constructor(public activeModal: NgbActiveModal,
    private daterangepickerOptions: DaterangepickerConfig,
    private sessionService: SessionService,
    private agendaService: AgendaService) {

  

  }

  ngOnInit() {

      this.agendaSubscription = this.agendaService.agendaList.subscribe(data => {
          this.agendaList.next(data);
      });
    

    this.agendaService.getAgendaList(this.startDate, this.endDate);


    
    


  }


  selectStartDate(ev) {
    this.startDate = ev.start._d;
  }

  selectEndDate(ev) {
    this.endDate = ev.end._d;

  }

  searchClick() {
    this.agendaService.getAgendaList(this.startDate, this.endDate);
  }
  
  private calcDatepickerLang() {

    if (this.sessionService.session.user.lang.lang == "tr") {
      this.daterangepickerOptions.settings = {
        locale: {
          format: 'DD-MM-YYYY',
          "separator": " - ",
          applyLabel: "Onayla",
          "cancelLabel": "Vazgeç",
          "customRangeLabel": "Tarih Aralýðý"
        },
        alwaysShowCalendars: true,
        ranges: {
          'Bugün': [moment(), moment()],
          'Dün': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Son 7 Gün': [moment().subtract(6, 'days'), moment()],
          'Son 1 Ay': [moment().subtract(1, 'month'), moment()],
          'Son 3 Ay': [moment().subtract(4, 'month'), moment()],
          'Son 6 Ay': [moment().subtract(6, 'month'), moment()],
          'Son 12 Ay': [moment().subtract(12, 'month'), moment()]

        }

      };
    } else {
      this.daterangepickerOptions.settings = {
        locale: {
          format: 'DD-MM-YYYY',
          "separator": " - ",
          applyLabel: "Confirm",
          "cancelLabel": "Cancel",
          "customRangeLabel": "Date Range"
        },
        alwaysShowCalendars: true,
        ranges: {
          'Day': [moment(), moment()],
          'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 days': [moment().subtract(6, 'days'), moment()],
          'Last 1 months': [moment().subtract(1, 'month'), moment()],
          'Last 3 months': [moment().subtract(4, 'month'), moment()],
          'Last 6 months': [moment().subtract(6, 'month'), moment()],
          'Last 12 months': [moment().subtract(12, 'month'), moment()],

        }

      };
    }
  }

  ngOnDestroy() {
    this.agendaSubscription.unsubscribe();
  }
}
