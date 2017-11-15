import { Component, Input, OnInit, Output, EventEmitter, trigger, state, animate, transition, style, group, NgZone, HostListener} from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';

import { CategoryListerService } from './services/category-lister.service';
import { Category, SubCategory } from './entity/category';


/**
 * Category List Copmponent
 * Show and select a category or categories
 * see {@link CategoryListerService}
 */
@Component({
  selector: 'category-lister',
  templateUrl: './category-lister.component.html',
  styleUrls: ['./category-lister.component.scss'],
  animations: [
    trigger('shrinkOut', [
      state('in', style({ height: '*' })),
      transition('void => *', [
        style({ height: 0, overflow: 'hidden' }),
        animate(250, style({ height: '*' }))
      ]),
      transition('* => void', [
        style({ height: '*', overflow: 'hidden' }),
        animate(250, style({ height: 0 }))
      ])
    ])
  ]
})
export class CategoryListComponent implements OnInit {


  /**
   * attr. input property (toggleCat,isMultiSelect,isShowTrees)
   */
  @Input() toggleCat: boolean;
  @Input() isMultiSelect: boolean;
  @Input() AttrCategories: Array<Category>;
  @Input() isShowTrees: boolean;
  @Input() isDocumentCountActive: boolean = true;
  showCategories: boolean = true;
  isMobile: boolean = false;
  @Output() getSelectedCategories: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();
  filter: Category = new Category();
  selectedCats: any[] = [];
  value: string;
  searchWord: string;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 768) {
      this.showCategories = false;
      this.isMobile = true;
    } else {
      this.showCategories = true;
      this.isMobile = false;

    }
  }

  /**
   * Array for selected categories or category
   * */
  private stringLoadMsg: string;
  selectedCategories: any[] = [];
  isToggled: boolean;
  subCatToggled: boolean;
  errorMessage: string;
  categories: BehaviorSubject<Array<Category>>;
  /**
   *constructor will call the getData method and get data when component's first load */
  constructor(private categoryListerService: CategoryListerService,private ngZone: NgZone) {
   


    //ngZone.run will help to run change detection
        if (window.innerWidth < 768) {
          this.showCategories = false;
          this.isMobile = true;
        }
     

    this.categoryListerService.removeSelectedCat.subscribe(data => {
      if (data === "clearAll") {
        this.selectedCats = [];
        this.categoryListerService.isSelectedCategory.next(false);
        //this.categoryListerService.isSelected.next(true);
        this.categoryListerService.selectedCats({ selectedCats: [], parrentId: 0 });
        this.categoryListerService.selectedCatsForCurrentFilterBar.next(this.selectedCats);
      } else {
        this.findParentCatAndRemove(data);
      }
    });
  }


  getData() {

    this.categories = this.categoryListerService.categories;
  }

  trackByKey(index, item) {
    return item.key;
  }

  ngOnInit() {




    this.categoryListerService.addCategories(this.AttrCategories);
    this.getData();

    this.categoryListerService.isSelected.subscribe(data => {
      if (!data) {
        this.getData();

        this.selectedCategories.forEach(selectedCat => {

          this.categories.getValue().forEach((parentCat) => {
            let index = -1
            index = parentCat.subCategories.findIndex(cat => cat.key == selectedCat.key)
            if (index >= 0) {
              parentCat.subCategories[index].checked = true;
            }
          })

        })
      }
    });



  }


  clearSelectedCategories() {
    this.selectedCats = [];
    this.selectedCategories = [];
    this.categories.forEach(data => {
      data.forEach(ParentCat => {
        ParentCat.isChecked = false;
        ParentCat.subCategories.forEach(subCat => {
          subCat.checked = false;
        });
      });
    });
  };





  /**
   * this method catch changes for property's value (for toggle)
  */
  ngOnChanges(change) {
    this.isToggled = this.toggleCat;
    this.subCatToggled = this.isShowTrees;
    this.isMultiSelect = this.isMultiSelect;
  }

  /**  *this method call when parent category's checkbox checked on dom and push selected items in a array(selectedCategories).
  *and finally pass data to getSelectedCat method.  */
  selectAllSubCats(categories) {


    let tempCats = this.categories.getValue();
    let index = tempCats.findIndex(data => categories.key == data.key);

    categories.isChecked = !categories.isChecked;
    let parrentId = 0;
    if (categories.isChecked) {
      categories.subCategories.forEach(SubCategory => {
        if (!SubCategory.checked) {
         ( SubCategory.count > 0 || !this.isDocumentCountActive) ? SubCategory.checked = true : '';
          parrentId = categories.key;
          if (SubCategory.count > 0 || !this.isDocumentCountActive) {
            this.selectedCats.push({ name: SubCategory.value, key: SubCategory.key, parentCat: categories.key});
            this.selectedCategories.push({ key: SubCategory.key });
          }
        }
      });
    }
    else {
      categories.subCategories.forEach(SubCategory => {
        if (SubCategory.checked) {
          SubCategory.checked = false;
          let index = this.selectedCategories.findIndex(cat => cat.key === SubCategory.key);
          if (index > -1) {
            this.selectedCats.splice(index, 1);
            this.selectedCategories.splice(index, 1);
          }
        }
      });
    }

    this.categories.value[index] = categories;
    this.getSelectedCat(this.selectedCategories, parrentId);
  }



  findParentCatAndRemove(item) {
    let tempCats = JSON.parse(JSON.stringify(this.categories.getValue()));
    let parentCat: Category;
    let subCat: SubCategory;
    tempCats.forEach((parent: any) => {
      let i = parent.subCategories.findIndex(data => {
        if (item.key == data.key && item.parentCat == data.parrentId) {
          parentCat = parent;
          data.checked = false;
          subCat = data;
          return true;
        }
      });
    });

    this.categories.next(tempCats);
    this.getSubCategory(subCat, parentCat);



  }

  /** 
  *this method push selected subCategories item in a array and pass data to getSelectedCat
  */
  getSubCategory(subcat: SubCategory, cat: Category) {


    let tempCats = this.categories.getValue();
    let index = tempCats.findIndex(data => cat.key == data.key);
    let subCatIndex = tempCats[index].subCategories.findIndex(data => subcat.key == data.key);
    this.categories.value[index].subCategories[subCatIndex] = subcat;
    let parrentId = 0;
    cat.isChecked = false;
    if (subcat.checked) {
      parrentId = subcat.parrentId;
      this.selectedCats.push({ name: subcat.value, key: subcat.key, parentCat: cat.key });
      this.selectedCategories.push({ key: subcat.key });
    }
    else {
      let myIndex = this.selectedCategories.findIndex(cat => cat.key === subcat.key);
      this.selectedCats.splice(myIndex, 1);
      this.selectedCategories.splice(myIndex, 1);
    }
    this.getSelectedCat(this.selectedCategories, parrentId);
  }

  /**
   * news-main component'ýna seçilen categorileri key-value þeklinde gönderir.
   * @param selectedCat
   */
  getSelectedCat(selectedCat, parrentId) {
    this.categoryListerService.isSelectedCategory.next(true);
    //this.categoryListerService.isSelected.next(true);
    this.categoryListerService.selectedCats({ selectedCats: this.selectedCats, parrentId: parrentId });
    this.getSelectedCategories.emit(selectedCat);
    this.categoryListerService.selectedCatsForCurrentFilterBar.next(this.selectedCats);
  }


  /**toggle */
  toggleCategories() {
    this.isToggled = !this.isToggled;
  }
  /**toggle */
  subCatToggle(cat) {
    cat.isActive = !cat.isActive;
  }





}
