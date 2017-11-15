import { Component, Input, OnInit, OnDestroy, HostListener} from '@angular/core';
import { Subscription } from 'rxjs'

 import { StreamModel } from '../../entity/stream.model';

import {VgAPI} from 'videogular2/core';
import { DocViewerServiceService } from '../../doc-viewer-service.service';
declare var $: any;

import {SlimLoadingBarService, SlimLoadingBarComponent } from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-videoviewer',
  templateUrl: './video-viewer.component.html',
  styleUrls: ['./video-viewer.component.scss']
})

/**
 * Bu sınıf videogular kullanarak html5 videoları steram eder.
 * 
 */
export class VideoviewerComponent implements OnInit, OnDestroy {

  keywordClickSubscription: Subscription;

  result:number=0;
  /**
   * Stream videolu linkini taşıyan modeldir.
   */

  @Input() stream: StreamModel;
  isStart:boolean=false;

  @HostListener('window:keydown', ['$event'])
  spaceEvent(event: any) {
    if (event.keyCode === 32) {
      this.startPlayOrPause();
    }
    else if (event.keyCode === 39) {
      this.api.currentTime = this.api.currentTime + 5;
    }
    else if (event.keyCode === 37) {
      this.api.currentTime = this.api.currentTime - 5;
    }
  
  }
  @HostListener('click', ['$event.target'])
  clickEvent(event: any) {
    if (event.id === "singleVideo") {
      this.startPlayOrPause();
    }
  }


  constructor(public api: VgAPI, private docViewerServiceService: DocViewerServiceService, private slimLoadingBarService: SlimLoadingBarService) {
    this.keywordClickSubscription = this.docViewerServiceService.keywordClickedStream$.subscribe(clickedKeyword => {
      let timeParts = clickedKeyword.layoutData.split(':');

      this.startClick(timeParts[0]);
      this.api.volume = 10;

    });
  }
  /**
   * Videogular apisini ekledik.
   */
  ngOnInit() {

    var currentProgress = 100 - this.slimLoadingBarService.progress;

    this.slimLoadingBarService.progress += currentProgress / 2;
    setTimeout(() => {
      this.slimLoadingBarService.complete();

    }, 100);
  }

  ngOnDestroy(): void {
    this.keywordClickSubscription.unsubscribe();
  }

  onPlayerReady() {

    var currentProgress = 100 - this.slimLoadingBarService.progress;

    this.slimLoadingBarService.progress += currentProgress / 2;
    setTimeout(() => {
      this.slimLoadingBarService.complete();

    }, 100);

  }
  /**
   *  Başlat butonuna tıklandığında, startclick devreye girer ve saniye, dakika hesaplanması yapılır
   */
  x: number = 60;

  startPlayOrPause() {
    if (!this.isStart) {
      this.api.play();
      this.isStart = true;
    } else {
      this.api.pause();
      this.isStart = false;
    }
  }

  startClick(sec: number, min: number = 0) {
    
    sec = sec * 1;
    min = min * 1;
    this.api.currentTime = this.x * min + sec;
  }
}
