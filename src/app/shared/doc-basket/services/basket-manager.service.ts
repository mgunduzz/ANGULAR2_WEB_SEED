import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs'

import { BasketModel } from '../entity/basket.model'
import { Document } from '../../document-lister/entity/document.model'
import { SessionService } from "../../../core/auth/session.service"
import { DataService } from "../../../core"
import { CategoryListerService} from "../../category-lister/services/category-lister.service"


@Injectable()
export class BasketManagerService {

  parentCats: Array<any> = [0];
  subCats: Array<any> = [0];
  constructor(private sessionService: SessionService,
    private dataService: DataService,
    private categoryListerService: CategoryListerService) {

    this.categoryListerService.selectedCategories.subscribe(data => {
      this.subCats = [];
      this.parentCats = [];
      if (data.parrentId !== 0) {
        this.parentCats.push(data.parrentId); 
        data.selectedCats.forEach(subCat => {
          this.subCats.push(subCat.key);
        });
      }
    });
  }

  /**
   * sepet modalýný açmak için kullanýlýr.paramtere örnð: { documentList : [<documents>]  }
   */
  onOpenDocBasket: EventEmitter<any> = new EventEmitter();

  /**
   * sepet listesini döner.
   */
  getBaskets(): Observable<BasketModel[]> {
    return this.dataService.post({}, "api/basket/Search");
  }

  /**
   * yeni sepet ekler
   * @param newBasketTitle sepet baþlýðý
   */
  addNewBasket(newBasketTitle: string): Observable<BasketModel[]> {
    var model = {
      "value": newBasketTitle
    };
    return this.dataService.post(model, "api/basket/Save");
  }

  /**
   * dökümanlarý seçili sepete ekler
   * @param basket sepet
   * @param documents dökümanlar
   */
  addDocsToBasket(basket: BasketModel, documents: Document[]) {
    let docIds: Array<number> = new Array();
    documents.forEach(doc => docIds.push(doc.id));

    var model = {
      "BasketId": basket.sepetNo,
      "Documents": docIds,
      "SelectedCategoryIds": this.subCats,
      "SelectedParentCategoryIds": this.parentCats
    };
    return this.dataService.post(model, "api/basket/AddDocuments");
  }

  /**
   * sepeti temizler
   * @param basket
   */
  emptyBasket(basket: BasketModel): Observable<BasketModel[]> {
    var model = {
      "Id": basket.sepetNo
    };
    return this.dataService.post(model, "api/basket/ClearDocuments");
  }

  /**
   * sepeti siler
   * @param basket
   */
  deleteBasket(basket: BasketModel): Observable<BasketModel[]> {
    var model = {
      "Id": basket.sepetNo
    };
    return this.dataService.post(model, "api/basket/Delete");
  }
}
