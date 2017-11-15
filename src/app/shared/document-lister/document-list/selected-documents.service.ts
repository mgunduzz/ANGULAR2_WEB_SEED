import { Injectable,EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { KeyModel } from '../../../core/model/document-search.model';
@Injectable()
export class SelectedDocumentsService {
  /**
   * document listte checkboxla seçilen haberlerin idsi buradan yönetilir.
   */
  selectedItems: BehaviorSubject<KeyModel[]> = new BehaviorSubject<KeyModel[]>([]);
  exportFile: EventEmitter<Array<any>> = new EventEmitter();
  removeAllItem: EventEmitter<Array<any>> = new EventEmitter();
  constructor() { }

  /**
   * selected itemler selectedItems objesine push edilir böylece heryerden ulaþýlabilir.
   * @param itemId
   */
  addSelectedItem(itemId) {
    let selectedItemsTemp: KeyModel[] = this.selectedItems.getValue();
    selectedItemsTemp.push({ key: itemId });
    this.selectedItems.next(selectedItemsTemp);
  }

  /**
   * checkboxu kaldýrýlan itemlerin selectedItems içinden burada remove edilir.
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
   * satýrlara hover edildiðinde çýkan quick menude olan çýktý iþlemleri buradan export service gönderilir.
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
