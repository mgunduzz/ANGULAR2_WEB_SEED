import { Document } from '../../document-lister/entity/document.model'


export class BasketModel {
  sepetNo:number;
  sepetAdi?: string;
  haberSayisi?: number = 0;
  sortDirection?: number = 0;
  sortType?: number = 0;
  documents?: Array<Document> = new Array();
  isSelected?: boolean = false;

}
