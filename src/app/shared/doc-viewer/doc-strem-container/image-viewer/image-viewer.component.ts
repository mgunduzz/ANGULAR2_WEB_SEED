import { Component, Input, NgModule, AfterContentInit, OnDestroy, OnInit, Inject, OnChanges, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations'

//import { UUID } from 'angular2-uuid';
import { Subject, Subscription } from 'rxjs';

import { DocumentModel } from '../../entity/document.model';
import { StreamModel } from '../../entity/stream.model';
import { DocViewerServiceService } from '../../doc-viewer-service.service';
import { DocumentHelperService } from '../../../../documents/services/helpers/document-helper.service';
import { DOCUMENT } from '@angular/platform-browser';
import {SlimLoadingBarService, SlimLoadingBarComponent } from 'ng2-slim-loading-bar';

declare var $: any;

@Component({
  selector: 'app-imageviewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageviewerComponent implements AfterContentInit, OnDestroy, OnInit, OnChanges {

  @Input() stream: StreamModel;
  @Input() streamIndex: number;
  @Input() document: DocumentModel;

  uuid: string;
  continueScroll: Boolean = true;
  el: any;
  docViewerToolBoxProcessSubscription: Subscription;
  keywordClickSubscription: Subscription;
  keywordCheckedChangeSubscription: Subscription;

  keywordList: Array<any> = new Array();
  itemDetailIndex = -1;
  startHighlight: boolean = true;

  constructor(private docViewerServiceService: DocViewerServiceService, private slimLoadingBarService: SlimLoadingBarService, private documentHelperService: DocumentHelperService, @Inject(DOCUMENT) private doc: any) {
    this.docViewerToolBoxProcessSubscription = this.docViewerServiceService.docViewerToolBoxProcessChangedStream$.subscribe(zoomProcessType => {
      this.docViewerServiceService.currentZoomProcessType = zoomProcessType;
      if (zoomProcessType === "downloadImage") {
        var a = $("<a>")
          .attr("href", this.stream.url)
          .attr("download", "img.png")
          .appendTo("body");

        a[0].click();

        a.remove();
      } else {
        this.runZoomProcess(zoomProcessType);
      }
    });

    this.keywordCheckedChangeSubscription = this.docViewerServiceService.keywordCheckedChangeStream$.subscribe(checkedIndexList => {
      this.showHighlightByKeywordIndexList(checkedIndexList);
    });



    this.keywordClickSubscription = this.docViewerServiceService.keywordClickedStream$.subscribe(clickedKeyword => {

      if (this.startHighlight) {
        this.startHighlight = false;

        let index = this.keywordList.findIndex(keyword => {
          return keyword.keyword === clickedKeyword.keyword && keyword.pageIndex === this.streamIndex + 1;
        });

        let keyword = this.keywordList[index];
        let firstHighlight = keyword.highlights[0];

        keyword.highlights.forEach(highlight => {
          if (highlight.layDatas.y < firstHighlight.layDatas.y)
            firstHighlight = highlight;
        });

        if (firstHighlight) {
          let velocity = (firstHighlight.layDatas.y - 400) / 10;
          let naturalHeight = this.el.naturalHeight;
          let height = this.el.height;
          let multiplay = height / naturalHeight;

          $('#wrapper').kinetic('start', { velocityY: -999999 });
          $('#wrapper').kinetic('end');

          $('#wrapper').kinetic('start', { velocityY: velocity * multiplay * multiplay });
          $('#wrapper').kinetic('end');

          let delay: number = 10;
          keyword.highlights.forEach((highlight, index) => {
            for (var i = 0; i < 3; i++) {
              let thiss = this;
              $('#region-' + highlight.index).delay(delay).animate({ opacity: 0.9 }, 200);
              $('#region-' + highlight.index).delay(delay).animate({ opacity: 0.3 }, 200, function () {
                if (i === 3 && index === keyword.highlights.length - 1)
                  thiss.startHighlight = true;
              });
            }
          });
        }
      }
    });
  }

  runZoomProcess(zoomProcessType) {
    switch (zoomProcessType) {
      case 'zoomIn':
        this.zoomIn();
        break;
      case 'zoomOut':
        this.zoomOut();
        break;
      case 'full':
        this.full();
        break;
      case 'readMode':
        this.readMode();
        break;
      case 'widthMode':
        this.widthMode();
        break;
      case 'heightMode':
        this.heightMode();
        break;
      
      default:
        break;
    }

  }

  saveImage(saveType: string) { }


  highLights: any[];

  pxToPercent(a, b) {

    return (a * 100) / b;
  }

  showHighlightByKeywordIndexList(checkedKeywordList) {
    this.highLights = [];

    checkedKeywordList.forEach(checkedKeyword => {
      if (this.streamIndex === checkedKeyword.pageIndex - 1) {

        this.keywordList.forEach(item => {
          if (item.keyword === checkedKeyword.keyword && item.pageIndex === this.streamIndex + 1) {
            if (item.highlights) {
              item.highlights.forEach(item => {
                item = this.calculateLayDatas(item);
              });
              this.highLights = this.highLights.concat(item.highlights);
            }
          }
        });
      }
    });
  }

  calculateLayDatas(region) {
    let realWidth = this.el.naturalWidth;
    let realHeight = this.el.naturalHeight;

    region.x = this.pxToPercent(region.layDatas.x, realWidth);
    region.y = this.pxToPercent(region.layDatas.y, realHeight);
    region.w = this.pxToPercent(region.layDatas.w, realWidth);
    region.h = this.pxToPercent(region.layDatas.h, realHeight);

    return region;
  }

  calculateRegions() {
    this.highLights = [];



    let keywordResponse = this.docViewerServiceService.getDocumentKeywords(this.document.fileDetails, this.stream.mimeType);
    this.keywordList = keywordResponse.keywords;

    let regions = keywordResponse.regions;

    regions.forEach(region => {
      if (region.keywordPageIndex === this.streamIndex + 1) {
        let item: any = {};

        item = this.calculateLayDatas(region);


        item.index = region.index;
        item.color = region.color;

        this.highLights.push(item);
      }
    });


  }



  /**
   * Butona tıklandığında yakınlaştırır
   */
  zoomIn() {
    this.setSize(1.2);
  }
  /**
   *  Butona tıklandığında uzaklaştırır
   */
  zoomOut() {
    this.setSize(0.8);
  }
  /**
   *  Eski versiyonda ki gibi Full mode için istenilen ölçüler
   */
  full() {

    var multiplay = (((this.el.naturalHeight * 100) / this.el.height) * 0.01);

    //let multiplay = (((this.el.naturalHeight * 100) / this.el.height) * 0.003);



    this.setSize(multiplay);

  }
  /**
   *  Eski versiyonda ki gibi okuma mode için istenilen ölçüler
   */
  readMode() {
    this.full();
    //let multiplay = (((this.el.naturalHeight * 100) / this.el.height) * 0.0156);

    this.setSizeWidth(0.64);

  }
  /**
   * Genişliğe gösterebilmek için yazdığımız bir kod işlemi
   */
  widthMode() {
    //let elHeight = this.el.height;
    //let elWidth = this.el.width;
    //let oran = 790 / elWidth;
    //let height = elHeight * oran;


    //$('#imageMain').attr('style', 'width: ' + 790 + 'px !important; height: ' + height + 'px !important; margin:auto; ');

    //let multiplay = (((this.el.naturalHeight * 100) / this.el.height) * 0.1);

    //this.setSize(multiplay);

    let wrapperWidth = document.getElementById('wrapper').offsetWidth;
    let multiplay = wrapperWidth / this.el.width;


    this.setSizeWidth(multiplay);


  }
  /**
   * Yüksekliğe gösterebilmek için yazdığımız bir kod işlemi
   */

  heightMode() {

    //let elHeight = this.el.height;
    //let elWidth = this.el.width;
    //let oran = 500 / elHeight;
    //let width = elWidth * oran;


    //$('#imageMain').attr('style', 'width: ' + width + 'px !important; height: ' + 500 + 'px !important; margin:auto; ');
    //this.calculateRegions();

    //let multiplay = (((this.el.naturalHeight * 100) / this.el.height) * 0.001);

    //this.setSize(multiplay);

    let wrapperHeight = document.getElementById('wrapper').offsetHeight;
    let multiplay = wrapperHeight / this.el.height;


    this.setSizeWidth(multiplay);
  }

  /**
   * 
   * Resim içinde yakınlaşma ve uzaklaşma işlemleri, genişlik ve yükseklik ayarlamaları setSize da gerçekleşir.
   */

  setSizeWidth(multiplay) {
    let newWidth = multiplay * this.el.width;
    let newHeight = multiplay * this.el.height;


    $('#imageMain').attr('style', 'width: ' + newWidth + 'px !important; height: ' + newHeight + 'px !important; margin:0; position:absolute; ');


  }

  setSize(multiplay) {
    let newWidth = multiplay * this.el.width;
    let newHeight = multiplay * this.el.height;
    if (newWidth > (this.el.naturalWidth) * 1.5 || newWidth < (this.el.naturalWidth) * 0.05) {
      newWidth = this.el.naturalWidth;
      newHeight = this.el.naturalHeight;
    } else {

      this.changeImageMainSize(newWidth, newHeight);

    }
  }

  changeImageMainSize(width, height, sizeType: string = 'px') {
    $('#imageMain').attr('style', `width: ${width}${sizeType} !important; height: ${height}${sizeType} !important; margin:0; position:absolute;      `);
  }

  ngOnChanges(changes: Object): void {

    //setTimeout(() => {
    //  this.keywordList = [];
    //  this.highLights = [];
    //  //this.imageLoaded();
    //}, 100);


  }

  ngOnInit(): void {


  }

  imageLoaded() {
    //$('#imageMain').attr('style', 'width:100% !important; height: auto; margin:0; position:absolute; ');

    let width = window.screen.width;

    if (width <= 768)
      this.widthMode();
    else
      this.runZoomProcess(this.docViewerServiceService.currentZoomProcessType);

    this.calculateRegions();
    this.slimLoadingBarService.complete();

    setTimeout(() => {
      this.slimLoadingBarService.progress = 100;
      this.slimLoadingBarService.stop();
    }, 1);

  }

  /**
   * Jquery Kodları, resim içinde mause ile dolanabilmek için.
   */
  ngAfterContentInit() {

    $('#wrapper').kinetic({
      moved: function (state) {
        //console.log(state);
      }
    });
    $('#left').mousedown(function () {
      $('#wrapper').kinetic('start', { velocity: -30 });

    });
    $('#left').mouseup(function () {
      $('#wrapper').kinetic('end');

    });
    $('#right').mousedown(function () {
      $('#wrapper').kinetic('start', { velocity: 30 });

    });
    $('#right').mouseup(function () {
      $('#wrapper').kinetic('end');
    });

    let _thiss = this;

    $('#wrapper').bind('DOMMouseScroll  mousewheel', function (e) {
      e.preventDefault();
      let up: boolean = true;

      if (e.type == 'mousewheel') {
        up = e.originalEvent.wheelDelta > 0;
      }
      else if (e.type == 'DOMMouseScroll') {
        up = e.originalEvent.detail < 0;
      }

      if (up) {
        $('#wrapper').kinetic('start', { velocityY: -30 });
        $('#wrapper').kinetic('end');
      } else {
        $('#wrapper').kinetic('start', { velocityY: 30 });
        $('#wrapper').kinetic('end');
      }


    });

    this.el = document.getElementById('viewimage');



  }

  ngOnDestroy(): void {
    this.docViewerToolBoxProcessSubscription.unsubscribe();
    this.keywordClickSubscription.unsubscribe();
    this.keywordCheckedChangeSubscription.unsubscribe();
  }

  getPageFirstKeywordIndex(): number {

    let firstKeywordIndex = 0;


    if (this.document.fileDetails.length > 0) {

      for (var i = 0; i < this.streamIndex; i++) {
        let detail = this.document.fileDetails[i];

        let len = detail.layout.layoutDetails.filter((val, i, arr) => {
          return arr.map(e => e.keyword).indexOf(val.keyword) === i;
        }).length;

        firstKeywordIndex += len;
      }
    }


    return firstKeywordIndex;
  }
}
