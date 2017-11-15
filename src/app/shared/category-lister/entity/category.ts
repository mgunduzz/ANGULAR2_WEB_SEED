/**
 * ```typescript
 * interface CategoryCounting  {
   docTypeId:number,
    count:number
 * }
 * ```
 */


interface CategoryCounting{
    docTypeId:number,
    count:number
}


/**
  * ```typescript
 * interface SubCategory {
   id:number;
    name:String;
    parentId:number;
    docTypeId:number;
    totalDocCount:number;
    docCounts:Array<CategoryCounting>;
 
 * }
 * ```
 */

export interface SubCategory{
  documentTypeId: number;
  key: number;
  orderNo: number;
  parrentId: number;
  parrentName: string;
  value: string;
  count: number;
  checked?:boolean;
}

/**
 * ```typescript
 * class Category  {
 *   id:number;
 *  name:String;     
 *  subCategories:Array<SubCategory>;
 * }
 * ```
 */
export class Category {
  documentTypeId: number;
  key: number;
  orderNo: number;
  parrentId: number;
  parrentName:string;
  value: string;
  count: number;
  isChecked:boolean;
  subCategories: SubCategory[];

}
