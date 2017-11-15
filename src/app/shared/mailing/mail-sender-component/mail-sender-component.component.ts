import { DocumentHelperService } from './../../../documents/services/helpers/document-helper.service';
import { CategoryListerService } from './../../category-lister/services/category-lister.service';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, Validator } from '@angular/forms';

import { MailGroup, Mail } from '../models/mail-group'
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { MailingService } from '../mailing.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { SessionService } from "../../../core/auth/session.service"
import {   ConfirmationPopover    } from '../../angular-confirmation-popover/confirmationPopover.directive'

@Component({
  selector: 'mail-sender-component',
  templateUrl: './mail-sender-component.component.html',
  styleUrls: ['./mail-sender-component.component.scss']
})
export class MailSenderComponentComponent implements OnInit {

  @BlockUI('mail-send') mailSendBlockUi: NgBlockUI;
  @BlockUI('mail-list') mailListBlockUi: NgBlockUI;
  @BlockUI('mail-group-list') mailGroupListBlockUi: NgBlockUI;
  @ViewChildren('confirms') confirms: QueryList<ConfirmationPopover>;

  constructor(private mailingService: MailingService,
    public toastyService: ToastyService,
    private sessionService: SessionService,
    private categoryListerService: CategoryListerService,
    private documentHelperService: DocumentHelperService
  ) { }

  @Input() documents: Array<any> = new Array();



  /** 
   * Mail göndermek için form
   */
  mailSenderForm = new FormGroup({
    subject: new FormControl('', Validators.required)
  });

  /**
   * Yeni mail eklemek için form
   */
  newMailForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  /**
   * Yeni grup eklemek için form
   */
  newGroupForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  mailSendModel: any = {};
  newMailModel: any = {};
  newGroupModel: any = {};

  mailList: Array<Mail> = new Array();
  mailGroups: Array<MailGroup> = new Array();
  mailGroupsForEdit: Array<MailGroup> = new Array();

  isShowMailList: boolean = true;
  selectedMailCount: number = 0;
  isLinkOrBody: string = 'link';


  confirmationClick(index: number) {
    this.confirms.toArray().forEach(confirm => {
      confirm.hidePopover();
    });

    this.confirms.toArray()[index].showPopover();
  }

  //Mail Send

  /**
   * mailSendModel'i kullanarak mail gönderme
   */
  sendMail() {
    this.mailSendModel.isLink = true;
    this.mailSendModel.isBody = false;

    if (this.isLinkOrBody === 'body') {
      this.mailSendModel.isLink = false;
      this.mailSendModel.isBody = true;
    }


    switch (this.showType) {
      case '0':
        this.mailSendModel.isSubcategoryShow = false;
        this.mailSendModel.isDocumentsShow = false;
        this.mailSendModel.isDocumentsMediasShow = false;
        break;
      case '1':
        this.mailSendModel.isSubcategoryShow = true;
        this.mailSendModel.isDocumentsShow = false;
        this.mailSendModel.isDocumentsMediasShow = false;
        break;
      case '2':
        this.mailSendModel.isSubcategoryShow = false;
        this.mailSendModel.isDocumentsShow = true;
        this.mailSendModel.isDocumentsMediasShow = false;
        break;
      case '3':
        this.mailSendModel.isSubcategoryShow = false;
        this.mailSendModel.isDocumentsShow = false;
        this.mailSendModel.isDocumentsMediasShow = true;
        break;
      default:

    }


    this.mailSendModel.mailTo = this.getSelectedMails();

    let categories: any[] = this.categoryListerService.categories.value;

    let selectedCategories = [];
    categories.forEach(cat => {
      let selectedSubCategories = [];
      cat.subCategories.forEach(subCat => {
        if (subCat.checked) {
          let docTypes = [];
          this.documentHelperService.getDocumentTypeList(subCat.documentTypeId).forEach(item => docTypes.push({ value: item, selected: true }));

          selectedSubCategories.push({
            key: subCat.key,
            documentTypes: docTypes
          });
        }
      });

      if (selectedSubCategories.length) {
        selectedCategories.push({ key: cat.key, subCategories: selectedSubCategories });
      }

    });

    this.mailSendBlockUi.start();
    this.mailingService.sendMail(this.mailSendModel, this.documents, selectedCategories).subscribe(response => {
      this.mailSendBlockUi.stop();
      this.toastyService.success('e-posta Gönderildi');
      this.mailingService.onMailSend.emit(true);
    }, err => {
      this.mailSendBlockUi.stop();
    });
  }

  //E-posta List

  /**
   * tüm E-posta listesini çeker ,ona göre E-posta gruplarındaki E-posta listesini düzenler
   */
  searchMails() {
    this.mailingService.searchMails().subscribe(mails => {
      this.mailList = mails;

      this.searchMailGroups();

    });

  }

  /**
   * E-posta listesine yeni E-posta ekler.E-posta listesini yeniden çeker.
   */
  addNewMail() {
    let mailIndex = this.mailList.findIndex(mail => mail.email === this.newMailModel.email);

    if (mailIndex < 0) {

      let newMail: Mail = new Mail();
      newMail.email = this.newMailModel.email;
      newMail.name = this.newMailModel.name;
      newMail.isSelected = false;

      this.mailListBlockUi.start();
      this.mailingService.addNewMail(newMail).subscribe(response => {
        this.mailListBlockUi.stop();
        this.newMailModel.email = '';
        this.newMailModel.name = '';

        this.searchMails();
      },
        err => {
          this.mailListBlockUi.stop();
        });
    } else {
      this.toastyService.error('bu e-posta adresinden zaten var');
    }
  }

  /**
   * seçili maili kendi grubundan siler.eğer grup tüm mail listesi grubu (ana grup) ise mail tüm mail listesinden silinir.eğer diğer grup mailiyse sadece o gruptan o maili çıkartır.
   * @param group seçili mailin grubu
   * @param mail seçili mail
   * @param isMainGroup ana grup olup olmadığını geçer.
   */
  deleteMail(group: MailGroup, mail: Mail, isMainGroup: boolean = false) {
    if (group.isMainGroup) {
      this.mailListBlockUi.start();
      this.mailingService.deleteMail(mail).subscribe(response => {
        this.mailListBlockUi.stop();

        this.mailList = this.mailList.filter(item => item.id !== mail.id);
        this.mailGroups.forEach(mailGroup => {
          if (mailGroup.isMainGroup)
            mailGroup.mailList = this.mailList;
          else
            mailGroup.userMailIds = mailGroup.userMailIds.filter(item => item !== mail.id);
        });

        this.updateMailGroups();
        this.toastyService.success(`Ana listeden e-posta silindi`);

      },
        err => {
          this.mailListBlockUi.stop();
          this.toastyService.success(`Ana listeden e-posta silme başarısız oldu`);

        });
    } else {
      group.mailList = group.mailList.filter(item => item.id !== mail.id);

      group.userMailIds = [];
      group.mailList.forEach(item => {
        group.userMailIds.push(item.id);
      });

      this.mailListBlockUi.start();
      this.mailingService.updateMailGroup(group).subscribe(response => {
        this.mailListBlockUi.stop();
        this.toastyService.success(`'${group.name}' grubundan e-posta silindi`);
      },
        err => {
          this.mailListBlockUi.stop();
          this.toastyService.success(`'${group.name}' grubundan e-posta silme başarısız oldu`);
        });
    }



  }

  /**
   * mailin seçili olma durumu değiştirildiğinde çalışır.eğer parent gruba ait tüm mailler seçili değilse grubun tümü seçili özelliği false olur.
   * @param group seçili mailin grubu 
   * @param mail seçili mail
   */
  mailSelectedChange(group: MailGroup, mail: Mail) {
    this.selectedMailCount += (mail.isSelected ? 1 : -1);
    group.selectedCount += (mail.isSelected ? 1 : -1);
    if (!mail.isSelected)
      group.isAllMailsSelected = false;
  }

  getSelectedMails(): any {
    let mailList: Array<string> = new Array();

    this.mailGroups.forEach(group =>
      group.mailList.forEach(mail => {
        if (mail.isSelected)
          mailList.push(mail.email);
      }));

    return mailList;
  }



  //Mail Group

  /**
   * mail gruplarını döner.grubun userMailId'lerini kullanarak tüm mail listesinden grubun mail listesini çeker.
   */
  searchMailGroups() {
    this.mailGroups = [];

    let allMails: MailGroup = new MailGroup();
    allMails.name = 'Tüm E-postalar';
    allMails.mailList = <Array<Mail>>JSON.parse(JSON.stringify(this.mailList));
    allMails.isAllMailsSelected = false;
    allMails.isShow = true;
    allMails.isMainGroup = true;

    this.mailGroups.push(allMails);

    this.mailingService.searchMailGroups().subscribe(groups => {
      groups.forEach(group => {
        group.mailList = [];
        this.mailList.forEach(mail => {
          let mailIndex = group.userMailIds.findIndex(mailId => mail.id === mailId);
          if (mailIndex >= 0) {
            group.mailList.push(mail);
          }

        });

        this.mailGroups.push(group);
      });
    });

  }

  /**
   * yeni grup ekler
   */
  addNewGroup() {
    let newGroup: MailGroup = new MailGroup();
    newGroup.name = this.newGroupModel.name;
    newGroup.mailList = [];
    newGroup.userMailIds = [];
    newGroup.isAllMailsSelected = false;


    this.mailGroupListBlockUi.start();
    this.mailingService.updateMailGroup(newGroup).subscribe(response => {
      this.mailGroups.push(newGroup);
      this.addGroupsToMailGroupsForEdit([newGroup]);
      this.newGroupModel.name = '';
      this.mailGroupListBlockUi.stop();
      this.toastyService.success("E-posta eklendi");
    }, err => {
      this.mailGroupListBlockUi.stop();
      this.toastyService.error("E-posta ekleme başarısız oldu");
    });
  }

  /**
   * var olan grubu yeni değerleriyle günceller.
   * @param group seçili grup
   */
  updateMailGroup(group: MailGroup) {
    group.userMailIds = [];
    group.mailList.forEach(mail => {
      if (mail.isSelected)
        group.userMailIds.push(mail.id);
    });

    this.mailGroupListBlockUi.start();
    this.mailingService.updateMailGroup(group).subscribe(response => {
      this.mailGroupListBlockUi.stop();
      group.isShow = true;
      this.toastyService.success("Grup Güncellendi");
    }, err => {
      this.mailGroupListBlockUi.stop();
      group.isShow = true;
      this.toastyService.error("Grup güncelleme başarısız oldu");

    });
  }

  /**
   * seçili mail grubunu siler
   * @param group
   * @param index
   */
  deleteMailGroup(group: MailGroup, index: number) {
    this.mailGroupListBlockUi.start();
    this.mailingService.deleteMailGroup(group).subscribe(response => {
      this.mailGroupsForEdit = this.mailGroupsForEdit.filter(item => item.id !== group.id);
      this.mailGroupListBlockUi.stop();
      this.toastyService.success("Grup Silindi");

    }, err => {
      this.mailGroupListBlockUi.stop();
      this.toastyService.error("Grup silme başarısız oldu");

    });
  }

  /**
   * grubun seçi mail sayısını günceller
   * @param group
   */
  setGroupSelectedMailCount(group: MailGroup) {
    group.selectedCount = 0;
    group.mailList.forEach(mail => {
      if (mail.isSelected)
        group.selectedCount++;
    });
  }

  /**
   * grubun seçili olma durumu değiştiğinde çalışır.
   * @param group
   */
  groupIsSelectedAllChange(group: MailGroup) {
    if (group.isAllMailsSelected)
      group.isShow = true;

    group.mailList.forEach(mail => mail.isSelected = group.isAllMailsSelected);
    this.setGroupSelectedMailCount(group);
  }

  groupClick(group: MailGroup, groupList: MailGroup[]) {
    groupList.forEach(item => {
      if (item.id === group.id)
        item.isShow = !item.isShow;
      else
        item.isShow = false;
    });
  }


  //Other

  /**
   * mail grup listesinin maillerini tüm mail listesinden userMailId'ye göre çeker
   */
  updateMailGroups() {
    this.mailGroups.forEach(group => {
      group.mailList = [];

      if (group.isMainGroup)
        group.mailList = this.getMailListByDeepCopy();
      else {
        this.mailList.forEach(mail => {
          let mailIndex = group.userMailIds.findIndex(mailId => mail.id === mailId);
          if (mailIndex >= 0) {
            group.mailList.push(mail);
          }
        });
      }
    });
  }


  /**
   * Grup İşlemleri sekmesi için yeni grup listesini oluşturur.(mailGroupsForEdit)
   * @param groups
   */
  addGroupsToMailGroupsForEdit(groups: Array<MailGroup>) {

    groups.forEach(group => {
      group.mailList = [];
      group.selectedCount = 0;

      this.mailList.forEach(mail => {
        let mailIndex = group.userMailIds.findIndex(mailId => mail.id === mailId);

        let newMail: Mail = <Mail>JSON.parse(JSON.stringify(mail));
        newMail.isSelected = mailIndex >= 0;

        if (mailIndex >= 0)
          group.selectedCount++;

        group.mailList.push(newMail);
      });

      this.mailGroupsForEdit.push(group);
    });
  }

  beforeTabChange(event) {
    if (event.nextId === 'mailList') {
      this.searchMailGroups();
    } else if (event.nextId === 'groupProcess') {
      this.mailGroupsForEdit = [];

      this.mailingService.searchMailGroups().subscribe(groups => {
        this.addGroupsToMailGroupsForEdit(groups);
      });
    }
  }

  toggleMailList() {
    this.isShowMailList = !this.isShowMailList;
  }

  getMailListByDeepCopy(): Array<Mail> {
    return <Array<Mail>>JSON.parse(JSON.stringify(this.mailList));
  }

  groupConfirmTitle: string;
  groupDeleteMessage: string;
  groupUpdateMessage: string;
  groupAddMessage: string;

  mailConfirmTitle: string;
  mailAddMessage: string;
  mailDeleteMessage: string;
  showType: string = '0';

  ngOnInit() {
    this.searchMails();

    if (this.sessionService.session.user.lang.lang == "tr") {
      this.groupConfirmTitle = 'Grup';
      this.groupDeleteMessage = 'Grup Silinsin mi?';
      this.groupUpdateMessage = 'Grup Güncellensin mi?';
      this.groupAddMessage = 'Grup Eklensin mi?';


      this.mailConfirmTitle = 'E-posta';
      this.mailAddMessage = 'E-posta Eklensin mi?';
      this.mailDeleteMessage = 'E-posta Silinsin mi?';
    } else {
      this.groupConfirmTitle = 'Group';
      this.groupDeleteMessage = 'Delete group?';
      this.groupUpdateMessage = 'Update group?';
      this.groupAddMessage = 'Add group?';

      this.mailConfirmTitle = 'Mail';
      this.mailAddMessage = 'Add mail?';
      this.mailDeleteMessage = 'Delete mail?';
    }


    this.mailSendModel.isLink = true;
    this.mailSendModel.isAttachment = true;
    this.mailSendModel.isBody = false;
    this.mailSendModel.isSubcategoryShow = false;
    this.mailSendModel.isDocumentsShow = false;
    this.mailSendModel.isDocumentsMediasShow = false;
    this.mailSendModel.mailTo = [];
  }

}
