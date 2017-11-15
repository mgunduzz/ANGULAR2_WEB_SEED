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


  //documentlistte se�ilen documentlar
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

  //translate de�i�kenleri 
  stringLoadMsg: string;
  stringSuccsesMsg: string;
  stringErrorMsg: string;

  // unsubcribe oldu�umuz subscriptionlar
  translateSubscription: Subscription;
  toastySubscription: Subscription;
  custoPressSubscription: Subscription;
  selectedDocsSubscription: Subscription;
  docsSubscription: Subscription;
  removePressSubscription: Subscription;

  /**
   * datatimeranger ayarlar�
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
     * dile g�re notify ve loading titlerini i�ieri�i
     */
    this.translateSubscription = this.translateService.get("GENERAL").subscribe((data) => {
      this.stringLoadMsg = data.loading;
      this.stringSuccsesMsg = data.success;
      this.stringErrorMsg = data.failed;
    }
    );

    /**
     * customerPressService deki api ba�landtlar�ndan toastResponse'a true veya false ge�er ona g�re notify ��kar.
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
   * her yeni bas�nda biz se�ildi�inde �nceki se�imleri s�f�rlayan fonksiyon
   */
  setDefaultSetting() {
    this.selectedDate = moment().startOf('day')._d;
    this.selectedPage = 1;
    this.selectedPageFriendly = 1;
  }



  /**
   * viewtype'� false olan bas�nda bizlerde g�r�nen datetimepicker'in y�netimi buradan ap�l�r.
   * @param ev
   */
  selectDate(ev) {
    this.selectedDate = ev.start._d;
    this.getSelectedPressDocuments(this.selectedPress);
  }

  /**
   * yeni bas�nda biz olu�tur butonu bu fonksiyonu tekiler
   * yeni bir pencere i�ierisnde bas�nda biz olu�turma ekran�n� a�ar.
   * bu pencereye kullan�c�n daha �nceki kullan�c� adlar�n� ile
   * addPressToList fonksiyonu g�nderir bu fonksiyon ile olu�turulan yeni bas�nda biz mevcut listeye eklenir. 
   */
  createNewCustomerPressClick() {
    var newWindow: any = window.open("#/press", "Basinda Biz", "height=710,width=1024");
    newWindow.appData = {
      refreshTasks: this.addPressToList,
      customersPress: this.customersPress
    };
  }

  /**
   * Bu fonksiyon ile olu�turulan yeni bas�nda biz mevcut listeye eklenir.
   * @param newPress yeni bas�dna bizin adi
   * @param viewType yeni bas�nda bizin viewType�
   */
  addPressToList(newPress, viewType) {
    this.customersPress.push({ name: newPress, pagginationLists: [], viewType: viewType });
  }

  /**
   * bas�nca biz se�ildikten sonra a��lan listede,
   * se�ilen haberlerin se�ili bas�nda bizden ��kar�lmas�n� y�neten fonksiyonmdur.
   * customerPressService.removeCheckedDocs fonksiyonunu �al��t�r�.
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
   * se�ilen bas�nda bizin documentlar�n� getiren customerPressService.getSelectedPressDocuments fonksiyonun �a��r�r.
   * @param selectedCustoPress
   */
  getSelectedPressDocuments(selectedCustoPress?) {
    this.blockUI.start(this.stringLoadMsg);
    this.customerPressService.getSelectedPressDocuments({ name: this.selectedPress.name, viewType: this.selectedPress.viewType, currentDate: this.selectedDate, pageNo: this.selectedPage });
  }

  /**
   * viewType'� true olan bas�nda bizlerde g�r�len dropdown i�indeki sayfa say�lar� de�i�tirildi�inde 
   * getSelectedPressDocuments fonksiyonuna istenilen �zellerikleri ge�en fonksiyondur. 
   * @param page se�ilen sayfa�n�n hangi y�la ve hangi sayfada oldu�u �zerinde tutan obje
   * @param i ekranda g�z�ken sayfa say�s�.
   */
  changePageClick(page, i) {
    this.selectedPage = page.pageNo;
    this.selectedPageFriendly = i;
    this.selectedDate = moment().year(page.pageYear)._d;
    this.getSelectedPressDocuments(this.selectedPress);
  }

  /**
   * documentListte se�ilen documentlar�n se�ilen bas�nda bize eklenmesi i�in �al��t�r�lan fonksitondur.
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
   * se�ili bas�nda bizin silinmesi i�in this.customerPressService.removeSelectedPress fonksiyonunu �a��r� response'a g�re nofity ��kar.
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
   * kullan�c�n �nceden olu�turdu�u bas�nda bizlerden birini se�ti�i taktirde �al�a�n fonsksiodnur
   * se�ilne bas�nda bizin sayfa s�ramas�n� y�la b->k g�re yapar.
   * setDefaultSetting ayarlams�n� yapar.
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
     * sayfa y�klenirken customerPressService.getCustomersPress(); fonksionu ile customerPressService.customerPress kullan�n�n bas�nda bizleri ile doldurulur.
     * customerPressService.customerPress'e subscribe olarak kullan�cnn bas�nda bizlerini ula��r�z.
     * e�er kullan�cnn daha �nceden olu�turu�u bas�dna bizler varsa ilk bas�nda bizi default olarak se�ili hale getirir.
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
