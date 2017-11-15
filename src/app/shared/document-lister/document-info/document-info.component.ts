import { NewsService } from './../../../documents/news/news-service.service';
import { DocumentListerService } from './../document-lister.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject, Subscription } from 'rxjs';

import { ResponseData } from '.././entity/responseData.model';


/**
 * Documentlar ile ilgili metadataların gösterildiği componenttir. 
 */
@Component({
  selector: 'document-info',
  templateUrl: './document-info.component.html',
  styleUrls: ['./document-info.component.scss']
})
export class DocumentInfoComponent implements OnInit, OnDestroy {

  @Input() totalDocCount: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  @Input() basketData: Array<string> = [];
  mecraCount: Array<any> = [];
  @Input() listType: string = ''; 
  subs: Subscription;
  isShowInfoGraphic: boolean = false;

  constructor(private documentListerService: DocumentListerService,private newsService : NewsService) { }


  ngOnInit() {
    this.isShowInfoGraphic = this.newsService.isShowInfoGraphic;

    this.subs = this.totalDocCount.subscribe(myData => {
      let counts: any = myData;
      this.mecraCount = [];
      if (typeof counts.documentTypeStatics != 'undefined') {
        counts.documentTypeStatics.forEach(data => {
          Object.keys(data).map((key) => {
            if (data[key] > 0)
              this.mecraCount.push({ key: key, value: data[key] });
          });
        });

        this.mecraCount.sort(function (a, b) {
          return parseFloat(a.key) - parseFloat(b.key);
        });
      }
    });

  }

  onToggleInfoChange() {
    this.newsService.isShowInfoGraphic = this.isShowInfoGraphic;
    this.documentListerService.onToggleInfoGraphic.next(this.isShowInfoGraphic);
  }

  toggleInfo() {
    this.isShowInfoGraphic = !this.isShowInfoGraphic;
    this.newsService.isShowInfoGraphic = this.isShowInfoGraphic;
    this.documentListerService.onToggleInfoGraphic.next(this.isShowInfoGraphic);
  }


  ngOnDestroy() {

    this.subs.unsubscribe();

  }

}
