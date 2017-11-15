import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, OnChanges  } from '@angular/core';
import { Observable,BehaviorSubject, Subscription } from 'rxjs';
import {DocumentListerService} from'../../document-lister.service'
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

/**
 * pagination işlemlerinin yönetildiği componenttir.
 */
@Component({
  selector: 'pagination-bar',
  templateUrl: './pagination-bar.component.html',
  styleUrls: ['./pagination-bar.component.scss']
})
export class PaginationBarComponent implements OnInit  {

  

  @Input() totalCount: BehaviorSubject<any> = new BehaviorSubject<any>(-1);
  @Input() pageViewCount: number;
  @Input() _currentPage: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  currentPage:number;
  private totalCountSubscription: Subscription; 
  pageCount: number; 
  pageArray: Array<any> = [];
  selectedPage:number;
  pageOnViewData: Array<number> = [20, 40, 80,150,200,500,1000];
  isPageClick: boolean;
  tempTotalCount:number=0;
  constructor(private documentListerService: DocumentListerService, config: NgbDropdownConfig) {
    config.placement = 'top-left';
 
   } 
     /**
      * componen ilk çalıştığında.
      * totalCount'a subscribe olunur. Category seçimlerinde sayfanın güncellenmesi içindir.
      * totalcouunt ve pageViewCount'a göre sayfa sayısı hesaplanması için fonksiyon çağrılır.
      * currentPage 1 olarak gönderlir.
      */
   ngOnInit() {
     this._currentPage.subscribe(data => {
       if (this.currentPage !== data) {
         this.currentPage = data;
         this.findPageCount();
         this.calcPage(this.currentPage);
       }
     });
    
     this.totalCountSubscription = this.totalCount.subscribe(item => {
       if (this.tempTotalCount !== item.totalCount) {
         this.tempTotalCount = item.totalCount;
         this.changeTotalCount(item.totalCount);
       }
     });
    this.selectedPage=this.currentPage;
    this.findPageCount();
    this.calcPage(1);
  }

  /**
   * componen kapatıldığına Subscription sonlandırılır.
   */
   ngOnDestroy() {
    this.totalCountSubscription.unsubscribe();

   }

  /**
   * kullanıcı gitmek istediği sayfaya bastığı zaman çalışan fonksiyondur.
   * page degerini alır değerin null veya currentPage olmadığın kontrolünü yapar.
   * gösterilen haberlerin sayısı pageViewCount değiştirildiği zaman bu fonksiyona true değerini geçer ve liste default sayfaya geri döner.
   * @param page
   * @param isPageViewCount
   */
  changePageClick(page: number) {
    this.isPageClick = true;
      page === 0 || page===null? page = this.currentPage:'';
      this.selectedPage = page = Math.floor(page);
      if (page > this.pageCount) {
          page = this.pageCount;
          this.selectedPage = page;
       
      }
      if (page !== this.currentPage  ) {
          this.currentPage = page;
          this.documentListerService.changePageClickService(page);
          this.findPageCount();
          this.calcPage(page);
      }
  }

  /**
   * kullanıcı sayfada görnmek istediği haber sayısı değiştirdiği zaman bun fonksiyon çağrılır. Bu fonksiyondan @method changePageClick fonksiyonune true değeri gönderilir.
   * @param pageViewCount
   */
  changePageViewCount(pageViewCount: number) {
    this.pageViewCount = pageViewCount;
    let x = +pageViewCount;
    this.documentListerService.changePageVievCount(x);
    this.findPageCount();
    this.calcPage(1);

  }

  /**
   * TotalCount ve PageViewCount'a göre sayfa sayısnı bulan fonksiyondurç
   */
  findPageCount() {
    this.pageCount = this.totalCount.value.totalCount / this.pageViewCount;
    this.pageCount = Math.ceil(this.pageCount);
  }

  /**
   * subscribe olduğumuz totalCount değiştirdiği durumlarda bu fonksiyon çağrılır. Page saysını hesaplar ve listede default sayfa 1 olarak ayarlar.
   * sayfa değişimlerindede bu fonksiyona gelir  @param isPageClick değişkeniyle sayfa değişimi yoksa categori şeçimimi olduğu ayrımı yapılır.
   * @param totalCount
   */
  private changeTotalCount(totalCount: number) {
    if (!this.isPageClick) {
      this.findPageCount();
      this.calcPage(1);
    }
    this.isPageClick = false;
  }

  /**
   * pagination yapısı
   * @param page
   * @param paginationPagesLength maksimmu gösterilecek sayfa sayısı.
   * @param pageArray sayfaların tutuldu array   * 
   */
  calcPage(page) {
      window.scrollTo(0, 0);
    let paginationPagesLength = 5;
    this.pageArray = [];
    this.currentPage = page;
    for (var i = 0; i < (this.pageCount < paginationPagesLength ? this.pageCount : paginationPagesLength); i++) {
      if (this.currentPage - Math.ceil(paginationPagesLength / 2) <= 0) {
        this.pageArray.push({ value: i });
      } else if (this.pageCount - this.currentPage <= Math.ceil(paginationPagesLength / 2)) {
        this.pageArray.push({ value: this.pageCount - (paginationPagesLength - i) });
      } else {
        this.pageArray.push({ value: i + (this.currentPage - Math.ceil(paginationPagesLength / 2)) });
      }
    }
  }

  

    



}


