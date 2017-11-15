import { DocumentSearchOptions } from './../../core/model/document-search-options';
import { Injectable, OnDestroy, EventEmitter } from '@angular/core';
import { DocumentSearchModel } from "../../core/model"
import { UUID } from 'angular2-uuid';

import { Subject } from 'rxjs/Subject';
import { CategoryListerService } from '../category-lister/services/category-lister.service';
import * as moment from 'moment';


@Injectable()
export class DocumentListerService {

  constructor(private CategoryListerService: CategoryListerService) { }

  onOpenDocument: EventEmitter<any> = new EventEmitter();
  sortBasket: EventEmitter<any> = new EventEmitter();
  getMediaProfileForBasket: EventEmitter<any> = new EventEmitter();
  onOpenColuminists: EventEmitter<any> = new EventEmitter();
  onToggleInfoGraphic: EventEmitter<boolean> = new EventEmitter();
  isSimpleList: EventEmitter<any> = new EventEmitter(false);
  // Observable string sources
  public newListComponentChangePage = new Subject<any>();

  // Observable string streams
  _newListComponentChangePage = this.newListComponentChangePage.asObservable();

  // Service message commands 
  changePageClickService(page) {
    this.newListComponentChangePage.next(page);

  }

  // Observable string sources
  private newListComponentChangePageViewCount = new Subject<any>();

  // Observable string streams
  _newListComponentChangePageViewCount = this.newListComponentChangePageViewCount.asObservable();

  // Service message commands 
  changePageVievCount(viewCount) {
    this.newListComponentChangePageViewCount.next(viewCount);
  }

  // Observable string sources
  private newListComponentSortingClick = new Subject<any>();

  // Observable string streams
  _newListComponentSortingClick = this.newListComponentSortingClick.asObservable();

  // Service message commands 
  changeSortField(order) {

    this.newListComponentSortingClick.next(order);
  }


  CustomersCategoriesCount(data) {



    this.CategoryListerService.calculateCustomerCategoriesCount(data);

  }

  // Observable string sources
  private getSelectedMediaProfile = new Subject<any>();

  // Observable string streams
  _getSelectedMediaProfile = this.getSelectedMediaProfile.asObservable();

  // Service message commands
  getSelectedMediaProfileClick(mediaId) {
    this.getSelectedMediaProfile.next(mediaId);

  }

  searchModelProperties = []; 

  shrinkSearchModel(searchModel: DocumentSearchModel) {
    let newModel: any = {};


    Object.keys(searchModel).forEach(key => {
      let obj = searchModel[key];

      if (obj != undefined) {

        if (typeof obj === 'number')
          newModel[key] = obj;
        if (typeof obj === 'boolean')
          newModel[key] = obj;
        if (key === 'startDateTime' || key === 'endDateTime') {
          newModel[key] = moment(obj).toString();
        } else if (obj.length > 0)
          newModel[key] = obj;
      }

    });

    //newModel.categories = [];

    return newModel;
  }


  setSearchModelToLocalStorage(options: DocumentSearchOptions): string {
    options.searchModel = this.shrinkSearchModel(options.searchModel); 

    let uuid = UUID.UUID();
    sessionStorage.setItem('detail-' + uuid, JSON.stringify(options));


    return uuid;
  }

  removeSearchModelFromLocalStorage(uuid: string) {
    sessionStorage.removeItem('detail-' + uuid);

  }

  getSearchModelFromLocalStorage(uuid: string) : string {
    return sessionStorage.getItem('detail-' + uuid);
  }

}
