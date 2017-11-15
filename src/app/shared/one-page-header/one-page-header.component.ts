import { OnePageHeaderService } from './one-page-header.service';
import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'one-page-header',
  templateUrl: './one-page-header.component.html',
  styleUrls: ['./one-page-header.component.scss']
})
export class OnePageHeaderComponent implements OnInit {

 
  constructor(private onePageHeaderService : OnePageHeaderService) { }

  @Input() sharedUrl: string = '';
  @Input() allowedButtons: any;
  agendaUrl: any = window.location.href;
  ngOnInit() {

  }

  closeClick() {
    window.top.close();
  }

  exportAgendaClick() {
      this.onePageHeaderService.agendaExportClick.next();
  }

}
