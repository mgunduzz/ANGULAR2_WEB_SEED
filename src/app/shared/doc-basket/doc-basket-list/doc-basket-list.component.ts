import { Component, OnInit, Input } from '@angular/core';

import { BasketModel }  from '../entity/basket.model'
import { Document } from '../../document-lister/entity/document.model'
import { BasketManagerService } from '../services/basket-manager.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {TranslateService} from '@ngx-translate/core';
import { SessionService } from "../../../core/auth/session.service"

@Component({
  selector: 'doc-basket-list',
  templateUrl: './doc-basket-list.component.html',
  styleUrls: ['./doc-basket-list.component.scss']
})
export class DocBasketListComponent implements OnInit {
  @Input() documents: Array<Document> = new Array();
  @Input() popoverMode: Boolean = false;

  baskets: Array<BasketModel> = new Array();
  selectedBasket: BasketModel = new BasketModel();
  selectedBasketIndex: number = 0;
  newBasketTitle: string;
  @BlockUI('basket-list-loader') basketBlockUI: NgBlockUI;

  confirmTitle: string;
  confirmAddtoBasketMessage: string;
  confirmClearBasketMessage: string;
  deleteBasketMessage: string;
  confirmationPopoverPlacement: string = "left";

  constructor(private basketManagerService: BasketManagerService, private sessionService: SessionService, private translate: TranslateService) {
    this.selectedBasket = { sepetNo: -1 };

    if (window.screen.width <= 680) {
      this.confirmationPopoverPlacement = "bottom";
    }
  }

  trackByBasketNo(index, item) {
    return item.sepetNo;
  }
  /**
   * yeni basket ekler
   */
  addNewBasket() {
    if (this.newBasketTitle.length > 1) {
      this.basketBlockUI.start();
      this.basketManagerService.addNewBasket(this.newBasketTitle).subscribe(baskets => {
        this.updateBasketList(baskets);
        this.basketBlockUI.stop();
        this.newBasketTitle = "";
        if (this.baskets.length > 0)
          this.baskets[0].isSelected = true;
      });
    }
  }

  /**
   * herhangi bir sepete tıklandığında çalışır.
   * @param basket
   * @param selectedIndex
   */
  basketClick(basket: BasketModel, selectedIndex: number) {
    this.baskets.forEach(basket => basket.isSelected = false);
    basket.isSelected = true;
    this.selectedBasket = basket;
  }


  /**
   * seçili sepete dökümanları ekler.
   */
  addDocsToBasket() {
    let selectedIndex = this.getSelectedBasketIndex();
    if (selectedIndex >= 0) {
      let addedDocs: Array<Document> = new Array();

      this.documents.forEach(doc => {
        let docIndex = this.baskets[selectedIndex].documents.findIndex(basketDoc => doc.id === basketDoc.id);
        if (docIndex < 0) {
          addedDocs.push(doc);
        }
      });

      if (addedDocs.length > 0) {
        this.basketBlockUI.start();
        this.basketManagerService.addDocsToBasket(this.baskets[selectedIndex], addedDocs).subscribe(addedDocs => {
          this.baskets[selectedIndex].documents = <Document[]>JSON.parse(JSON.stringify(addedDocs));
          this.baskets[selectedIndex].haberSayisi = addedDocs.length;
          this.basketBlockUI.stop();
        });
      }

    }
  }

  /**
   * seçili sepeti boşaltır
   */
  emptyBasket() {
    let selectedIndex = this.getSelectedBasketIndex();
    if (selectedIndex >= 0) {
      this.basketBlockUI.start();
      this.basketManagerService.emptyBasket(this.baskets[selectedIndex]).subscribe(baskets => {
        this.updateBasketList(baskets);
        this.basketBlockUI.stop();
      });
    }
  }

  /**
   * seçili sepetin döküman listesini yeni sekmede açar
   */
  goToBasket() {
    let url = "#/app/basket/" + this.selectedBasket.sepetNo;
    window.open(url, '_blank').focus();
  }

  /**
   * seçili sepeti siler.
   */
  deleteBasket() {
    let selectedIndex = this.getSelectedBasketIndex();
    if (selectedIndex >= 0) {
      this.basketBlockUI.start();
      this.basketManagerService.deleteBasket(this.baskets[selectedIndex]).subscribe(baskets => {
        this.updateBasketList(baskets);
        this.basketBlockUI.stop();
        if (this.baskets.length > 0)
          this.baskets[0].isSelected = true;
      });
    }
  }

  /**
   * seçili sepetin listedeki indeksini döner
   */
  getSelectedBasketIndex(): number {
    let selectedIndex: number = -1;
    selectedIndex = this.baskets.findIndex(basket => basket.isSelected);

    return selectedIndex;
  }

  /**
   * sepetleri döner
   */
  getBaskets() {
    this.basketBlockUI.start();

    this.basketManagerService.getBaskets().subscribe(baskets => {
      this.updateBasketList(baskets);
      this.basketBlockUI.stop();
      this.selectedBasket = this.baskets[0];
      if (this.baskets.length > 0)
        this.baskets[0].isSelected = true;
    });
  }

  /**
   * yeni basket listesine göre ui listesini günceller
   * @param newBasketList
   */
  updateBasketList(newBasketList: BasketModel[]) {
    this.baskets = <BasketModel[]>JSON.parse(JSON.stringify(newBasketList));
    this.baskets.forEach(basket => basket.documents = new Array());
  }

  ngOnInit() {
    this.getBaskets();

    if (this.sessionService.session.user.lang.lang == "tr") {
      this.confirmTitle = "Sepet İşlemleri";
      this.confirmAddtoBasketMessage = "Sepete ekle";
      this.confirmClearBasketMessage = "Sepeti temizle";
      this.deleteBasketMessage = "Sepeti Sil";
    } else {

      this.confirmTitle = "Basket Process";
      this.confirmAddtoBasketMessage = "Add to basket";
      this.confirmClearBasketMessage = "Clear basket";
      this.deleteBasketMessage = "Delete basket";
    }

  }

}
