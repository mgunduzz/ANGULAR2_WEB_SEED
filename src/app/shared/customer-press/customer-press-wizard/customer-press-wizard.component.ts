import { Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';

import {WizardComponent } from   "../customer-press-wizard/wizard/wizard.component";
import {CustomerPressService } from   "../services/customer-press.service";
import { CustomerPress,CssSettting} from   "../entity/customer-press";
import { SessionService } from "../../../core/auth/session.service"
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'customer-press-wizard',
  templateUrl: './customer-press-wizard.component.html',
  styleUrls: ['./customer-press-wizard.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class CustomerPressWizardComponent implements OnInit {



  @ViewChild(WizardComponent) wizardComponent: WizardComponent;
  model: CustomerPress = new CustomerPress();
  cssSettings: CssSettting = new CssSettting();
  isCompleted = false;
  name: string = "";
  cond = 0;
  errorMessage:boolean=false;
  byPage = true;
  IframeLink = "";
  stringSuccsesMsg:string;
  stringErrorMsg: string;

   

  constructor(private customerPressService: CustomerPressService,
    private toastyService: ToastyService,
    private translateService: TranslateService,
    private sessionService: SessionService) {

    //default css �zellikleri
    this.cssSettings.textColor = "#333333";
    this.cssSettings.backgroundColor = "#efefef";
    this.cssSettings.titleColor = "#800000";
    this.cssSettings.titleBackgroundColor = "#efefef";
    this.cssSettings.textFont = "Verdana";
    this.cssSettings.fontSize = "12";
    this.cssSettings.listBackgroundColor = "#dfdfdf";
    this.cssSettings.linkColor = "#336699";

    this.translateService.get("GENERAL").subscribe((data) => {
        this.stringSuccsesMsg = data.success;
        this.stringErrorMsg = data.failed;
      }
    );


    this.customerPressService.toastResponse.subscribe(data => {
      if (data === true) {
        this.toastyService.success(this.stringSuccsesMsg);
      } else {
        this.toastyService.error(this.stringErrorMsg);
      }
    });

  }


  goPrev() {
    this.wizardComponent.previous();
  }

  /**
   * pencere a��l�rken ge�t�imiz kullan��cn�n bas�nda bizleri aras�nda girilen bas�nda biz ad�n�n olup olmad��n� arat�yoruz e�er yoksa sonrak� step'e ge�iyor.
   * @param name yeni bas�nda biz ad�
   */
  nameController(name) {
    let index:number = 0;
    index = window.parent.appData.customersPress.findIndex(data => {
      if (data.name === name)
        return true;
    });

    if (index === -1) {
      this.model.name = name;
      this.wizardComponent.next();
      this.errorMessage = false;
    } else {
      this.errorMessage = true;
    }

  }


  /**
   * bas�dna biz olu�turma k�sm�n�n bitirilip this.customerPressService.createNewCustomerPress fonksiyona model ge�ilr.
   */
  onComplete() {
    let custoId=this.sessionService.session.user.customerId;
    this.IframeLink = `<iframe 
    scrolling="auto" height="800" frameborder="0" width="600"
    vspace="0" style="left: 0pt; position: absolute; top: 0pt;"
    src="http://basindabiz.interpress.com/${custoId}_${this.model.name}/BasindaBiz.html"
    marginwidth="0" marginheight="0" hspace="0" allowtransparency="true" >
      </iframe>"`;
    this.isCompleted = true;
    this.model.viewType = this.byPage;
    Object.keys(this.cssSettings).forEach(data => {
      if (data === 'fontSize') {
        this.model.cssStyles.push({ name: data, value: this.cssSettings[data] + 'px' });
      } else {
        this.model.cssStyles.push({ name: data, value: this.cssSettings[data] });
      }
    });
    this.customerPressService.createNewCustomerPress(this.model);
  }

  /**
   * bas�nda biz olu�turulukdan sonra pence kapan�rken pencerenini a��l�� compenttaki addtolist fonksityonu �al��t�t� ve yeni bas�dna bizi listeye ekler.
   */
  close() {
    window.parent.appData.refreshTasks(this.model.name, this.model.viewType);
    window.close();
  }

  ngOnInit() {
   

  }

}
