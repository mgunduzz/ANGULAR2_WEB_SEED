import { Injectable, EventEmitter, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AgendaModalComponent } from '../agenda-modal/agenda-modal.component'
import { Agenda} from '../entity/agenda'
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import {DataService} from '../../../core/services/data.service'
@Injectable()
export class AgendaService implements OnInit {

  agendaList: BehaviorSubject<Agenda[]> = new BehaviorSubject<Agenda[]>([]);
  beforeRequest: EventEmitter<boolean> = new EventEmitter<boolean>();
  afterRequest: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private modalService: NgbModal, private dataService: DataService) { }

  getAgendaList(startDate, endDate) {

    this.beforeRequest.emit(true);

    this.dataService.post({ startDate: startDate, endDate: endDate }, "api/DailySummary/Search").subscribe(data => {
      this.sortByDate(data);
    }); 
  }
   

  sortByDate(data) {

    data.sort(function (a, b) {
      a = new Date(a.publishDate);
      b = new Date(b.publishDate);
      return a > b ? -1 : a < b ? 1 : 0;
    });

    this.agendaList.next(data);
    this.afterRequest.emit();
  }

  exportAganedaClick(aganedaId, exportType) {

    this.dataService.post({ id: aganedaId, exportType: exportType }, "api/DailySummary/Export").subscribe(data => {
    });
  }

  ngOnInit() { }
}
