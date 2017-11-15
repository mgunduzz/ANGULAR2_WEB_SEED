import { Component, OnInit, Input, EventEmitter, OnDestroy} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CustomerPressService } from "../services/customer-press.service"
import {CustomerPress } from "../entity/customer-press"
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {TranslateService} from '@ngx-translate/core';
import { Observable, BehaviorSubject, Subscription} from 'rxjs';

declare var moment: any;

@Component({
  selector: 'customer-press-modal',
  templateUrl: './customer-press-modal.component.html',
  styleUrls: ['./customer-press-modal.component.scss']
})
export class CustomerPressModalComponent implements OnInit, OnDestroy {


  //documentlistte seçilen documentlar
  @Input() documentIds: Array<any> = [];

  public selectedDate: any;
  selectedCustoPressName: string = "";
  selectedDocuments: Array<any> = [];
  customersPress: Array<any> = [];
  selectedDocs: any[] = [];
  selectedPress: CustomerPress = new CustomerPress();
  selectedPage: number = 1;
  selectedPageFriendly: number = 1;
  isCustomerPressExits: boolean = false;
  isSelected = false;
  public daterange: any = {};

  @BlockUI('customer-press-loader') blockUI: NgBlockUI;

  //translate deðiþkenleri 
  stringLoadMsg: string;
  stringSuccsesMsg: string;
  stringErrorMsg: string;

  // unsubcribe olduðumuz subscriptionlar
  translateSubscription: Subscription;
  toastySubscription: Subscription;
  custoPressSubscription: Subscription;
  selectedDocsSubscription: Subscription;
  docsSubscription: Subscription;
  removePressSubscription: Subscription;

  /**
   * datatimeranger ayarlarý
   */
  pickerOptions: Object = {
    'showDropdowns': true,
    'showWeekNumbers': true,
    'timePickerIncrement': 5,
    'autoApply': true,
    singleDatePicker: true
  };


  constructor(public activeModal: NgbActiveModal,
    private toastyService: ToastyService,
    private translateService: TranslateService,
    private customerPressService: CustomerPressService) {
    this.selectedDate = moment().startOf('day')._d;

    /**
     * dile göre notify ve loading titlerini içieriði
     */
    this.translateSubscription = this.translateService.get("GENERAL").subscribe((data) => {
      this.stringLoadMsg = data.loading;
      this.stringSuccsesMsg = data.success;
      this.stringErrorMsg = data.failed;
    }
    );

    /**
     * customerPressService deki api baðlandtlarýndan toastResponse'a true veya false geçer ona göre notify çýkar.
     */
    this.toastySubscription = this.customerPressService.toastResponse.subscribe(data => {
      if (data === true) {
        this.toastyService.success(this.stringSuccsesMsg);
      } else {
        this.toastyService.error(this.stringErrorMsg);
      }
    });


  }

  /**
   * her yeni basýnda biz seçildiðinde önceki seçimleri sýfýrlayan fonksiyon
   */
  setDefaultSetting() {
    this.selectedDate = moment().startOf('day')._d;
    this.selectedPage = 1;
    this.selectedPageFriendly = 1;
  }



  /**
   * viewtype'ý false olan basýnda bizlerde görünen datetimepicker'in yönetimi buradan apýlýr.
   * @param ev
   */
  selectDate(ev) {
    this.selectedDate = ev.start._d;
    this.getSelectedPressDocuments(this.selectedPress);
  }

  /**
   * yeni basýnda biz oluþtur butonu bu fonksiyonu tekiler
   * yeni bir pencere içierisnde basýnda biz oluþturma ekranýný açar.
   * bu pencereye kullanýcýn daha önceki kullanýcý adlarýný ile
   * addPressToList fonksiyonu gönderir bu fonksiyon ile oluþturulan yeni basýnda biz mevcut listeye eklenir. 
   */
  createNewCustomerPressClick() {
    var newWindow: any = window.open("#/press", "Basinda Biz", "height=710,width=1024");
    newWindow.appData = {
      refreshTasks: this.addPressToList,
      customersPress: this.customersPress
    };
  }

  /**
   * Bu fonksiyon ile oluþturulan yeni basýnda biz mevcut listeye eklenir.
   * @param newPress yeni basýdna bizin adi
   * @param viewType yeni basýnda bizin viewTypeý
   */
  addPressToList(newPress, viewType) {
    this.customersPress.push({ name: newPress, pagginationLists: [], viewType: viewType });
  }

  /**
   * basýnca biz seçildikten sonra açýlan listede,
   * seçilen haberlerin seçili basýnda bizden çýkarýlmasýný yöneten fonksiyonmdur.
   * customerPressService.removeCheckedDocs fonksiyonunu çalýþtýrý.
   */
  removeCheckedDocs() {
    this.blockUI.start(this.stringLoadMsg);

    let searchModel = {
      name: this.selectedPress.name,
      viewType: this.selectedPress.viewType,
      currentDate: this.selectedDate,
      pageNo: this.selectedPage
    };
    let deleteModel = { name: this.selectedPress.name, viewType: this.selectedPress.viewType }
    this.customerPressService.removeCheckedDocs(deleteModel, searchModel);

  }



  /**
   * seçilen basýnda bizin documentlarýný getiren customerPressService.getSelectedPressDocuments fonksiyonun çaðýrýr.
   * @param selectedCustoPress
   */
  getSelectedPressDocuments(selectedCustoPress?) {
    this.blockUI.start(this.stringLoadMsg);
    this.customerPressService.getSelectedPressDocuments({ name: this.selectedPress.name, viewType: this.selectedPress.viewType, currentDate: this.selectedDate, pageNo: this.selectedPage });
  }

  /**
   * viewType'ý true olan basýnda bizlerde görülen dropdown içindeki sayfa sayýlarý deðiþtirildiðinde 
   * getSelectedPressDocuments fonksiyonuna istenilen özellerikleri geçen fonksiyondur. 
   * @param page seçilen sayfaýnýn hangi yýla ve hangi sayfada olduðu üzerinde tutan obje
   * @param i ekranda gözüken sayfa sayýsý.
   */
  changePageClick(page, i) {
    this.selectedPage = page.pageNo;
    this.selectedPageFriendly = i;
    this.selectedDate = moment().year(page.pageYear)._d;
    this.getSelectedPressDocuments(this.selectedPress);
  }

  /**
   * documentListte seçilen documentlarýn seçilen basýnda bize eklenmesi için çalýþtýrýlan fonksitondur.
   */
  addSelectedDocumentsToSelectedPress() {
    this.blockUI.start(this.stringLoadMsg);
    let addModel = {
      name: this.selectedPress.name,
      viewType: this.selectedPress.viewType,
      documents: this.selectedDocs
    };
    let searchModel = {
      name: this.selectedPress.name,
      viewType: this.selectedPress.viewType,
      currentDate: this.selectedDate,
      pageNo: this.selectedPage
    };

    this.customerPressService.addSelectedDocumentsToSelectedPress(addModel, searchModel);

  }

  /**
   * seçili basýnda bizin silinmesi için this.customerPressService.removeSelectedPress fonksiyonunu çaðýrý response'a göre nofity çýkar.
   */
  removeSelectedPress() {
    this.blockUI.start(this.stringLoadMsg);
    this.removePressSubscription = this.customerPressService.removeSelectedPress({ name: this.selectedPress.name }).subscribe(data => {
      if (data === 200) {
        this.customerPressService.toastResponse.next(true);
        if (this.customersPress.length === 1) {
          this.isCustomerPressExits = false;
          this.selectedPress = new CustomerPress();
          this.blockUI.stop();
        } else {
          this.customerPressService.getCustomersPress();
        }
      } else {
        this.customerPressService.toastResponse.next(false);
      }
    });
  }

  removeSelectedDocumentsToSelectedPress() {
    //this.customerPressService.removeSelectedPressSelectedDocuments(this.selectedCustoPressName );
  }


  /**
   * kullanýcýn önceden oluþturduðu basýnda bizlerden birini seçtiði taktirde çalýaþn fonsksiodnur
   * seçilne basýnda bizin sayfa sýramasýný yýla b->k göre yapar.
   * setDefaultSetting ayarlamsýný yapar.
   * @param selectedCustoPress
   */
  selectedPressClick(selectedCustoPress) {
    selectedCustoPress.pagginationLists.sort(function (a, b) {
      return a.pageYear < b.pageYear;
    });
    this.isSelected = true;
    this.setDefaultSetting();
    this.selectedPress = selectedCustoPress;
    this.getSelectedPressDocuments(selectedCustoPress);
  }

  ngOnInit() {

    /**
     * sayfa yüklenirken customerPressService.getCustomersPress(); fonksionu ile customerPressService.customerPress kullanýnýn basýnda bizleri ile doldurulur.
     * customerPressService.customerPress'e subscribe olarak kullanýcnn basýnda bizlerini ulaþýrýz.
     * eðer kullanýcnn daha önceden oluþturuðu basýdna bizler varsa ilk basýnda bizi default olarak seçili hale getirir.
     */
    this.customerPressService.getCustomersPress();
    this.custoPressSubscription = this.customerPressService.customerPress.subscribe(data => {
      if (data.length > 0) {
        if (this.isCustomerPressExits === true) {
          let index = data.findIndex(cPress => cPress.name === this.selectedPress.name);
          this.customersPress = data;
          this.selectedPress = this.customersPress[index];
          this.selectedPressClick(this.selectedPress);
        } else {
          this.customersPress = data;
          this.selectedPress = this.customersPress[0];
        }
        this.isCustomerPressExits = true;
      }
    });
    this.selectedDocsSubscription = this.customerPressService.getSelectedDocuments(this.documentIds).subscribe(data => {
      this.selectedDocs = data.results.documents;
    });;
    this.docsSubscription = this.customerPressService.documents.subscribe(data => {
      this.selectedDocuments = data;
      this.blockUI.stop();
    });

  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
    this.toastySubscription.unsubscribe();
    this.custoPressSubscription.unsubscribe();
    this.selectedDocsSubscription.unsubscribe();
    this.docsSubscription.unsubscribe();
    this.customerPressService.clearCache();
    this.selectedCustoPressName = "";
    this.selectedDocuments = [];
    this.customersPress = [];
    this.selectedDocs = [];
    this.selectedPage = 1;
    this.selectedPageFriendly = 1;
    this.isCustomerPressExits = false;
    this.isSelected = false;
  }



}
