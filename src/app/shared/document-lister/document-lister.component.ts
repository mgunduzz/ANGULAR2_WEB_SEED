import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable, BehaviorSubject,Subscription } from 'rxjs';
import { DocumentListerService } from './document-lister.service'

import { ResponseData } from './entity/responseData.model';

/**
 * Documents dataları  attr.den observable data olarak bu componenta gelir.
 * Gelen data diğer componentlara gönderilir.
 */

@Component({
  selector: 'document-lister',
  templateUrl: './document-lister.component.html',
  styleUrls: ['./document-lister.component.scss'],
  encapsulation:ViewEncapsulation.None
}) 
export class DocumentListerComponent implements OnInit,OnDestroy {

  /**
   * observable document data
   */
  @Input() documents: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  @Input() totalCount: BehaviorSubject<any> = new BehaviorSubject<any>(-1);
  @Input() pageViewCount: number = -1;  
  @Input() isBasket?: boolean = false;  
  @Input() basketCategories?: Array<any>; 
  @Input() showItems: Array<string> = [];
  @Input() basketData?: Array<string>;
  @Input() categoriesCount: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);  
  @Input() currentPage: BehaviorSubject<number>;
  @Input() isSimpleList: boolean = false;
  @Input() listType: string = '';

  subscription: Subscription;
  
  /*@Output() onChangeCurrentPage: EventEmitter<number> = new EventEmitter();
  @Output() onChangePageViewCount: EventEmitter<number> = new EventEmitter(); 
*/
  docListenerData: ResponseData;

  constructor(private documentListerService: DocumentListerService) {
   }
  ngOnInit() {
    this.docListenerData = new ResponseData();
    this.docListenerData.documents = this.documents;
    this.docListenerData.totalCount = this.totalCount;
    this.docListenerData.pageViewCount = this.pageViewCount;
    this.docListenerData.showItems = this.showItems;

    if (this.categoriesCount.value.length > 0) {
      this.subscription=  this.categoriesCount.subscribe(data => {
        this.documentListerService.CustomersCategoriesCount(data);
      });
    }
  }
  ngOnDestroy() {
    if (this.categoriesCount.value.length > 0) {
      this.subscription.unsubscribe();

    }
  }

}
