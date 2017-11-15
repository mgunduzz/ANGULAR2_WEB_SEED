import { Injectable, OnInit, EventEmitter} from '@angular/core';
import { Observable, BehaviorSubject, Subscription} from 'rxjs';
import {NewsService} from  "../../../documents/news/news-service.service";
import {DataService}  from "../../../core/services/data.service";

@Injectable()
export class CustomerPressService implements OnInit {

  customerPress: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  documents: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  selectedDocs: any[];
  checkedDocs: any[];
  toastResponse: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private newsService: NewsService, private dataService: DataService) { }

  /**
   * seçili basýnda biz,n seçilen documentlarýný apiye göndererek siler.
   * @param deleteModel
   * @param searchModel
   */
  removeCheckedDocs(deleteModel, searchModel) {
    deleteModel.documents = this.checkedDocs;
    this.removeSelectedPressSelectedDocuments(deleteModel, searchModel);
  }

  /**
   * kullacýnýnc daha önceden oluþturduðu basýnda bizleri getirir.
   */
  getCustomersPress() {
    this.dataService.post({}, "api/CustomerPress/Search").subscribe(data => { 
      this.customerPress.next(data);
    });;
  }

  /**
   * seçilen basýnda bizin documentlarýný getirir.
   * @param searchModel
   */
  getSelectedPressDocuments(searchModel) {
    this.dataService.post(searchModel, "api/CustomerPress/SearchDocuments").subscribe(data => {
      this.documents.next(data);
    });
  }

  /**
   * document listste seçilen documentlarýn ýdsine göre istenilen fieldListi döndürü.
   * @param documents
   */
  getSelectedDocuments(documents): Observable<any> {
    return this.newsService.searchDocument({
      ids: documents,
      fieldList: ["DocumentTypeId", "PublishDate", "MediaName", "Title", "RowIndex", "MediaNameId", "Id"],
      pageViewCount: documents.length
    });
  }

  /**
   * seçilen basýnda bize document listte seçilen haberleri ekler.
   * @param addModel
   * @param searchModel
   */
  addSelectedDocumentsToSelectedPress(addModel, searchModel) {
    this.dataService.post(addModel, "api/CustomerPress/AddDocuments").subscribe(data => {
      if (data === 200) {
        this.toastResponse.next(true);
        this.getCustomersPress();
      } else {
        this.toastResponse.next(false);

      }

    });
  }

  /**
   * seçilen basýdna biþzi siler
   * @param removeModel
   */
  removeSelectedPress(removeModel): Observable<any> {
    return this.dataService.post(removeModel, "api/CustomerPress/Remove");
  }

 /**
   * seçili basýnda biz,n seçilen documentlarýný apiye göndererek siler.
   * @param deleteModel
   * @param searchModel
   */
  removeSelectedPressSelectedDocuments(deleteModel, searchModel) {
    this.dataService.post(deleteModel, "api/CustomerPress/RemoveDocuments").subscribe(data => {
      if (data === 200) {
        this.toastResponse.next(true);
        this.getCustomersPress();
      } else {
        this.toastResponse.next(false);

      }
    });;
  }

  /**
   * yeni oluþturulan basýnda bizin özelleriklerini apiye göndererek kaydeder.
   * @param saveModel
   */
  createNewCustomerPress(saveModel) {
    this.dataService.post(saveModel, "api/CustomerPress/Save").subscribe(data => {
      if (data === 200) {
        this.toastResponse.next(true);
      } else {
        this.toastResponse.next(false);
      }
    });
  }

  
  clearCache() {
    this.customerPress.next([]);
    this.documents.next([]);
    this.selectedDocs = [];
    this.checkedDocs = [];
  }



  ngOnInit() {

  }

}
