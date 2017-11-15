import { Component, OnInit, Input ,OnDestroy} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import {Agenda} from '../../entity/agenda';
import {AgendaService} from '../../services/agenda.service';
declare var moment: any;
import {TranslateService} from '@ngx-translate/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'agenda-list',
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss']
})
export class AgendaListComponent implements OnInit,OnDestroy {
  @BlockUI('agenda-list-loader') blockUI: NgBlockUI;

  @Input() agendaList: BehaviorSubject<Agenda[]> = new BehaviorSubject<Agenda[]>([]);
  stringLoadMsg: string;

  beforeReqSub: Subscription;
  afterReqSub: Subscription;
  openAgendaDetailsClick(agenda: Agenda) {

    window.open('#/agenda/detail/' + agenda.id +'/'+ moment(agenda.publishDate).format("YYYY/MM/DD"));
  }


  constructor(private agendaService: AgendaService, private translateService: TranslateService) { 

    this.translateService.get("GENERAL.loading").subscribe((msg) => { this.stringLoadMsg = msg; });
    this.beforeReqSub = this.agendaService.beforeRequest.subscribe(data => this.blockUI.start(this.stringLoadMsg));
    this.afterReqSub = this.agendaService.afterRequest.subscribe(data => this.blockUI.stop());
  }

  ngOnInit() { }

  trackById(index, item) {
    return item.id;
  }

  ngOnDestroy() {
    this.beforeReqSub.unsubscribe();
    this.afterReqSub.unsubscribe();

  }
}
