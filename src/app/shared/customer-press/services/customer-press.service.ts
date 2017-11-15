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
   * se�ili bas�nda biz,n se�ilen documentlar�n� apiye g�ndererek siler.
   * @param deleteModel
   * @param searchModel
   */
  removeCheckedDocs(deleteModel, searchModel) {
    deleteModel.documents = this.checkedDocs;
    this.removeSelectedPressSelectedDocuments(deleteModel, searchModel);
  }

  /**
   * kullac�n�nc daha �nceden olu�turdu�u bas�nda bizleri getirir.
   */
  getCustomersPress() {
    this.dataService.post({}, "api/CustomerPress/Search").subscribe(data => { 
      this.customerPress.next(data);
    });;
  }

  /**
   * se�ilen bas�nda bizin documentlar�n� getirir.
   * @param searchModel
   */
  getSelectedPressDocuments(searchModel) {
    this.dataService.post(searchModel, "api/CustomerPress/SearchDocuments").subscribe(data => {
      this.documents.next(data);
    });
  }

  /**
   * document listste se�ilen documentlar�n �dsine g�re istenilen fieldListi d�nd�r�.
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
   * se�ilen bas�nda bize document listte se�ilen haberleri ekler.
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
   * se�ilen bas�dna bi�zi siler
   * @param removeModel
   */
  removeSelectedPress(removeModel): Observable<any> {
    return this.dataService.post(removeModel, "api/CustomerPress/Remove");
  }

 /**
   * se�ili bas�nda biz,n se�ilen documentlar�n� apiye g�ndererek siler.
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
   * yeni olu�turulan bas�nda bizin �zelleriklerini apiye g�ndererek kaydeder.
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
