import { Component, Input, OnDestroy, OnInit, OnChanges, AfterContentInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs'
import { SessionService } from  '../../../../core/auth/session.service';
import { DocumentModel } from '../../entity/document.model';
import { StreamModel } from '../../entity/stream.model';
import { DocViewerServiceService } from '../../doc-viewer-service.service';
import { DocumentHelperService } from '../../../../documents/services/helpers/document-helper.service';
import {SlimLoadingBarService, SlimLoadingBarComponent } from 'ng2-slim-loading-bar';
import { DomSanitizer} from '@angular/platform-browser';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {environment} from "../../../../../environments/environment"

 @Component({
  selector: 'app-iframeviewer',
  templateUrl: './iframe-viewer.component.html',
  styleUrls: ['./iframe-viewer.component.scss',]
})
 export class IframeviewerComponent implements OnDestroy, OnInit, OnChanges, AfterContentInit {
  /**
   * Stream videolu linkini taşıyan modeldir.
   */
  @Input() stream: StreamModel;
  @Input() document: DocumentModel;
  @BlockUI('doc-view-iframe-loader') blockUI: NgBlockUI;
   @ViewChild('iframe') iframe: any;

   isLoad: string = "hidden";
   blockU: string = "block";

  securedLink: any; 
    isLoaded = false;
    constructor(private docViewerServiceService: DocViewerServiceService, private sanitizer: DomSanitizer, private slimLoadingBarService: SlimLoadingBarService, private documentHelperService: DocumentHelperService, private sessionService: SessionService) {

    

    }


    isIFrameLoaded() {
     this.blockUI.stop();
     this.isLoad = "visible";
      this.blockU = "none";

 }
  


  ngOnDestroy() {
  }

  ngOnInit(): void {

    this.blockUI.start();
    
    this.slimLoadingBarService.progress = 90;
    setTimeout(() => {
      this.slimLoadingBarService.complete();

    }, 100);

     

    
    this.securedLink = this.sanitizer.bypassSecurityTrustResourceUrl(environment.URL_PROXY+"/proxy.ashx?uuid=" + this.document.uuid + "&cid=" + this.sessionService.session.user.customerIdEnc);
  //this.securedLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.document.link);

  }

   ngAfterContentInit() {
     this.iframe.nativeElement.addEventListener('load', this.isIFrameLoaded.bind(this));

   }

  ngOnChanges(changes: Object): void {

  }
}
