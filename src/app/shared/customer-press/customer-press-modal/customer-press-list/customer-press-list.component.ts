import { Component, OnInit, Input } from '@angular/core';
import {CustomerPressService} from '../../services/customer-press.service'
@Component({
  selector: 'customer-press-list',
  templateUrl: './customer-press-list.component.html',
  styleUrls: ['./customer-press-list.component.scss']
})
export class CustomerPressListComponent implements OnInit {

  //seçilen basýnda bizin documentlarý
  @Input() selectedDocuments: Array<any>;
  checkedDocs: number[] = [];

  constructor(private customerPressService: CustomerPressService) { }

  /**
   * seçilen basýnda bizin documentlarýnda birinin chechbox'ýna týklandýðýnda bu fonksyionda yönetilier.
   * fonksiyonun sonuncada this.customerPressService.checkedDocs servise geçilier.
   * @param doc seçilen document
   */
  checkboxChange(doc) {

    if (doc.checked) {
      doc.checked = false;
      let index = -1;
      index = this.checkedDocs.findIndex(data => data === doc.id);
      index >= 0 ? this.checkedDocs.splice(index, 1) : '';
    } else {
      doc.checked = true; 
      this.checkedDocs.push(doc);
    }

    this.customerPressService.checkedDocs = this.checkedDocs;
  }



  ngOnInit() {

  }

}
