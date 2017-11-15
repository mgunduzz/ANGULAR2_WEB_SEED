import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { CategoryListerService } from '../services/category-lister.service';
import {Observable} from 'rxjs/Observable';

@Pipe({
  name: 'categorySearch'
})
export class CategorySearchPipe implements PipeTransform {
  constructor(private categoryListerService: CategoryListerService) {}
  transform(items: any, filter): any {
    let tempItems = JSON.parse(JSON.stringify(items));
    if (!items || !filter) {
      return tempItems;
    }


    let parentCats = tempItems.filter(subCat => {
      return this.applyFilter(subCat, filter);
    });

    if (parentCats.length > 0) {
      return parentCats;
    }
    else{
        let filterSubCat = [];
        return tempItems.filter(item => {
         filterSubCat = [];
         filterSubCat =  item.subCategories.filter(subCat => {
           return this.applyFilter(subCat, filter);
        });
         if (filterSubCat.length > 0) {
           item.subCategories = filterSubCat;
           return true;
         } else {
           return false;
         }
      });
    }
  }


  applyFilter(cat, filter) {
    if (typeof filter === 'string') {
      if (cat.value.toLowerCase().indexOf(filter.toLowerCase()) === -1 || (cat.count===0)) {
        return false;
      } else {
        return true;
      }
    }

  }

}

