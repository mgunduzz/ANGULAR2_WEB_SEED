import { Subscription } from 'rxjs';
import { OnePageHeaderService } from './../../one-page-header/one-page-header.service';
import { Component, OnInit, ViewEncapsulation, AfterContentInit, OnDestroy, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
import {AgendaService} from '../services/agenda.service';
declare var $: any;
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'agenda-details',
  templateUrl: './agenda-details.component.html',
  styleUrls: ['./agenda-details.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AgendaDetailsComponent implements OnInit, AfterContentInit, OnDestroy {

  segments: any;
  unsecuredAgendaLinkDownload: any;
  securedAgendaLink: any;
  unsecuredAgendaLink: any;
  agendaId: number;
  agendaExportClickSubscription: Subscription;
  onePageHeaderButtonList: any = {};
  isLoad: boolean = false;
  @BlockUI('agenda-iframe-loader') blockUI: NgBlockUI;
  displayType = "block";

  @ViewChild('iframe') iframe: any;
  public url: any;

  constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, private agendaService: AgendaService,
    private modalService: NgbModal, private onePageHeaderService: OnePageHeaderService) {

    this.segments = this.activatedRoute.snapshot.url;
  }

  isIFrameLoaded() {
      this.blockUI.stop();
      this.displayType = "none";
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.unsecuredAgendaLink = "https://share.interpress.com/gundem/" + params['y'] + "/" + params['m'] + "/" + params['d'];
      this.unsecuredAgendaLinkDownload = "https://share.interpress.com/gundem/" + params['y'] + "/" + params['m'] + "/" + params['d'] + "?export=true";
      this.securedAgendaLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.unsecuredAgendaLink);
      this.agendaId = params['id'];
    });

    this.agendaExportClickSubscription = this.onePageHeaderService.agendaExportClick.subscribe(() => {
      this.exportAgendaClick();
    });
    this.blockUI.start();
    this.displayType = "block";
    this.onePageHeaderButtonList.share = true;
    this.onePageHeaderButtonList.exportAgenda = true;
  }



  printPage() {
    //window.frames["printf"].focus();
    //window.frames["printf"].print();
    //window.print();
  }


  exportAgendaClick() {
    this.securedAgendaLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.unsecuredAgendaLinkDownload);
  }


  ngAfterContentInit() {
    this.iframe.nativeElement.addEventListener('load', this.isIFrameLoaded.bind(this));

  }

  ngOnDestroy() {
    this.agendaExportClickSubscription.unsubscribe();
  }
}
