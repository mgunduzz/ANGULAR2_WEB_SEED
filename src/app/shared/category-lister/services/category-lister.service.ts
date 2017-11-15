import { URLSearchParams, Http, Response  } from '@angular/http';
import { Injectable, OnInit, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from "rxjs/Rx";
import { Subscription } from "rxjs";
import 'rxjs/Rx';
import { CategoryService } from "../../../documents/services/category/category.service"
import { Category } from '../entity/category';

/**
 * Category Service
 */
@Injectable()

export class CategoryListerService implements OnInit {

  /**
   * Observable data array 
   */
  _categories: BehaviorSubject<Array<Category>> = new BehaviorSubject([]);
  private tempCategories = [];
  private isFirstLoad: boolean = true;
  isSelectedCategory: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isSelected: BehaviorSubject<boolean> = new BehaviorSubject(false);
  selectedCategories: BehaviorSubject<{ parrentId: number, selectedCats: any }> = new BehaviorSubject({ parrentId: 0, selectedCats: [] });
  selectedCatsForCurrentFilterBar: EventEmitter<any> = new EventEmitter<any>();
  removeSelectedCat: EventEmitter<any> = new EventEmitter<any>();
  removeAllCats: EventEmitter<any> = new EventEmitter<any>();

  totalCount: number;
  tempCategoriesCount: number;

  private url: string = "./src/app/shared/category-lister/services/doct.json";

  /**
   * create observable object
   * */
  constructor(private http: Http, private categoryService: CategoryService) {





  }
  get categories() {
    return this._categories;
  }
  /**
     * get data from api etc.
     * */
  /* loadInitialData() {
 
     this.http.get(this.url)
       .subscribe(
       res => {
         let categories:Array<Category> = (<Category[]>res.json());
         this._categories.next(categories);
 
       },
       err => console.log("Error retrieving Categories")
       );
   }*/

  /**remove parent or sub category by category id */
  removeCategory(id: number): boolean {
    let cats: any = this._categories.getValue();
    let index: number = this.findIndexMethod(id, cats);
    if (index >= 0) {
      cats.splice(index, 1);
      this._categories.next(cats);
    }
    else {
      let subCatIndex: number;
      let parentCat;
      parentCat = cats.find((cat) =>
        (subCatIndex = cat.subCategories.findIndex((subCat) => subCat.key === id)) >= 0
      );
      if (subCatIndex >= 0) {
        let parentCatIndex: number = this.findIndexMethod(parentCat.key, cats);
        parentCat.subCategories.splice(subCatIndex, 1);
        cats[parentCatIndex] = parentCat;
        this._categories.next(cats);
      }
      else { alert("id bulunamadı"); }
    }
    return true;
  }





  /**find index we can use so many time with this method*/
  findIndexMethod(id: number, cats: Array<Category>) {
    let index = cats.findIndex((cat) => cat.key === id);
    return index;

  }


  selectedCats(selectedCats) {
    this.selectedCategories.next(selectedCats);
  }

  /**add parent or sub category */
  addCategory(category): boolean {
    let cats: any = this._categories.getValue();

    if (category.parrentId !== 0) {
      let index = this.findIndexMethod(category.parrentId, cats);
      let parentCat = cats.find((cat) => cat.key === category.parrentId);
      parentCat.subCategories.push(category);
      cats[index] = parentCat;
      this._categories.next(cats);
    } else {
      cats.push(category);
      this._categories.next(cats);
    }

    return true;

  }

  addCategories(data) {
    this.tempCategories = JSON.parse(JSON.stringify(data));
  }

  ngOnInit() {
  }

  findParentSubCategories(cats) {



    let data = cats;
    let parentCategories = [];
    data.forEach(cats => {
      if (cats.parrentId === 0) {
        cats.subCategories = [];
        cats.count = 0;
        cats.isChecked = false;
        parentCategories.push(cats);
      }
    });

    data.forEach(cat => {
      parentCategories.forEach(parCat => {
        let count: number = 0;
        if (cat.parrentId === parCat.key) {
          if (typeof cat.count == "undefined") {
            cat.count = 0;
          }
          parCat.count = cat.count + parCat.count;
          this.totalCount = this.totalCount + parCat.count;
          parCat.subCategories.push(cat);
        }
      });
    });
    data = parentCategories;



    parentCategories.forEach(parCat => {
      let count: number = 0;
      let isAnyActive: boolean = false;
      parCat.subCategories.forEach(subCat => {
        if (subCat.checked == true) {
          count = subCat.count + count;
          isAnyActive = true;
          parCat.isActive = true;
        }
      })
      if (parCat.count === count && isAnyActive) {
        parCat.isChecked = true;
      }
      else {
        parCat.isChecked = false;
      }

    });

    parentCategories.forEach(parCat => {
      parCat.subCategories.sort((a, b) => a.value.localeCompare(b.value));
    });



    this._categories.next(data);
  }

  calculateCustomerCategoriesCount(categoriesCount, isFormFilter?) {


    if (this.isFirstLoad) {
      this.isFirstLoad = false;
      this.tempCategoriesCount = categoriesCount.length;
    }


    if (this.isSelectedCategory.value === false || categoriesCount.length == this.tempCategoriesCount) {
      //this.isSelected.next(false);
      let cats = JSON.parse(JSON.stringify(this.tempCategories));

      cats.forEach((cat: any) => {

        cat.checked = false;

        let myIndex = this.selectedCategories.getValue().selectedCats
          .findIndex(
          selectedCats => {
            if (selectedCats.key === cat.key && selectedCats.parentCat === cat.parrentId) {
              return true;
            }
          });


        if (myIndex >= 0) {
          cat.checked = true;
        }

        if (cat.parrentId !== 0) {
          categoriesCount.find((catCount, index) => {
            let objectField = Object.keys(catCount);
            let catKeyS = '\\' + cat.key;
            if (cat.key == objectField[0] || catKeyS == objectField[0]) {
              if (catCount[cat.key] >= 0) {
                cat.count = catCount[cat.key];
                return true;
              }
            }
          });

          if (!(cat.count >= 0)) {
            cat.count = 0;
          }
        }
      });

      /*
      data.forEach((count, index) => {
        if (count[cats[index].key] === 0 && cats[index].parrentId !== 0) {
          cats[index].count = 0;
        } else {
          if (count < 0) {
          }
          let myArray = count[0];
          let newKey = cats[index].key;
          cats[index].count = count[cats[index].key];
          if (cats[index].count ==undefined) {
            let indexCount = '\\'+newKey;
            cats[index].count = count[indexCount];
          }
        }
     });
      */
      this.findParentSubCategories(cats);
    }

    this.isSelectedCategory.next(false);

  }

  /**clear all data */
  clear() {
    this._categories.next([]);
  }

}
