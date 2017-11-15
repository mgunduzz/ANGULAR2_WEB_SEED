import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { BasketModel }  from '../entity/basket.model'
import { Document } from '../../document-lister/entity/document.model'
import { BasketManagerService } from '../services/basket-manager.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'doc-basket-modal',
  templateUrl: './doc-basket-modal.component.html',
  styleUrls: ['./doc-basket-modal.component.scss']
})
export class DocBasketModalComponent implements OnInit {

  @BlockUI('basket-list-loader') basketBlockUI: NgBlockUI;


  baskets: Array<BasketModel> = new Array();
  documents: Array<Document> = new Array();
  newBasketTitle: string;

  constructor(public activeModal: NgbActiveModal, private basketManagerService: BasketManagerService) { }

  ngOnInit(): void {

  } 
}
