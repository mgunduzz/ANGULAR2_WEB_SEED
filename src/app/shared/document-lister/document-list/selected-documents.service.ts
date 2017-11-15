import { Injectable,EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KeyModel } from '../../../core/model/document-search.model';
@Injectable()
export class SelectedDocumentsService {
  /**
   * document listte checkboxla se�ilen haberlerin idsi buradan y�netilir.
   */
  selectedItems: BehaviorSubject<KeyModel[]> = new BehaviorSubject<KeyModel[]>([]);
  exportFile: EventEmitter<Array<any>> = new EventEmitter();
  removeAllItem: EventEmitter<Array<any>> = new EventEmitter();
  constructor() { }

  /**
   * selected itemler selectedItems objesine push edilir b�ylece heryerden ula��labilir.
   * @param itemId
   */
  addSelectedItem(itemId) {
    let selectedItemsTemp: KeyModel[] = this.selectedItems.getValue();
    selectedItemsTemp.push({ key: itemId });
    this.selectedItems.next(selectedItemsTemp);
  }

  /**
   * checkboxu kald�r�lan itemlerin selectedItems i�inden burada remove edilir.
   * @param itemId
   */
  removeSelectedItem(itemId) {
    let selectedItemsTemp: KeyModel[] = this.selectedItems.getValue();
    let index = selectedItemsTemp.findIndex(data => 
     data.key === itemId
    );
    if (index >= 0) {
      selectedItemsTemp.splice(index, 1);
    }
    this.selectedItems.next(selectedItemsTemp);
  }

  /**
   * sat�rlara hover edildi�inde ��kan quick menude olan ��kt� i�lemleri buradan export service g�nderilir.
   * @param exportType
   * @param documentId
   */
  exportFileClick(exportType, documentId) {
    let exportSettings = [];
    exportSettings.push({ exportType: exportType, documentId: [{ key: documentId }] });
    this.exportFile.emit(exportSettings);
  }


  removeAllItemClick() {
    this.selectedItems.next([]);
    this.removeAllItem.emit();
  }

  
}
